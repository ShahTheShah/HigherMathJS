'use strict';

const gausse_croneker_method = matrix => {

    const { length: lengthY } = matrix;

    let det = 1;

    for (let k = 0; k < lengthY - 1; k++) {
        for (let i = k + 1; i < lengthY; i++) {
            const factor = matrix[i][k] / matrix[k][k];
            for (let j = k + 1; j < lengthY; j++)
                matrix[i][j] -= factor * matrix[k][j];
        };
    };

    for (let i = 0; i < lengthY; i++) det *= matrix[i][i];

    return det;
};

export default gausse_croneker_method;