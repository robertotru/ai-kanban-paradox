<script lang="ts">
    export let speeds: { development: number, review: number };
    export let wipLimits: { development: number, review: number };
    export let onUpdate: () => void;
    
    function handleChange() {
        onUpdate();
    }
</script>

<div class="controls-grid">
    <div class="control-group">
        <label for="speed-development" class="tooltip-trigger" data-tooltip="How many tasks the AI finishes per tick">Dev Speed (AI)</label>
        <input 
            id="speed-development" 
            type="range" 
            min="0" max="10" 
            bind:value={speeds.development} 
            on:input={handleChange}
        />
        <div class="value-display">{speeds.development}</div>
    </div>
    
    <div class="control-group">
        <label for="speed-review" class="tooltip-trigger" data-tooltip="How many tasks humans review per tick">Review Speed</label>
        <input 
            id="speed-review" 
            type="range" 
            min="0" max="10" 
            bind:value={speeds.review} 
            on:input={handleChange}
        />
        <div class="value-display">{speeds.review}</div>
    </div>
    
    <div class="control-group">
        <label for="wip-development" class="tooltip-trigger" data-tooltip="Max parallel tasks the AI will pull from Backlog">Dev WIP Limit</label>
        <input 
            id="wip-development" 
            type="range" 
            min="1" max="20" 
            bind:value={wipLimits.development} 
            on:input={handleChange}
        />
        <div class="value-display">{wipLimits.development}</div>
    </div>
    
    <div class="control-group">
        <label for="wip-review" class="tooltip-trigger" data-tooltip="Ideal max tasks in Review (breaching this tanks efficiency)">Review WIP Limit</label>
        <input 
            id="wip-review" 
            type="range" 
            min="1" max="20" 
            bind:value={wipLimits.review} 
            on:input={handleChange}
        />
        <div class="value-display">{wipLimits.review}</div>
    </div>
</div>

<style>
    .controls-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        background-color: var(--panel-bg);
        border: 1px solid var(--panel-border);
        border-radius: 8px;
        padding: 2rem;
    }
    
    .control-group {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    label {
        min-width: 140px;
        font-size: 0.9rem;
        color: var(--text-secondary);
    }
    
    input[type=range] {
        flex: 1;
    }
    
    .value-display {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--panel-border);
        border-radius: 8px;
        font-weight: 600;
    }
</style>
