class Genetic {
    constructor() {
        this.n = Math.floor(Math.random() * 100)
        this.population = []
        this.winners = []
        this.generation = 0
        for (let i = 0; i < this.n; i++) {
            let individual = []
            for (let j = 0; j < 50; j++) {
               // let bit = Math.random()
               // bit >= 0.5 ? individual.push(1) : individual.push(0)
                individual.push(0)
            }
            this.population.push({individual, fitness: individual.reduce((a, c) => a + c, 0)})
        }
        this.averageNumber = this.avg()
    }

    avg() {
        let avg = 0
        for (let i = 0; i < this.n; i++) {
            avg += this.population[i].fitness;
        }
        return Math.floor(avg / this.n)
    }

    getPopulation() {
        console.log('Generation ' + this.generation)
        console.log(this.population)
        console.log('Average number ' + this.averageNumber)
    }

    selection() {
        this.shufflePopulation()
        for (let i = 0; i < this.n; i++) {
            if (i === this.n - 1) {
                this.winners.push(this.population[i])
                break;
            }
            let winner = this.population[i].fitness >= this.population[i + 1].fitness
                ? this.population[i]
                : this.population[i + 1]
            this.winners.push(winner)
            i++
        }
        this.crossing()
    }

    crossing() {
        let newGeneration = []
        for (let i = 0; i < this.winners.length-1; i++) {
            for (let j = 0; j < 2; j++) {
                let firstParent = this.winners[i].individual
                let random = Math.floor(Math.random() * this.winners.length)
                if (random === i || random === this.winners.length) {
                    random > this.winners.length ? random-- : random++
                }
                let secondParent = this.winners[random].individual
                let descendant1 = {individual: []}
                let descendant2 = {individual: []}
                for (let k = 0; k < 50; k++) {
                    let divider = Math.floor(Math.random()*50)
                    if (k < divider) {
                        descendant1.individual[k] = firstParent[k]
                        descendant2.individual[k] = secondParent[k]
                    } else {
                        descendant2.individual[k] = firstParent[k]
                        descendant1.individual[k] = secondParent[k]
                    }
                }
                descendant1.fitness = descendant1.individual.reduce((a, c) => a + c, 0)
                descendant2.fitness = descendant2.individual.reduce((a, c) => a + c, 0)
                newGeneration.push(descendant1)
                newGeneration.push(descendant2)
            }
        }
        this.winners = []
        newGeneration.sort((a, b) => b.fitness - a.fitness)
        this.population = []
        for (let i = 0; i < this.n; i++) {
            this.population.push(newGeneration[i])
        }
        this.mutation()
    }

    mutation() {
        this.shufflePopulation()
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < 50; j++) {
                let isMutation = Math.random()
                if (isMutation < 0.1) {
                    this.population[i].individual[j] === 0
                        ? this.population[i].individual[j] = 1
                        : this.population[i].individual[j] = 0
                }
            }
        }
        this.averageNumber = this.avg()
        this.generation = this.generation + 1
        if (this.generation === 50 || this.averageNumber >= 40) {
            console.log('Final')
            this.getPopulation()
        } else {
            this.getPopulation()
            this.selection()
        }

    }

    shufflePopulation() {
        for (let i = this.n - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.population[i];
            this.population[i] = this.population[j];
            this.population[j] = temp;
        }
    }


}

let genetic = new Genetic();

genetic.getPopulation()
genetic.selection()
