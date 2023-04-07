'use strict';

const block_decompose_method = matrix => {

    const
        { length: lengthY } = matrix,
        lengthX = matrix[0].length;

    let det = 1;

    if (lengthY !== lengthX) throw new Error("Матрица должна быть квадратной!");

    for (let k = 0; k < lengthY; k++) {
        let pivot = matrix[k][k];
        if (pivot === 0) {
            for (let i = k + 1; i < lengthY; i++) {
                if (matrix[i][k] !== 0) {
                    [
                        matrix[k], matrix[i]
                    ] = [matrix[i], matrix[k]];
                    det *= -1;
                    pivot = matrix[k][k];
                    break;
                };
            };
            if (pivot === 0) return 0;
        };

        for (let i = k + 1; i < lengthY; i++) {
            const factor = matrix[i][k] / pivot;
            for (let j = k + 1; j < lengthY; j++)
                matrix[i][j] -= factor * matrix[k][j];

            matrix[i][k] = 0;
        };
        det *= pivot;
    };
    return det;
};

export default block_decompose_method;