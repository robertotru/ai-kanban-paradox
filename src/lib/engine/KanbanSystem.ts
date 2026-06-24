export type Ticket = { 
    id: string; 
    state: 'backlog' | 'development' | 'review' | 'done'; 
    timeInSystem: number;
};

export type TickData = {
    tick: number;
    reviewQueueLength: number;
    reviewWipLimit: number;
};

export class KanbanSystem {
    tickets: Ticket[] = [];
    wipLimits = { development: 5, review: 5 };
    speeds = { development: 2, review: 1 }; // Tickets processed per tick
    
    currentTick = 0;
    history: TickData[] = [];
    
    // Metriche
    flowEfficiency = 100;
    
    constructor(initialBacklog: number = 30) {
        for (let i = 0; i < initialBacklog; i++) {
            this.tickets.push({
                id: `T-${i + 1}`,
                state: 'backlog',
                timeInSystem: 0
            });
        }
        this.recordHistory();
    }

    tick() {
        this.currentTick++;
        
        // 1. Increase time in system for tickets not 'done'
        this.tickets.forEach(t => {
            if (t.state !== 'done') t.timeInSystem++;
        });

        // 2. Process Review -> Done
        let reviewTickets = this.tickets.filter(t => t.state === 'review');
        let processedReview = 0;
        for (let t of reviewTickets) {
            if (processedReview >= this.speeds.review) break;
            t.state = 'done';
            processedReview++;
        }

        // 3. Process Development -> Review
        // AI develops fast and "pushes" into review ignoring WIP limits (creating the queue)
        let developmentTickets = this.tickets.filter(t => t.state === 'development');
        let processedDevelopment = 0;
        for (let t of developmentTickets) {
            if (processedDevelopment >= this.speeds.development) break;
            t.state = 'review';
            processedDevelopment++;
        }

        // 4. Refill Development from Backlog (up to WIP limit)
        let currentDevelopmentCount = this.tickets.filter(t => t.state === 'development').length;
        let backlogTickets = this.tickets.filter(t => t.state === 'backlog');
        let toPull = this.wipLimits.development - currentDevelopmentCount;
        
        for (let i = 0; i < toPull && i < backlogTickets.length; i++) {
            backlogTickets[i].state = 'development';
        }

        this.calculateMetrics();
        this.recordHistory();
    }
    
    calculateMetrics() {
        // Approximate flow efficiency: active work time / total time
        // We assume that if the queue grows, efficiency drops.
        const reviewQueue = this.tickets.filter(t => t.state === 'review').length;
        
        if (reviewQueue > this.wipLimits.review) {
            // If queue exceeds limit, efficiency plummets
            const excess = reviewQueue - this.wipLimits.review;
            this.flowEfficiency = Math.max(10, 100 - (excess * 5)); 
        } else {
            this.flowEfficiency = 100;
        }
    }

    recordHistory() {
        const reviewQueueLength = this.tickets.filter(t => t.state === 'review').length;
        this.history.push({
            tick: this.currentTick,
            reviewQueueLength,
            reviewWipLimit: this.wipLimits.review
        });
        
        // Keep only last 20 ticks for the chart
        if (this.history.length > 20) {
            this.history.shift();
        }
    }
    
    reset() {
        this.currentTick = 0;
        this.history = [];
        this.tickets = [];
        this.flowEfficiency = 100;
        for (let i = 0; i < 30; i++) {
            this.tickets.push({
                id: `T-${i + 1}`,
                state: 'backlog',
                timeInSystem: 0
            });
        }
        this.recordHistory();
    }
}
