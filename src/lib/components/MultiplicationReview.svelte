<script lang="ts">
  import { onMount } from 'svelte'

  import { factorToChineseLabel, numberToChineseNumerals } from '../utils/chineseNumbers'

  const factors = Array.from({ length: 10 }, (_, index) => index + 1)

  let selectedTable = 3
  let selectedFact = 7
  let selectedAnswer = numberToChineseNumerals(selectedTable * selectedFact)
  let selectedQuestion = `${factorToChineseLabel(selectedTable)}${factorToChineseLabel(selectedFact)}`

  onMount(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return
    }

    window.speechSynthesis.getVoices()
  })

  function speakAnswer(question: string, answer: string): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return
    }

    const utterance = new SpeechSynthesisUtterance(`${question}，${answer}`)
    const voices = window.speechSynthesis.getVoices()
    const preferredVoice =
      voices.find((voice) => voice.lang.toLowerCase().includes('yue')) ??
      voices.find((voice) => voice.lang.toLowerCase().startsWith('zh-hk')) ??
      voices.find((voice) => voice.lang.toLowerCase().startsWith('zh'))

    utterance.lang = preferredVoice?.lang ?? 'yue-HK'
    utterance.rate = 0.9
    utterance.pitch = 1.05

    if (preferredVoice) {
      utterance.voice = preferredVoice
    }

    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  function selectTable(table: number): void {
    selectedTable = table
    selectedFact = 1
    selectedQuestion = `${factorToChineseLabel(selectedTable)}${factorToChineseLabel(selectedFact)}`
    selectedAnswer = numberToChineseNumerals(selectedTable * selectedFact)
  }

  function selectFact(fact: number): void {
    selectedFact = fact
    selectedQuestion = `${factorToChineseLabel(selectedTable)}${factorToChineseLabel(selectedFact)}`
    selectedAnswer = numberToChineseNumerals(selectedTable * selectedFact)
    speakAnswer(selectedQuestion, selectedAnswer)
  }
</script>

<section class="card review-card">
  <div class="section-head">
    <h3>九因歌有聲點讀機</h3>
    <span class="badge">1 - 10</span>
  </div>

  <p class="hint">先選一個乘數，再點題目。會顯示答案，也會嘗試用廣東話朗讀。</p>

  <div class="table-tabs" aria-label="Multiplication table selector">
    {#each factors as factor}
      <button
        class:active={factor === selectedTable}
        class="table-tab"
        type="button"
        aria-pressed={factor === selectedTable}
        on:click={() => selectTable(factor)}
      >
        {factorToChineseLabel(factor)}
      </button>
    {/each}
  </div>

  <div class="fact-grid" aria-label="Multiplication facts">
    {#each factors as fact}
      <button
        class:active={fact === selectedFact}
        class="fact-button"
        type="button"
        aria-label={`${selectedTable} times ${fact}`}
        on:click={() => selectFact(fact)}
      >
        <span>{factorToChineseLabel(selectedTable)}{factorToChineseLabel(fact)}</span>
        <small>{numberToChineseNumerals(selectedTable * fact)}</small>
      </button>
    {/each}
  </div>

  <p class="answer review-answer" aria-live="polite">
    {selectedQuestion} = {selectedAnswer}
  </p>
</section>
