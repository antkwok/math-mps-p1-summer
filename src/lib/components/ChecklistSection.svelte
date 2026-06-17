<script lang="ts">
  import { onMount } from 'svelte'

  import { loadPersistedChecklistState, savePersistedChecklistState } from '../services/storage'
  import type { ChecklistItem } from '../types/checklist'

  let items: ChecklistItem[] = []
  let completedCount = 0

  onMount(() => {
    items = loadPersistedChecklistState()
    updateCompletedCount()
  })

  function updateCompletedCount(): void {
    completedCount = items.filter((item) => item.completed).length
  }

  function toggleItem(id: string): void {
    const item = items.find((i) => i.id === id)
    if (item) {
      item.completed = !item.completed
      items = items
      updateCompletedCount()
      savePersistedChecklistState(items)
    }
  }
</script>

<section class="card checklist-card">
  <div class="section-head">
    <h3>Check-list: ✅ if you can do it well.</h3>
    <span class="badge">{completedCount} / {items.length}</span>
  </div>

  <p class="hint">Ticking it means you have mastered this item. Keep it up!</p>

  <div class="checklist-items">
    {#each items as item (item.id)}
      <label class="checklist-item">
        <input
          type="checkbox"
          checked={item.completed}
          on:change={() => toggleItem(item.id)}
          aria-label={item.text}
        />
        <span class="item-text">{item.text}</span>
      </label>
    {/each}
  </div>

  {#if completedCount === items.length}
    <div class="celebration" aria-live="polite">
      <span class="trophy">🏆</span>
      <p>Awesome! You have mastered all items!</p>
    </div>
  {/if}
</section>
