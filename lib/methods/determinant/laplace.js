'use strict';

const laplace_method = matrix => {

    const { length: lengthY } = matrix;

    if (lengthY === 1) return matrix[0][0];
    if (lengthY === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

    let det = 0;

    for (let i = 0; i < lengthY; i++) {
        const minor = new Array(lengthY - 1);

        for (let j = 0; j < lengthY - 1; j++) minor[j] = new Array(lengthY - 1);

        for (let j = 1; j < lengthY; j++) {
            for (let k = 0; k < lengthY; k++)
                if (k < i) minor[j - 1][k] = matrix[j][k];
                else if (k > i) minor[j - 1][k - 1] = matrix[j][k];
        };

        const sign = (i % 2 === 0) ? 1 : -1;
        det += sign * matrix[0][i] * laplace_method(minor);
    };

    return det;
};

export default laplace_method;