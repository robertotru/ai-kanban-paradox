<script lang="ts">
    export let isPlaying = false;
    export let onTogglePlay: () => void;
    export let onReset: () => void;
</script>

<header class="header">
    <h1>Kanban Flow Simulator</h1>
    <div class="controls">
        <button on:click={onTogglePlay} class:active={isPlaying}>
            {#if isPlaying}
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
            {:else}
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            {/if}
        </button>
        <button on:click={onReset}>
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><polyline points="3 3 3 8 8 8"></polyline></svg>
        </button>
    </div>
</header>

<style>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }
    
    h1 {
        font-size: 1.8rem;
        font-weight: 400;
        letter-spacing: -0.5px;
    }
    
    .controls {
        display: flex;
        gap: 1rem;
    }
    
    button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-color: var(--panel-bg);
        border: 1px solid var(--panel-border);
        color: var(--text-secondary);
    }
    
    button:hover {
        color: var(--text-primary);
        border-color: #555;
    }
    
    button.active {
        background-color: var(--color-info);
        color: white;
        border-color: var(--color-info);
    }
</style>
