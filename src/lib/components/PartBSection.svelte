<script lang="ts">
  import type { PartBQuestion } from '../types/practice'

  export let question: PartBQuestion | null
  export let doneCount = 0
  export let goalCount = 10
  export let showAnswers = false
  export let onGenerate: () => void
  export let onToggleAnswers: () => void
</script>

<section class="card">
  <div class="section-head">
    <h3>Part B: + and - challenge</h3>
    <span class="badge">{doneCount} / {goalCount}</span>
  </div>

  <p class="hint">Draw 2 cards (1 to 19), then solve addition and subtraction.</p>

  {#if question}
    <div class="equations">
      <p>{question.left} + {question.right} = <strong>{showAnswers ? question.additionAnswer : '?'}</strong></p>
      <p>{question.subtractionLeft} - {question.subtractionRight} = <strong>{showAnswers ? question.subtractionAnswer : '?'}</strong></p>
    </div>

    <button class="secondary" type="button" on:click={onToggleAnswers}>
      {showAnswers ? 'Hide answers' : 'Check answers'}
    </button>
  {:else}
    <p class="big-number">---</p>
  {/if}

  <button class="primary" type="button" on:click={onGenerate}>Draw 2 cards</button>
</section>

