const colors = ['green', 'red', 'blue', 'pink', 'yellow', 'white', 'black']

class Graph {

    constructor(adj) {

        this.adj = adj
    }

    getList() {
        return this.adj;
    }

    matrixAdj() {
        let graph = this.getList();
        let res = []
        for (let i = 0; i < Object.keys(graph).length; i++) {
            let line = [];
            for (let j = 0; j < Object.keys(graph).length; j++) {
                if (graph[i].includes(j)) {
                    line.push(1);
                } else line.push(0);
            }
            res.push(line)
        }
        return res

    }

    stringMatrixAdj() {
        let graph = this.matrixAdj();
        for (let i = 0; i < graph.length; i++) {
            graph[i] = graph[i].join(',');
        }
        return graph.join('\n');

    }

    matrixColoring() {
        let color = []
        let matrix = this.matrixAdj()
        for (let i = 0; i < matrix.length; i++) {
            matrix[i][i] = 1
        }
        for (let i = 0; i < matrix.length; i++) {
            color[i] = -1;
        }
        let c = 0
        let i = 0
        for (i; i < matrix.length; i++) {
            if (color[i] === -1) {
                let j = 0
                for (j; j < matrix.length; j++) {
                    if (i === matrix.length - 1 && color[j] === -1) {
                        break
                    }
                    if (matrix[i][j] === 0) {
                        if (color[j] === -1) {
                            break
                        }
                    }
                }
                if (j === 6) {
                    j = 0
                }
                if (color[i] === -1) {

                    for (let r = 0; r < matrix.length; r++) {
                        matrix[i][r] = matrix[i][r] | matrix [j][r]
                    }
                    if (color[i] === -1) {
                        color[i] = c
                    }
                    if (color[j] === -1) {
                        color[j] = c
                    }
                    c++
                }
            }
        }

        let ans = []
        for (let i = 0; i < color.length; i++) {
            ans.push({})
            ans[i].adjV = this.adj[i]
            ans[i].color = colors[color[i]]
        }

        return ans

    }

    greedyColoring() {
        let result = [];

        for (let i = 0; i < this.adj.length; i++)
            result[i] = -1;

        result[0] = 0;

        let available = [];

        for (let i = 0; i < this.adj.length; i++) {
            available[i] = true;
        }

        for (let v = 1; v < this.adj.length; v++) {

            for (let it of this.adj[v]) {
                let i = it;
                if (result[i] !== -1)
                    available[result[i]] = false;
            }

            let cr;
            for (cr = 0; cr < this.adj.length; cr++) {
                if (available[cr])
                    break;
            }

            result[v] = cr;

            for (let i = 0; i < this.adj.length; i++)
                available[i] = true;
        }
        let ans = []

        for (let v = 0; v < this.adj.length; v++) {
            ans.push({})
            ans[v].adjV = this.adj[v]
            ans[v].color = colors[result[v]]
        }

        return ans
    }
}


let
    adjList1 = [
        [1, 2, 3, 6],
        [0, 2, 6],
        [0, 1, 3],
        [0, 2, 4, 5],
        [3, 5],
        [3, 4, 6],
        [0, 1, 5],
    ]

let book = [
    [1, 2, 5],
    [0, 2, 3],
    [0, 1, 3, 4, 5],
    [1, 2, 4],
    [2, 3, 5],
    [0, 2, 3, 4]
]

// let adjList2 = {
//     0: {
//         content: {},
//         endpoints: [1, 2, 3]
//     },
//     1: {
//         content: {},
//         endpoints: [2, 6]
//     },
//     2: {
//         content: {},
//         endpoints: [3]
//     },
//     3: {
//         content: {},
//         endpoints: [0, 4, 5]
//     },
//     4: {
//         content: {},
//         endpoints: [5]
//     },
//     5: {
//         content: {},
//         endpoints: [6]
//     },
//     6: {
//         content: {},
//         endpoints: [0]
//     },
// }


let myGraph = new Graph(adjList1);

console.log(myGraph);

console.log(myGraph.greedyColoring())
console.log(myGraph.stringMatrixAdj())
console.log(myGraph.matrixColoring())

// let bookGraph = new Graph(book)
//
// console.log(bookGraph.matrixColoring())
// console.log(bookGraph.greedyColoring())
