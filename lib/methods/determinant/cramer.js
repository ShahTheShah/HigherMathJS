'use strict';

const cramer_method = matrix => {

    const
        { length: lengthY } = matrix,
        lengthX = matrix[0].length;

    if (lengthY !== lengthX) throw new Error('Матрица должна быть квадратной!');

    if (lengthY === 1) return matrix[0][0];

    if (lengthY === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

    let det = 0;

    for (let j = 0; j < lengthY; j++) {
        const minor = [];
        for (let k = 1; k < lengthY; k++)
            minor.push(matrix[k].slice(0, j).concat(matrix[k].slice(j + 1)));

        const sign = j % 2 === 0 ? 1 : -1;
        det += sign * matrix[0][j] * cramer_method(minor);
    };

    return det;
};

export default cramer_method;