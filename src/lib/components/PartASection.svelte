<script lang="ts">
  import type { PartAQuestion } from '../types/practice'

  export let question: PartAQuestion | null
  export let doneCount = 0
  export let goalCount = 5
  export let showWord = false
  export let onGenerate: () => void
  export let onToggleWord: () => void
</script>

<section class="card">
  <div class="section-head">
    <h3>Part A: 3-digit challenge</h3>
    <span class="badge">{doneCount} / {goalCount}</span>
  </div>

  <p class="hint">Draw 3 cards and write the English spelling first.</p>

  <p class="big-number">{question ? question.value : '---'}</p>

  {#if question}
    <button class="secondary" type="button" on:click={onToggleWord}>
      {showWord ? 'Hide word' : 'Check spelling'}
    </button>
  {/if}

  {#if showWord && question}
    <p class="answer">{question.word}</p>
  {/if}

  <button class="primary" type="button" on:click={onGenerate}>Draw 3 cards</button>
</section>

