function areEqual(S1, S2) {
    if (S1 !== S2) {
        return false
    }
    for (let i = 0; i < S1.length; i++) {
        if (S1[i] !== S2[i]) {
            return false
        }
    }
    return true
}

function polyHash(S, p, x) {
    let hash = 0
    for (let i = 0; i <= S.length - 1; i++) {
        hash = (hash * x + S.charCodeAt(i)) % p
    }
    return hash
}

function rabinKarp(T, P) {
    let p = 1019
    let x = 34
    let positions = []
    let pHash = polyHash(P,p,x)
    let text
    let tHash

    // Loop through text
    for (let k = 0; k <= (T.length - P.length); k++) {
        text = T.slice(k, (k + P.length))

        tHash = polyHash(text,p,x)

        // If hashes don't match, continue to next loop
        if (pHash !== tHash) {
            continue
        }

        // If hashes do match, push locations to positions list
        if (areEqual(text,P)) {
            positions.push(k)
        }
    }
    return positions
}


////
function boyerMooreSearch(text, pattern, start = 0){

    text = text.slice(start)

    // Handle edge case
    if (pattern.length === 0) {
        return -1;
    }

    let charTable = makeCharTable(pattern);
    let offsetTable = makeOffsetTable(pattern);

    for (let i = pattern.length - 1, j; i < text.length;) {
        for (j = pattern.length - 1; pattern[j] === text[i]; i--, j--) {
            if (j === 0) {
                return i+start;
            }
        }

        const charCode = text.charCodeAt(i);
        i+= Math.max(offsetTable[pattern.length - 1 - j], charTable[charCode]);
    }

    return -1;
}

/**
 * Creates jump table, based on mismatched character information
 */
function makeCharTable(pattern) {
    let table = [];

    // 65536 being the max value of char + 1
    for (let i = 0; i < 65536; i++) {
        table.push(pattern.length);
    }

    for (let i = 0; i < pattern.length - 1; i++) {
        const charCode = pattern.charCodeAt(i);
        table[charCode] = pattern.length - 1 - i;
    }

    return table;
}


function makeOffsetTable(pattern) {
    let table = [];
    table.length = pattern.length;

    let lastPrefixPosition = pattern.length;

    for (let i = pattern.length; i > 0; i--) {
        if (isPrefix(pattern, i)) {
            lastPrefixPosition = i;
        }

        table[pattern.length - i] = lastPrefixPosition - 1 + pattern.length;
    }

    for (let i = 0; i < pattern.length - 1; i++) {
        const slen = suffixLength(pattern, i);
        table[slen] = pattern.length - 1 - i + slen;
    }

    return table;
}

function isPrefix(pattern, p) {
    for(let i = p, j = 0; i < pattern.length; i++, j++) {
        return pattern[i] === pattern[j]
        // if (pattern[i] !== pattern[j]) {
        //     return false;
        // }
        //
        // return true;
    }
}

function suffixLength(pattern, p) {
    let len = 0;

    for (let i = p, j = pattern.length - 1; i >= 0 && pattern[i] === pattern[j]; i--, j--) {
        len += 1;
    }

    return len;
}


/////
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



/////
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
console.log(findAll(str, substr, boyerMooreSearch))
console.log(rabinKarp(str, substr))

