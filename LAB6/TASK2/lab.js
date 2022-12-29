let prefixFunction = (str) => {
    str = str.toString()

    let res = []
    let len
    let front
    let end
    let found
    for (let i = 1; i <= str.length; i += 1) {
        front = Math.max(1, i - ((res[i - 2] || 0) + 1))
        end = Math.min(i - 1, (res[i - 2] || 0) + 1)
        found = false
        len = 0
        while (end >= 1 && front <= i && !found) {
            if (str.substring(0, end) === str.substring(front, i)) {
                found = true
                len = end
            } else {
                end -= 1
                front += 1
            }
        }
        res[i - 1] = len
    }
    return res
}

let kmpSearch = (str, substr, start = 0) => {
    let i
    let j = 0
    pi = prefixFunction(substr)
    for (i = start; i < str.length; i++) {
        while (j > 0 && str[i] !== substr[j]) {
            j = pi[j - 1]
        }
        if (str[i] === substr[j]) {
            j += 1
        }
        if (j >= substr.length) {
            return i - j + 1
        }
    }

    return -1
}

let bruteSearch = (str, substr, start = 0) => {
    for (let i = start; i <= str.length - substr.length; i++) {
        let success = true;
        for (let j = 0; j < substr.length; j++) {
            if (str[i + j] !== substr[j]) {
                success = false
            }
        }
        if (success) return i;
    }
    return -1;
}

let findAll = (str, substr, find) => {
    let res = []
    let t = 0
    while (t !== -1) {
        let add = find(str, substr, t + 1)
        t = add
        if (t !== -1) {
            res.push(add)
        }
    }
    return res
}

let str = 'ABDCFASDERQWSDETRTSDE'
let substr = 'SDE'

console.log(findAll(str, substr, bruteSearch))
console.log(findAll(str, substr, kmpSearch))

