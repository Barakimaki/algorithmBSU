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

let kmpSearch = (str, substr) => {
    let i
    let j = 0
    pi = prefixFunction(substr)
    for (i = 0; i < str.length; i++) {
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

console.log(kmpSearch('ABDFSSGAERT', 'SGA'))

