import assert from "node:assert/strict"
import { test } from "node:test"

import { microphoneErrorMessage, openMicrophone } from "../lib/microphone.ts"

function deferred() {
  let resolve
  const promise = new Promise((done) => {
    resolve = done
  })
  return { promise, resolve }
}

function browser(t, { permission, resume, failSetup } = {}) {
  const track = {
    stopCount: 0,
    stop() {
      this.stopCount++
    },
  }
  const stream = { getTracks: () => [track] }
  const analyser = {}
  const contexts = []
  const requests = []
  const source = {
    disconnectCount: 0,
    connect(node) {
      assert.equal(node, analyser)
      if (failSetup) throw new Error("Audio source failed")
    },
    disconnect() {
      this.disconnectCount++
    },
  }

  class MockAudioContext {
    state = "suspended"
    closeCount = 0
    constructor() {
      contexts.push(this)
    }
    async resume() {
      if (resume) await resume.promise
      if (this.state !== "closed") this.state = "running"
    }
    createAnalyser() {
      return analyser
    }
    createMediaStreamSource(input) {
      assert.equal(input, stream)
      return source
    }
    async close() {
      this.closeCount++
      this.state = "closed"
    }
  }

  const globals = {
    window: { isSecureContext: true, AudioContext: MockAudioContext },
    navigator: {
      mediaDevices: {
        getUserMedia(constraints) {
          requests.push(constraints)
          return permission ? permission.promise : Promise.resolve(stream)
        },
      },
    },
  }

  for (const [name, value] of Object.entries(globals)) {
    const previous = Object.getOwnPropertyDescriptor(globalThis, name)
    Object.defineProperty(globalThis, name, { configurable: true, value })
    t.after(() => {
      if (previous) Object.defineProperty(globalThis, name, previous)
      else delete globalThis[name]
    })
  }

  return { ...globals, track, stream, analyser, source, contexts, requests }
}

test("live audio feeds the analyser; stopping releases the microphone once", async (t) => {
  const mock = browser(t)
  const controller = new AbortController()
  assert.equal(mock.requests.length, 0)
  const session = await openMicrophone(controller.signal)
  assert.deepEqual(mock.requests, [{ audio: true }])
  assert.equal(session.analyser, mock.analyser)
  assert.equal(mock.contexts[0].state, "running")
  assert.equal(mock.track.stopCount, 0)

  controller.abort()
  controller.abort()
  assert.equal(mock.track.stopCount, 1)
  assert.equal(mock.source.disconnectCount, 1)
  assert.equal(mock.contexts[0].closeCount, 1)
})

test("permission granted after cancellation immediately releases the late stream", async (t) => {
  const permission = deferred()
  const mock = browser(t, { permission })
  const controller = new AbortController()
  const opening = openMicrophone(controller.signal)
  controller.abort()
  permission.resolve(mock.stream)
  await assert.rejects(opening, { name: "AbortError" })
  assert.equal(mock.track.stopCount, 1)
  assert.equal(mock.contexts.length, 0)
})

test("cancelling while audio starts stops capture before resume finishes", async (t) => {
  const resume = deferred()
  const mock = browser(t, { resume })
  const controller = new AbortController()
  const opening = openMicrophone(controller.signal)
  await Promise.resolve()
  assert.equal(mock.contexts.length, 1)
  controller.abort()
  assert.equal(mock.track.stopCount, 1)
  assert.equal(mock.contexts[0].closeCount, 1)
  resume.resolve()
  await assert.rejects(opening, { name: "AbortError" })
  assert.equal(mock.track.stopCount, 1)
})

test("a setup failure releases the stream and audio context", async (t) => {
  const mock = browser(t, { failSetup: true })
  await assert.rejects(openMicrophone(new AbortController().signal), /Audio source failed/)
  assert.equal(mock.track.stopCount, 1)
  assert.equal(mock.contexts[0].closeCount, 1)
})

test("an already cancelled request never asks for microphone permission", async (t) => {
  const mock = browser(t)
  const controller = new AbortController()
  controller.abort()
  await assert.rejects(openMicrophone(controller.signal), { name: "AbortError" })
  assert.equal(mock.requests.length, 0)
})

test("insecure or unsupported browsers fail before requesting microphone access", async (t) => {
  const mock = browser(t)
  mock.window.isSecureContext = false
  await assert.rejects(openMicrophone(new AbortController().signal), { name: "SecurityError" })
  mock.window.isSecureContext = true
  mock.navigator.mediaDevices = undefined
  await assert.rejects(openMicrophone(new AbortController().signal), { name: "NotSupportedError" })
  assert.equal(mock.requests.length, 0)
})

test("permission failures leave no audio context and provide actionable feedback", async (t) => {
  const mock = browser(t)
  mock.navigator.mediaDevices.getUserMedia = () =>
    Promise.reject(new DOMException("Denied", "NotAllowedError"))
  await assert.rejects(openMicrophone(new AbortController().signal), { name: "NotAllowedError" })
  assert.equal(mock.contexts.length, 0)
  assert.match(
    microphoneErrorMessage(new DOMException("Denied", "NotAllowedError")),
    /site settings/,
  )
  assert.match(microphoneErrorMessage(new DOMException("Missing", "NotFoundError")), /Connect one/)
  assert.match(microphoneErrorMessage(new DOMException("Busy", "NotReadableError")), /available/)
})
