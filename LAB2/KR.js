class Graph {
    constructor(adjacencyList = {}) {
        this.adjacencyList = adjacencyList;
    }

    getList() {
        return this.adjacencyList;
    }

    routes(startVertex) {
        let list = this.adjacencyList;
        let routes = [[startVertex]]
        let k = 0
        function addRoute(vertex,) {
            let length = routes.length
            for (let i = k; i < length; i++) {
                if (routes[i][routes[i].length - 1] === vertex) {
                    let neighboursVertex = list[vertex];
                    for (let j = 0; j < neighboursVertex.length; j++) {
                        let flag = true
                        for (let k = 0; k < routes[i].length; k++) {
                            if (routes[i][k] == neighboursVertex[j]){
                                flag = false
                            }
                        }
                        if (flag) {
                            routes.push([...routes[i], neighboursVertex[j]]);
                            k++;
                            addRoute(neighboursVertex[j])
                        }
                    }

                }
            }
        }

        addRoute(startVertex)
        routes = routes.map(el=>el.map(ell=> Number(ell)));
        let max = 0;
        for (let route of routes) {
            if (route.length > max) max = route.length;
        }
        routes = routes.filter(el => el.length === max);
        return routes;
    }

    allRoutes(K = -1) {
        let res = []
        for (let key in this.adjacencyList) {
                res.push(...this.routes(key));
        }
        let max = 0;
        for (let el of res) {
            if (el.length > max) max = el.length;
        }
        res = res.filter(el => el.length === max);
        if(K > -1 && max >= K){
            console.log('Есть путь с длинной большей или равной К')
        } else if(K > -1){
            console.log('Нет пути с длинной большей или равной К')
        }
            return res;
    }
}


let adjList1 = {
    0:  [1, 6],
    1:  [2, 5],
    2:  [4, 7],
    3: [8, 9],
    4: [5],
    5: [ 9],
    6: [3, 5],
    7: [3, 8],
    8: [],
    9:  [1]
}

let adjList2 = {
    0: [1, 2, 3],
    1: [2],
    2: [3, 4],
    3: [0, 4],
    4: [],
}

let myGraph1 = new Graph(adjList1);
let myGraph2 = new Graph(adjList2);
console.log(myGraph1.allRoutes(7));
console.log(myGraph2.allRoutes(3));
