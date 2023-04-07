'use strict';

const khaletsky_method = matrix => {
    const
        { length: lengthY } = matrix,
        lengthX = matrix[0].length;

    let det = 1;

    if (lengthY !== lengthX) throw new Error("Матрица должна быть квадратной");

    const L = Array.from({ length: lengthY }, () => Array.from({ length: lengthY }, () => 0));

    for (let i = 0; i < lengthY; i++) {
        for (let j = 0; j <= i; j++) {
            let sum = 0;
            for (let k = 0; k < j; k++) sum += L[i][k] * L[j][k];

            if (i === j) {
                if (matrix[i][i] - sum <= 0)
                    throw new Error("Матрица не является положительно определенной");

                L[i][j] = Math.sqrt(matrix[i][i] - sum);
            } else
                L[i][j] = (matrix[i][j] - sum) / L[j][j];
        };
    };

    for (let i = 0; i < lengthY; i++) det *= L[i][i];

    return det ** 2;
};

export default khaletsky_method;