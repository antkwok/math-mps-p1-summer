<script lang="ts">
  import { SHAPES_2D, SHAPES_3D, DAYS_OF_WEEK, MONTHS_OF_YEAR } from '../types/english'
  import Shape2DRenderer from './Shape2DRenderer.svelte'

  let activeTab = 'shapes-2d'
  let selectedShape2D = SHAPES_2D[0]
  let selectedShape3D = SHAPES_3D[0]
  let selectedDay = DAYS_OF_WEEK[0]
  let selectedMonth = MONTHS_OF_YEAR[0]

  function speakWord(word: string): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return
    }

    const utterance = new SpeechSynthesisUtterance(word)
    utterance.lang = 'en-US'
    utterance.rate = 0.85
    utterance.pitch = 1.1

    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  function selectShape2D(shape: typeof SHAPES_2D[0]): void {
    selectedShape2D = shape
    speakWord(shape.name)
  }

  function selectShape3D(shape: typeof SHAPES_3D[0]): void {
    selectedShape3D = shape
    speakWord(shape.name)
  }

  function selectDay(day: typeof DAYS_OF_WEEK[0]): void {
    selectedDay = day
    speakWord(day.name)
  }

  function selectMonth(month: typeof MONTHS_OF_YEAR[0]): void {
    selectedMonth = month
    speakWord(month.name)
  }
</script>

<section class="card english-card">
  <div class="section-head">
    <h3>Shapes & Datetime</h3>
    <span class="badge">Grade 1</span>
  </div>

  <p class="hint">Click a word to display and hear it.</p>

  <div class="tab-buttons" role="tablist">
    <button
      role="tab"
      aria-selected={activeTab === 'shapes-2d'}
      class:active={activeTab === 'shapes-2d'}
      on:click={() => (activeTab = 'shapes-2d')}
    >
      2D Shapes
    </button>
    <button
      role="tab"
      aria-selected={activeTab === 'shapes-3d'}
      class:active={activeTab === 'shapes-3d'}
      on:click={() => (activeTab = 'shapes-3d')}
    >
      3D Shapes
    </button>
    <button
      role="tab"
      aria-selected={activeTab === 'days'}
      class:active={activeTab === 'days'}
      on:click={() => (activeTab = 'days')}
    >
      Days
    </button>
    <button
      role="tab"
      aria-selected={activeTab === 'months'}
      class:active={activeTab === 'months'}
      on:click={() => (activeTab = 'months')}
    >
      Months
    </button>
  </div>

  {#if activeTab === 'shapes-2d'}
    <div class="vocab-grid" role="tabpanel">
      {#each SHAPES_2D as shape}
        <button
          class="vocab-button"
          class:active={shape.id === selectedShape2D.id}
          on:click={() => selectShape2D(shape)}
          aria-label={shape.name}
        >
          <Shape2DRenderer shapeId={shape.id} isSelected={shape.id === selectedShape2D.id} />
          <span class="vocab-name">{shape.name}</span>
        </button>
      {/each}
    </div>
    <div class="vocab-display-3d" aria-live="polite">
      <Shape2DRenderer shapeId={selectedShape2D.id} isSelected={true} />
      <div class="display-text">
        <p class="display-name">{selectedShape2D.name}</p>
        <button class="speak-btn" on:click={() => speakWord(selectedShape2D.name)}>🔊 Hear</button>
      </div>
    </div>
  {/if}

  {#if activeTab === 'shapes-3d'}
    <div class="vocab-grid" role="tabpanel">
      {#each SHAPES_3D as shape}
        <button
          class="vocab-button"
          class:active={shape.id === selectedShape3D.id}
          on:click={() => selectShape3D(shape)}
          aria-label={shape.name}
        >
          <span class="vocab-emoji">{shape.emoji}</span>
          <span class="vocab-name">{shape.name}</span>
        </button>
      {/each}
    </div>
    <p class="vocab-display" aria-live="polite">{selectedShape3D.emoji} {selectedShape3D.name}</p>
  {/if}

  {#if activeTab === 'days'}
    <div class="vocab-grid" role="tabpanel">
      {#each DAYS_OF_WEEK as day}
        <button
          class="vocab-button"
          class:active={day.id === selectedDay.id}
          on:click={() => selectDay(day)}
          aria-label={day.name}
        >
          <span class="vocab-name">{day.name}</span>
        </button>
      {/each}
    </div>
    <p class="vocab-display" aria-live="polite">📅 {selectedDay.name}</p>
  {/if}

  {#if activeTab === 'months'}
    <div class="vocab-grid" role="tabpanel">
      {#each MONTHS_OF_YEAR as month}
        <button
          class="vocab-button"
          class:active={month.id === selectedMonth.id}
          on:click={() => selectMonth(month)}
          aria-label={month.name}
        >
          <span class="vocab-name">{month.name}</span>
        </button>
      {/each}
    </div>
    <p class="vocab-display" aria-live="polite">🗓️ {selectedMonth.name}</p>
  {/if}
</section>

<style>
  .tab-buttons {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 8px;
    margin-top: 12px;
  }

  .tab-buttons button {
    padding: 8px 10px;
    background: #f3f4f6;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .tab-buttons button.active {
    background: #dbeafe;
    border-color: #93c5fd;
    color: #1d4ed8;
  }

  .vocab-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 8px;
    margin-top: 12px;
  }

  .vocab-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    min-height: 140px;
    padding: 8px;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .vocab-button:hover {
    background: #f3f4f6;
  }

  .vocab-button.active {
    background: #dbeafe;
    border-color: #93c5fd;
  }

  .vocab-name {
    font-size: 0.8rem;
    font-weight: 600;
    color: #111827;
    text-align: center;
  }

  .vocab-display-3d {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 16px;
    padding: 16px;
    background: #f0f9ff;
    border-radius: 8px;
    min-height: 150px;
  }

  .vocab-display-3d > :first-child {
    flex: 0 0 150px;
    max-width: 150px;
  }

  .display-text {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .display-name {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1d4ed8;
    margin: 0;
  }

  .speak-btn {
    padding: 8px 16px;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 600;
    transition: all 0.2s;
    width: fit-content;
  }

  .speak-btn:hover {
    background: #2563eb;
  }

  .vocab-display {
    margin-top: 16px;
    padding: 12px;
    background: #f0f9ff;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    text-align: center;
    color: #1d4ed8;
  }
</style>
