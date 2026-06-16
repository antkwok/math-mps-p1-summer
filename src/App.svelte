<script lang="ts">
  import PartASection from './lib/components/PartASection.svelte'
  import PartBSection from './lib/components/PartBSection.svelte'
  import ProgressCard from './lib/components/ProgressCard.svelte'
  import { practiceProgress, practiceStore } from './lib/stores/practiceStore'
  import { PART_A_GOAL, PART_B_GOAL } from './lib/types/practice'
</script>

<main class="app-shell">
  <header class="app-header">
    <h1>P.2 Summer Math Helper</h1>
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
      onGenerate={() => practiceStore.generatePartA()}
      onToggleWord={() => practiceStore.togglePartAWord()}
    />

    <PartBSection
      question={$practiceStore.partBQuestion}
      doneCount={$practiceStore.partBDone}
      goalCount={PART_B_GOAL}
      showAnswers={$practiceStore.showPartBAnswers}
      onGenerate={() => practiceStore.generatePartB()}
      onToggleAnswers={() => practiceStore.togglePartBAnswers()}
    />
  </div>
</main>
