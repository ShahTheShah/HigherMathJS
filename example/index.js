'use strict';

import HigherMathJS, { Matrix } from '../lib/highermathjs.js';


const
    matrix_1 = new Matrix([
        [12, 13, 17],
        [14, 12, 16],
        [21, 12, 11],
    ]),
    matrix_2 = new Matrix([
        [2, 12.001210, 12.12212],
        [7, 23.23221, 112.02321],
        [12.2, 123, 232.1231231]
    ]);

Matrix.setDigitAfterPoint(2)
