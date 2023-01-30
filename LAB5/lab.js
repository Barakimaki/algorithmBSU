class Genetic {
    constructor() {
        this.n = 50
        this.population = []
        this.winners = []
        this.generation = 0
        for (let i = 0; i < this.n; i++) {
            let individual = []
            for (let j = 0; j < 5; j++) {
                let bit = Math.floor(Math.random() * 200 - 100)
                individual.push(bit)
            }
            this.population.push({
                individual,
                answer: this.answer(individual),
                fitness: this.fitness(individual),

            })
        }
    }

    getPopulation() {
        console.log('Generation ' + this.generation)
        console.log(this.population)
    }

    selection() {
        this.shufflePopulation()
        for (let i = 0; i < this.n; i++) {
            let winner = Math.abs(this.population[i].fitness) <= Math.abs(this.population[i + 1].fitness)
                ? this.population[i]
                : this.population[i + 1]
            this.winners.push(winner)
            i++
        }
        this.crossing()
    }

    crossing() {
        let newGeneration = []
        for (let i = 0; i < this.winners.length; i++) {
            for (let j = 0; j < 2; j++) {
                let firstParent = this.winners[i].individual
                let random = Math.floor(Math.random() * (this.winners.length-1))
                if (random === i || random === this.winners.length) {
                    random > this.winners.length-1 ? random-- : random++
                }
               // console.log(this.winners[random].individual)
                if(this.winners[random] === undefined){
                    debugger
                }
                let secondParent = this.winners[random].individual
                let descendant1 = {individual: []}
                let descendant2 = {individual: []}
                for (let k = 0; k < 5; k++) {
                    if (k < 3) {
                        descendant1.individual[k] = firstParent[k]
                        descendant2.individual[k] = secondParent[k]
                    } else {
                        descendant2.individual[k] = firstParent[k]
                        descendant1.individual[k] = secondParent[k]
                    }
                }
                for (let k = 0; k < 5; k++) {
                    if(k < 2 || k> 4){
                        descendant1.individual[k] = firstParent[k]
                        descendant2.individual[k] = secondParent[k]
                    } else {
                        descendant2.individual[k] = firstParent[k]
                        descendant1.individual[k] = secondParent[k]
                    }
                }
                descendant1.fitness = this.fitness(descendant1.individual)
                descendant2.fitness = this.fitness(descendant2.individual)
                descendant1.answer = this.answer(descendant1.individual)
                descendant2.answer = this.answer(descendant2.individual)
                newGeneration.push(descendant1)
                newGeneration.push(descendant2)
            }
        }
        this.winners = []
        newGeneration.sort((a, b) => Math.abs(a.fitness) - Math.abs(b.fitness))
        this.population = []
        for (let i = 0; i < this.n; i++) {
            this.population.push(newGeneration[i])
        }
        this.mutation()
    }

    mutation() {
        this.shufflePopulation()
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < 5; j++) {
                let isMutation = Math.random()
                if (isMutation < 0.1) {
                    this.population[i].individual[j] = Math.floor(Math.random()*200 - 100)
                }
            }
        }
        let flag = 0
        for(let i = 0 ; i< this.n; i++){
            if(this.population[i].fitness === 0){
                flag +=1
            }
        }
        this.generation = this.generation + 1
        if (this.generation === 500 || flag === 50) {
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

    fitness(individual) {
        // let equales1 = [[1,0,2,2,2], [0,0,0,1,0], [0,0,1,0,2], [0,0,1,2,2], [1,2,2,1,2]]
        // let solve1 = -50
        // let answer1 = 0
        // for(let i = 0; i < 5; i++){
        //     let part1 = 1
        //     for(let j = 0; j < 5; j++){
        //         part1*= individual[j]**equales1[i][j]
        //     }
        //     answer1+=part1
        // }
        let solve1 = -50
        let answer1 = this.answer(individual)
        return answer1-solve1
    }

    answer(individual){
        let equales1 = [[1,0,2,2,2], [0,0,0,1,0], [0,0,1,0,2], [0,0,1,2,2], [1,2,2,1,2]]
        let answer1 = 0
        for(let i = 0; i < 5; i++){
            let part1 = 1
            for(let j = 0; j < 5; j++){
                part1*= individual[j]**equales1[i][j]
            }
            answer1+=part1
        }
        return answer1
    }
}

let genetic = new Genetic();

genetic.getPopulation()
genetic.selection()
