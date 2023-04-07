'use strict';

const minor_method = matrix => {

    const { length: lengthY } = matrix;

    if (lengthY === 1) return matrix[0][0];
    if (lengthY === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

    let det = 0;
    for (let i = 0; i < lengthY; i++) {
        const minor = [];
        for (let j = 1; j < lengthY; j++)
            minor.push(matrix[j].slice(0, i).concat(matrix[j].slice(i + 1)));

        const sign = i % 2 === 0 ? 1 : -1;
        det += sign * matrix[0][i] * minor_method(minor);
    };
    return det;
};

export default minor_method;