<script lang="ts">
    import type { Ticket } from '../engine/KanbanSystem';
    import KanbanColumn from './KanbanColumn.svelte';
    
    export let tickets: Ticket[] = [];
    export let wipLimits: { development: number, review: number };
    
    $: backlog = tickets.filter(t => t.state === 'backlog');
    $: development = tickets.filter(t => t.state === 'development');
    $: review = tickets.filter(t => t.state === 'review');
    $: done = tickets.filter(t => t.state === 'done');
</script>

<div class="board">
    <KanbanColumn 
        title="Backlog" 
        tickets={backlog} 
    />
    <KanbanColumn 
        title="Development (AI)" 
        tickets={development} 
        wipLimit={wipLimits.development} 
        color="var(--color-sviluppo)" 
    />
    <KanbanColumn 
        title="Review" 
        tickets={review} 
        wipLimit={wipLimits.review} 
        color="var(--color-review)" 
    />
    <KanbanColumn 
        title="Done" 
        tickets={done} 
    />
</div>

<div class="legend">
    <div class="legend-item"><span class="dot" style="background: var(--color-sviluppo)"></span> Development</div>
    <div class="legend-item"><span class="dot" style="background: var(--color-review)"></span> Review</div>
    <div class="legend-item tooltip-trigger" data-tooltip="Occurs when tasks pile up beyond WIP limit"><span class="dot" style="background: var(--color-info)"></span> Bottleneck (Queue)</div>
</div>

<style>
    .board {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
        margin-bottom: 1rem;
    }
    
    .legend {
        display: flex;
        gap: 1.5rem;
        padding: 1rem 0;
        margin-bottom: 1rem;
    }
    
    .legend-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.85rem;
        color: var(--text-secondary);
        background: var(--panel-bg);
        padding: 0.25rem 0.75rem;
        border-radius: 16px;
        border: 1px solid var(--panel-border);
    }
    
    .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
    }
</style>
