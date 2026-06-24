<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { KanbanSystem } from './lib/engine/KanbanSystem';
    import Header from './lib/components/Header.svelte';
    import KanbanBoard from './lib/components/KanbanBoard.svelte';
    import MetricsChart from './lib/components/MetricsChart.svelte';
    import Controls from './lib/components/Controls.svelte';

    let system = new KanbanSystem(50);
    
    // Reactivity binders
    let tickets = system.tickets;
    let history = system.history;
    let flowEfficiency = system.flowEfficiency;
    let reviewQueueLength = 0;
    
    let isPlaying = false;
    let interval: ReturnType<typeof setInterval>;
    
    function updateState() {
        tickets = [...system.tickets];
        history = [...system.history];
        flowEfficiency = system.flowEfficiency;
        reviewQueueLength = tickets.filter(t => t.state === 'review').length;
    }
    
    function handleTick() {
        system.tick();
        updateState();
    }

    function togglePlay() {
        isPlaying = !isPlaying;
        if (isPlaying) {
            interval = setInterval(handleTick, 1000); // 1 tick per second
        } else {
            clearInterval(interval);
        }
    }
    
    function handleReset() {
        isPlaying = false;
        clearInterval(interval);
        system.reset();
        updateState();
    }
    
    function handleControlsUpdate() {
        // System state was directly modified via binding, just force UI update if needed
        updateState();
    }
    
    onMount(() => {
        updateState();
    });
    
    onDestroy(() => {
        if (interval) clearInterval(interval);
    });
</script>

<main>
    <Header 
        {isPlaying} 
        onTogglePlay={togglePlay} 
        onReset={handleReset} 
    />
    
    <KanbanBoard 
        {tickets} 
        wipLimits={system.wipLimits} 
    />
    
    <MetricsChart 
        {history} 
        queueLength={reviewQueueLength} 
        {flowEfficiency} 
    />
    
    <Controls 
        speeds={system.speeds} 
        wipLimits={system.wipLimits} 
        onUpdate={handleControlsUpdate} 
    />
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
    }
</style>
