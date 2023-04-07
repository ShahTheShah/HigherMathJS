'use strict';

const gausse_jordan_method = matrix => {

    const { length: lengthY } = matrix;

    let det = 1;

    for (let i = 0; i < lengthY; i++) {
        if (matrix[i][i] === 0) {
            for (let j = i + 1; j < lengthY; j++) {
                if (matrix[j][i] !== 0) {
                    [
                        matrix[i], matrix[j]
                    ] = [matrix[j], matrix[i]];
                    det *= -1;
                    break;
                };
            };
        };

        const diagonalElement = matrix[i][i];
        det *= diagonalElement;
        for (let j = i; j < lengthY; j++) matrix[i][j] /= diagonalElement;

        for (let j = i + 1; j < lengthY; j++) {
            const coefficient = matrix[j][i];
            for (let k = i; k < lengthY; k++)  matrix[j][k] -= coefficient * matrix[i][k];
        };
    };

    return det;
};

export default gausse_jordan_method;