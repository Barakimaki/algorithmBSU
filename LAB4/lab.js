const matrix =
    [
        [Infinity, 2, 10, 3, 15, 8],
        [2, Infinity, 5, 4, Infinity , 6],
        [10, 5, Infinity, 15, 12, 3],
        [5, Infinity, 15, Infinity, 5, 10],
        [15, 2, 12, 5, Infinity, Infinity],
        [8, 6, 3, 10, 4, Infinity]
    ];
const matrix2 =
    [
            [null, 10, 2, 3, 5, 7],
            [10, null, 5, 10, 15 , 3],
            [4, 5, null, 6, 5, 2],
            [3, 10, 6, null, 7, 15],
            [Infinity, 15, 5, 3, null, 2],
            [7, 3, Infinity, 15, 2, null]
    ];

function getFloydGraph(graph, n) {
        let costGraph = [];
        for (let i = 0; i < n; i++) {
                costGraph[i] = [];
                for (let j = 0; j < n; j++) {
                        costGraph[i][j] = graph[i][j];
                }
        }

        for (let k = 0; k < n; k++) {
                for (let i = 0; i < n; i++) {
                        for (let j = 0; j < n; j++) {
                                costGraph[i][j] = Math.min(costGraph[i][j], costGraph[i][k] + costGraph[k][j]);
                        }
                }
        }
        for (let i = 0 ; i < n; i++){
                costGraph[i][i] = Infinity
        }
        return costGraph;
}

const transpose = matrix => matrix[0].map((col, i) => matrix.map(row => row[i]));

const minusEl = graph => {
    let minRowEl = []
    for(let i = 0; i < graph.length; i++){
        minRowEl[i] = Math.min(...graph[i])
    }
    return minRowEl
}

const divMin = (graph, minRowEl) => {

    for(let i = 0; i < graph.length; i++){
        for(let j = 0; j < graph[i].length; j++){
            graph[i][j] = graph[i][j] - minRowEl[i]
        }
    }
    return graph
}
function little(graph, result, count = 0) {
    if(count === graph.length - 1) {
        for (let i = 0; i < graph.length; i++) {
            for (let j = 0; j < graph[i].length; j++) {
                if(graph[i][j] !== Infinity){
                    result.push({i: i, j: j})
                    for(let k = 0; k < result.length; k++){
                        for (let r = k+1; r < result.length; r++){
                            if(result[k].j === result[r].i){
                                buffer = result[k+1]
                                result[k+1] = result[r]
                                result[r] = buffer
                            }
                        }
                    }
                    return result
                }
            }
        }
    }
    let H = minusEl(graph).reduce((sum, value) => sum + value, 0)
    graph = divMin(graph, minusEl(graph))
    for (let i = 0; i < graph.length; i++) {
        for (let j = 0; j < graph[i].length; j++) {
            if(isNaN(graph[i][j])){
                graph[i][j] = Infinity
            }
        }
    }
    let graphT = transpose(graph)
    H = H + minusEl(graphT).reduce((sum, value) => sum + value, 0)
    graphT = divMin(graphT, minusEl(graphT))
    for (let i = 0; i < graphT.length; i++) {
        for (let j = 0; j < graphT[i].length; j++) {
            if(isNaN(graphT[i][j])){
                graphT[i][j] = Infinity
            }
        }
    }
    graph = transpose(graphT)
    let res = []
    for (let i = 0; i < graph.length; i++) {
        for (let j = 0; j < graph[i].length; j++) {
            if (graph[i][j] === 0) {
                let rij = {}
                rij.i = i
                rij.j = j
                let mini = []
                let minj = []
                for (let k = 0; k < graph.length; k++) {
                    if (k !== i) {
                        mini.push(graph[k][j])
                    }
                }
                for (let k = 0; k < graph.length; k++) {
                    if (k !== j) {
                        minj.push(graph[i][k])
                    }
                }
                rij.sum = Math.min(...mini) + Math.min(...minj)
                res.push(rij)
            }
        }
    }
    let max = 0
    for (let i = 0; i < res.length; i++) {
        if (max < res[i].sum) {
            max = res[i].sum
        }
    }
    let arch = {}
    for (let i = 0; i < res.length; i++) {
        if (res[i].sum === max) {
            arch.i = res[i].i
            arch.j = res[i].j
        }
    }
    let newGraph = []
    for (let i = 0; i < graph.length; i++) {
        newGraph[i] = []
        for (let j = 0; j < graph[i].length; j++) {
            if(i === arch.i || j === arch.j){
                newGraph[i][j] = Infinity
            } else {
                newGraph[i][j] = graph[i][j]
            }
        }
    }
    newGraph[arch.j][arch.i] = Infinity
    count++
    result.push(arch)
    return little(newGraph, result, count)
}
const result = []

const salesman = (graph) => {
    let result = []
    return little(graph, result)
}


console.log(salesman(getFloydGraph(matrix, 6)))
console.log(salesman(getFloydGraph(matrix2, 6)))