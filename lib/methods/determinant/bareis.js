'use strict';

const bareis_method = matrix => {

    const { length: lengthY } = matrix;

    let det = 1;

    for (let i = 0; i < lengthY; i++) {
        for (let j = i + 1; j < lengthY; j++) {
            const factor = matrix[j][i] / matrix[i][i];
            for (let k = i; k < lengthY; k++)
                matrix[j][k] = matrix[j][k] - factor * matrix[i][k];
        };
    };
    for (let i = 0; i < lengthY; i++)  det *= matrix[i][i];

    return det;
};

export default bareis_method;