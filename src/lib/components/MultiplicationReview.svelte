<script lang="ts">
  import { onMount } from 'svelte'

  import { numberToChineseNumerals } from '../utils/chineseNumbers'
  import {
    getMultiplicationReadout,
    MULTIPLICATION_COLUMNS,
    MULTIPLICATION_ROWS
  } from '../utils/multiplicationReadout'

  let selectedRow = 3
  let selectedColumn = 7
  let selectedReadout = getMultiplicationReadout(selectedRow, selectedColumn)

  onMount(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return
    }

    window.speechSynthesis.getVoices()
  })

  function speakReadout(readout: string): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return
    }

    const utterance = new SpeechSynthesisUtterance(readout)
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

  function selectCell(row: number, column: number): void {
    selectedRow = row
    selectedColumn = column
    selectedReadout = getMultiplicationReadout(row, column)
    speakReadout(selectedReadout)
  }
</script>

<section class="card review-card">
  <div class="section-head">
    <h3>九因歌有聲點讀機</h3>
    <span class="badge">1 - 10</span>
  </div>

  <p class="hint">點一下任何一格，會顯示並嘗試朗讀你提供的標準讀法。</p>

  <div class="table-headings">
    <span></span>
    {#each MULTIPLICATION_COLUMNS as column}
      <span>{numberToChineseNumerals(column)}</span>
    {/each}
  </div>

  <div class="multiplication-grid" aria-label="Nine times table readout grid">
    {#each MULTIPLICATION_ROWS as row}
      <span class="row-label">{numberToChineseNumerals(row)}</span>

      {#each MULTIPLICATION_COLUMNS as column}
        <button
          class:active={row === selectedRow && column === selectedColumn}
          class="fact-button"
          type="button"
          aria-label={getMultiplicationReadout(row, column)}
          on:click={() => selectCell(row, column)}
        >
          {getMultiplicationReadout(row, column)}
        </button>
      {/each}
    {/each}
  </div>

  <p class="answer review-answer" aria-live="polite">{selectedReadout}</p>
</section>
