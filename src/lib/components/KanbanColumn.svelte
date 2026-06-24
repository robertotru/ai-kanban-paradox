<script lang="ts">
    import type { Ticket } from '../engine/KanbanSystem';
    
    export let title: string;
    export let tickets: Ticket[] = [];
    export let wipLimit: number | undefined = undefined;
    export let color: string = 'var(--text-secondary)';
    
    $: isOverLimit = wipLimit !== undefined && tickets.length > wipLimit;
</script>

<div class="column" style="--col-color: {color}">
    <div class="column-header" class:over-limit={isOverLimit}>
        <div class="title">
            {title} {#if wipLimit !== undefined}<span class="tooltip-trigger" data-tooltip="WIP Limit: Maximum allowed tasks in this column">(L:{wipLimit})</span>{/if}
        </div>
        <div class="count">{tickets.length} tasks</div>
    </div>
    
    <div class="tickets">
        {#each tickets.slice(0, 15) as ticket (ticket.id)}
            <div class="ticket"></div>
        {/each}
        {#if tickets.length > 15}
            <div class="more-indicator">+{tickets.length - 15} more</div>
        {/if}
    </div>
</div>

<style>
    .column {
        display: flex;
        flex-direction: column;
        background-color: var(--panel-bg);
        border: 1px solid var(--panel-border);
        border-radius: 4px;
        overflow: hidden;
        height: 400px;
    }
    
    .column-header {
        padding: 1rem;
        background-color: rgba(255, 255, 255, 0.05);
        border-bottom: 2px solid var(--col-color);
        text-align: center;
        transition: background-color 0.3s;
    }
    
    .column-header.over-limit {
        background-color: rgba(244, 67, 54, 0.2);
        border-bottom-color: var(--color-bottleneck);
    }
    
    .title {
        font-weight: 600;
        font-size: 0.9rem;
        margin-bottom: 0.25rem;
    }
    
    .count {
        font-size: 0.75rem;
        color: var(--text-secondary);
    }
    
    .tickets {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 8px;
        overflow-y: auto;
    }
    
    .ticket {
        height: 24px;
        background-color: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--panel-border);
        border-radius: 2px;
        position: relative;
        overflow: hidden;
    }
    
    .ticket::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        background-color: var(--col-color);
    }
    
    .more-indicator {
        text-align: center;
        font-size: 0.75rem;
        color: var(--text-secondary);
        padding: 0.5rem 0;
    }
</style>
