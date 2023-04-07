'use strict';

import HigherMathJS from '../lib/highermathjs.js';

const N = 19

const matrix = [
    [4, 2, 6],
    [2, 10, 9],
    [6, 9, 14]
]

const
    det_gausse = HigherMathJS.det(matrix, {
        method: 'gausse'
    }),
    det_minor = HigherMathJS.det(matrix, {
        method: 'minor'
    }),
    det_cramer = HigherMathJS.det(matrix, {
        method: 'cramer'
    }),
    det_bareis = HigherMathJS.det(matrix, {
        method: 'bareis',
        digitAfterPoint: 2
    }),
    det_lu = HigherMathJS.det(matrix, {
        method: 'lu'
    }),
    det_gausse_jordan = HigherMathJS.det(matrix, {
        method: 'gausse_jordan'
    }),
    det_gausse_croneker = HigherMathJS.det(matrix, {
        method: 'gausse_croneker'
    }),
    det_property = HigherMathJS.det(matrix, {
        method: 'det_property'
    }),
    det_laplace = HigherMathJS.det(matrix, {
        method: 'laplace'
    }),
    det_block_decompose = HigherMathJS.det(matrix, {
        method: 'block_decompose'
    }),
    det_danzing_wolf = HigherMathJS.det(matrix, {
        method: 'danzing_wolf'
    }),
    det_khaletsky = HigherMathJS.det(matrix, {});

console.log(det_gausse)
console.log(det_minor)
console.log(det_cramer)
console.log(det_bareis)
console.log(det_lu)
console.log(det_gausse_jordan)
console.log(det_gausse_croneker)
console.log(det_property)
console.log(det_laplace)
console.log(det_block_decompose)
console.log(det_danzing_wolf)
console.log(det_khaletsky)