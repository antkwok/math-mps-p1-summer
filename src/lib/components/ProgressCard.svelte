<script lang="ts">
  import type { PracticeProgress } from '../types/practice'

  export let progress: PracticeProgress
  export let stars = 0
  export let encouragement = ''
  export let onReset: () => void
</script>

<section class="card progress-card">
  <div class="progress-head">
    <h2>Daily Mission</h2>
    <button class="secondary" type="button" on:click={onReset}>Reset Today</button>
  </div>

  <p class="progress-meta">Progress: {progress.doneTotal} / {progress.goalTotal}</p>

  <div class="progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={progress.goalTotal} aria-valuenow={progress.doneTotal}>
    <div class="progress-fill" style={`width: ${Math.round(progress.progressRatio * 100)}%`}></div>
  </div>

  <p class="stars">Stars: {stars} ⭐</p>

  {#if encouragement}
    <p class="encourage">{encouragement}</p>
  {/if}

  {#if progress.isComplete}
    <div class="celebration" aria-live="polite">
      <span class="crown">👑</span>
      <p>🎉 太棒了！你完成了今天的練習！</p>
    </div>
  {/if}
</section>

