function createAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') {
    return null
  }

  const browserWindow = window as Window & {
    AudioContext?: typeof AudioContext
    webkitAudioContext?: typeof AudioContext
  }
  const AudioContextClass = browserWindow.AudioContext ?? browserWindow.webkitAudioContext

  if (!AudioContextClass) {
    return null
  }

  return new AudioContextClass()
}

async function startAudioContext(context: AudioContext): Promise<void> {
  if (context.state === 'suspended') {
    await context.resume()
  }
}

function closeContextLater(context: AudioContext, delay = 500): void {
  window.setTimeout(() => {
    void context.close()
  }, delay)
}

export async function playShuffleSound(): Promise<void> {
  const context = createAudioContext()

  if (!context) {
    return
  }

  await startAudioContext(context)

  const buffer = context.createBuffer(1, context.sampleRate * 0.28, context.sampleRate)
  const channel = buffer.getChannelData(0)

  for (let index = 0; index < channel.length; index += 1) {
    const fade = 1 - index / channel.length
    channel[index] = (Math.random() * 2 - 1) * fade
  }

  const source = context.createBufferSource()
  const filter = context.createBiquadFilter()
  const gain = context.createGain()
  const now = context.currentTime

  source.buffer = buffer
  filter.type = 'bandpass'
  filter.frequency.value = 1200
  filter.Q.value = 0.8

  gain.gain.setValueAtTime(0.001, now)
  gain.gain.exponentialRampToValueAtTime(0.26, now + 0.03)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28)

  source.connect(filter).connect(gain).connect(context.destination)
  source.start()
  source.stop(now + 0.3)
  closeContextLater(context)
}

export async function playCelebrationSound(): Promise<void> {
  const context = createAudioContext()

  if (!context) {
    return
  }

  await startAudioContext(context)

  const now = context.currentTime
  const notes = [523.25, 659.25, 783.99]

  notes.forEach((frequency, index) => {
    const start = now + index * 0.12
    const osc = context.createOscillator()
    const gain = context.createGain()

    osc.type = 'triangle'
    osc.frequency.value = frequency

    gain.gain.setValueAtTime(0.001, start)
    gain.gain.exponentialRampToValueAtTime(0.24, start + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.22)

    osc.connect(gain).connect(context.destination)
    osc.start(start)
    osc.stop(start + 0.24)
  })

  closeContextLater(context, 700)
}
