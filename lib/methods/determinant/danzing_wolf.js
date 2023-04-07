'use strict';

const danzing_wolf_method = matrix => {

    const { length: lengthY } = matrix;

    const pivot = new Array(lengthY).fill(0);
    let
        det = 1,
        toggle = 1;

    for (let i = 0; i < lengthY; i++) {
        let
            rowMax = 0,
            colMax = 0,
            maxValue = 0;

        for (let j = i; j < lengthY; j++) {
            for (let k = i; k < lengthY; k++) {
                const value = Math.abs(matrix[j][k]);
                if (value > maxValue) {
                    maxValue = value;
                    rowMax = j;
                    colMax = k;
                };
            };
        };

        if (maxValue === 0) return 0;

        if (rowMax !== i) {
            matrix[rowMax] = matrix.splice(i, 1, matrix[rowMax])[0];
            toggle *= -1;
        };
        if (colMax !== i) {
            for (let j = 0; j < lengthY; j++) {
                const temp = matrix[j][colMax];
                matrix[j][colMax] = matrix[j][i];
                matrix[j][i] = temp;
                pivot[j] = pivot[j] + 1;
                toggle *= -1;
            };
        };

        const multiplier = matrix[i][i];
        for (let j = i + 1; j < lengthY; j++) {
            const factor = matrix[j][i] / multiplier;
            matrix[j][i] = factor;
            for (let k = i + 1; k < lengthY; k++)
                matrix[j][k] -= factor * matrix[i][k];
        };

        det *= multiplier;
    };
    if (toggle === -1) det *= -1;

    return det;
};

export default danzing_wolf_method;