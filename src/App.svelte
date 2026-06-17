<script lang="ts">
  import { onMount } from 'svelte'

  import PartASection from './lib/components/PartASection.svelte'
  import PartBSection from './lib/components/PartBSection.svelte'
  import MultiplicationReview from './lib/components/MultiplicationReview.svelte'
  import ProgressCard from './lib/components/ProgressCard.svelte'
  import {
    loadPersistedProfileState,
    normalizeStudentName,
    savePersistedProfileState
  } from './lib/services/storage'
  import { practiceProgress, practiceStore } from './lib/stores/practiceStore'
  import { PART_A_GOAL, PART_B_GOAL } from './lib/types/practice'
  import { playCelebrationSound, playShuffleSound } from './lib/utils/audio'

  let studentName = loadPersistedProfileState()?.studentName ?? ''
  let nameDraft = studentName
  let showNamePrompt = !studentName
  let nameInput: HTMLInputElement | null = null
  let previousCelebrationShown = $practiceStore.celebrationShown

  onMount(() => {
    if (showNamePrompt) {
      nameInput?.focus()
    }
  })

  $: if ($practiceStore.celebrationShown && !previousCelebrationShown) {
    void playCelebrationSound()
  }

  $: previousCelebrationShown = $practiceStore.celebrationShown

  function submitName(): void {
    const normalized = normalizeStudentName(nameDraft)

    if (!normalized) {
      return
    }

    studentName = normalized
    nameDraft = normalized
    showNamePrompt = false
    savePersistedProfileState({ studentName: normalized })
  }
</script>

<main class="app-shell">
  {#if showNamePrompt}
    <div class="name-overlay" role="dialog" aria-modal="true" aria-labelledby="name-title">
      <form class="name-card card" on:submit|preventDefault={submitName}>
        <h2 id="name-title">先告訴我你的名字</h2>
        <p>我會用這個名字跟你打招呼。</p>

        <label class="name-label" for="student-name">同學名字</label>
        <input
          bind:this={nameInput}
          id="student-name"
          class="name-input"
          type="text"
          bind:value={nameDraft}
          autocomplete="given-name"
          maxlength="40"
          placeholder="例如：Alyssa"
        />

        <button class="primary" type="submit">開始練習</button>
      </form>
    </div>
  {/if}

  <header class="app-header">
    <h1>P.2 Summer Math Helper</h1>
    {#if studentName}
      <p class="greeting">Hello {studentName}, let's do some math today! 💪</p>
    {/if}
    <p>Generate math cards, practice daily, and collect stars.</p>
  </header>

  <ProgressCard
    progress={$practiceProgress}
    stars={$practiceStore.stars}
    encouragement={$practiceStore.encouragementMessage}
    onReset={() => practiceStore.resetDaily()}
  />

  <div class="grid">
    <PartASection
      question={$practiceStore.partAQuestion}
      doneCount={$practiceStore.partADone}
      goalCount={PART_A_GOAL}
      showWord={$practiceStore.showPartAWord}
      onGenerate={() => {
        void playShuffleSound()
        practiceStore.generatePartA()
      }}
      onToggleWord={() => practiceStore.togglePartAWord()}
    />

    <PartBSection
      question={$practiceStore.partBQuestion}
      doneCount={$practiceStore.partBDone}
      goalCount={PART_B_GOAL}
      showAnswers={$practiceStore.showPartBAnswers}
      onGenerate={() => {
        void playShuffleSound()
        practiceStore.generatePartB()
      }}
      onToggleAnswers={() => practiceStore.togglePartBAnswers()}
    />
  </div>

  <div class="review-panel">
    <MultiplicationReview />
  </div>
</main>
