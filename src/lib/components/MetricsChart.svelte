<script lang="ts">
    import type { TickData } from '../engine/KanbanSystem';

    export let history: TickData[] = [];
    export let queueLength: number = 0;
    export let flowEfficiency: number = 100;
    
    const width = 800;
    const height = 200;
    const padding = { top: 20, right: 20, bottom: 20, left: 40 };
    
    // Configura Y max
    $: maxQueue = Math.max(10, ...history.map(d => d.reviewQueueLength), ...history.map(d => d.reviewWipLimit));
    $: yMax = Math.ceil(maxQueue / 5) * 5; // Arrotonda al multiplo di 5 superiore
    
    // Funzioni di scala
    $: scaleX = (index: number) => padding.left + (index / 19) * (width - padding.left - padding.right);
    $: scaleY = (value: number) => height - padding.bottom - (value / yMax) * (height - padding.top - padding.bottom);
    
    // Genera il path SVG
    $: pathData = history.length > 0 
        ? history.map((d, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(d.reviewQueueLength)}`).join(' ')
        : '';
        
    // WIP Limit Line (ultimo valore o default 5 se history vuota)
    $: currentWipLimit = history.length > 0 ? history[history.length - 1].reviewWipLimit : 5;
</script>

<div class="chart-container">
    <div class="chart-title">Review Queue ↑</div>
    <svg {width} {height} viewBox="0 0 {width} {height}">
        <!-- Y Axis & Grid Lines -->
        {#each Array(yMax + 1) as _, i}
            <line 
                x1={padding.left} 
                y1={scaleY(i)} 
                x2={width - padding.right} 
                y2={scaleY(i)} 
                stroke="var(--panel-border)" 
                stroke-width="1"
                opacity={i === 0 ? 1 : 0.2}
            />
            {#if i % 2 === 0 || i === yMax}
                <text 
                    x={padding.left - 10} 
                    y={scaleY(i) + 4} 
                    fill="var(--text-secondary)" 
                    font-size="12" 
                    text-anchor="end"
                >{i}</text>
            {/if}
        {/each}
        
        <!-- X Axis Grid Lines -->
        {#each Array(6) as _, i}
            <line
                x1={scaleX(i * (19 / 5))}
                y1={padding.top}
                x2={scaleX(i * (19 / 5))}
                y2={height - padding.bottom}
                stroke="var(--panel-border)"
                stroke-width="1"
                opacity="0.2"
            />
        {/each}

        <!-- WIP Limit Line -->
        <line 
            x1={padding.left} 
            y1={scaleY(currentWipLimit)} 
            x2={width - padding.right} 
            y2={scaleY(currentWipLimit)} 
            stroke="var(--color-info)" 
            stroke-width="1"
            stroke-dasharray="4"
        />
        <text 
            x={padding.left} 
            y={scaleY(currentWipLimit) - 5} 
            fill="var(--color-info)" 
            font-size="12"
        >WIP Limit: {currentWipLimit}</text>
        
        <!-- Queue Data Line -->
        {#if pathData}
            <path 
                d={pathData} 
                fill="none" 
                stroke="var(--color-bottleneck)" 
                stroke-width="3"
                stroke-linejoin="round"
                stroke-linecap="round"
            />
        {/if}
    </svg>
    
    <div class="stats-panel">
        <div class="stat-box">
            <div class="stat-label">Queue (Review)</div>
            <div class="stat-value">{queueLength}</div>
        </div>
        <div class="stat-box">
            <div class="stat-label">Flow Efficiency</div>
            <div class="stat-value">{flowEfficiency.toFixed(0)}%</div>
        </div>
    </div>
</div>

<style>
    .chart-container {
        background-color: var(--panel-bg);
        border: 1px solid var(--panel-border);
        border-radius: 8px;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
    }
    
    .chart-title {
        font-size: 0.9rem;
        color: var(--text-secondary);
        margin-bottom: 1rem;
    }
    
    svg {
        width: 100%;
        height: auto;
        display: block;
    }
    
    .stats-panel {
        display: flex;
        justify-content: space-around;
        margin-top: 1.5rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--panel-border);
    }
    
    .stat-box {
        text-align: center;
    }
    
    .stat-label {
        color: var(--text-secondary);
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
    }
    
    .stat-value {
        font-size: 1.5rem;
        font-weight: 600;
    }
</style>
