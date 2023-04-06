'use strict';

import HigherMathJS from '../lib/highermathjs.js';

const N = 19

const matrix = [
    [10 * N, N, N + 2],
    [N, 9 * N, 3 * N],
    [2 * N, 3 * N, 11 * N],
]

console.log(HigherMathJS.det(matrix, {
    method: 'gausse'
}))
console.log(HigherMathJS.det(matrix, {
    method: 'minor'
}))
console.log(HigherMathJS.det(matrix, {
    method: 'cramer'
}))
console.log(HigherMathJS.det(matrix, {
    method: 'bareis'
}))
console.log(HigherMathJS.det(matrix, {
    method: 'lu'
}))
console.log(HigherMathJS.det(matrix, {
    method: 'gausse_jordan'
}))
console.log(HigherMathJS.det(matrix, {
    method: 'gausse_croneker'
}))
