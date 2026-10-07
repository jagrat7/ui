/** The abort signal owns the microphone, including permission requests that resolve late. */
export async function openMicrophone(signal: AbortSignal) {
  signal.throwIfAborted()
  if (!window.isSecureContext) throw new DOMException("Insecure context", "SecurityError")
  if (!navigator.mediaDevices?.getUserMedia || !window.AudioContext) {
    throw new DOMException("Microphone input is unavailable", "NotSupportedError")
  }

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  let context: AudioContext | undefined
  let source: MediaStreamAudioSourceNode | undefined
  let stopped = false

  function stop() {
    if (stopped) return
    stopped = true
    signal.removeEventListener("abort", stop)
    source?.disconnect()
    stream.getTracks().forEach((track) => track.stop())
    if (context && context.state !== "closed") void context.close().catch(() => {})
  }

  signal.addEventListener("abort", stop, { once: true })

  try {
    // getUserMedia cannot cancel its permission prompt, so release any late stream immediately.
    signal.throwIfAborted()
    context = new window.AudioContext()
    await context.resume()
    signal.throwIfAborted()
    const analyser = context.createAnalyser()
    analyser.fftSize = 256
    analyser.smoothingTimeConstant = 0.8
    source = context.createMediaStreamSource(stream)
    source.connect(analyser)
    // Keep the microphone out of the speakers to avoid feedback.
    return { analyser, stream }
  } catch (error) {
    stop()
    throw error
  }
}

export function microphoneErrorMessage(error: unknown) {
  const name = error instanceof Error ? error.name : ""
  switch (name) {
    case "NotAllowedError":
      return "Microphone blocked. Allow access in your browser’s site settings."
    case "NotFoundError":
      return "No microphone found. Connect one to try again."
    case "NotReadableError":
      return "Microphone unavailable. Check your device and try again."
    case "SecurityError":
      return "Microphone access needs HTTPS or localhost."
    case "NotSupportedError":
      return "Microphone input isn’t supported in this browser."
    default:
      return "Couldn’t start the microphone. Check permissions and try again."
  }
}
