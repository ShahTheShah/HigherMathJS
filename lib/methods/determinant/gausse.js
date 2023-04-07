'use strict';

const gausse_method = matrix => {

    const { length: lengthY } = matrix;

    let det = 1;

    for (let i = 0; i < lengthY; i++) {
        for (let j = i + 1; j < lengthY; j++) {
            if (matrix[i][i] === 0) {
                let foundNonZero = false;

                for (let k = i + 1; k < lengthY; k++)
                    if (matrix[k][i] !== 0) {
                        [
                            matrix[i], matrix[k]
                        ] = [matrix[k], matrix[i]];
                        det *= -1;
                        foundNonZero = true;
                        break;
                    };

                if (!foundNonZero) return 0;
            };

            const factor = matrix[j][i] / matrix[i][i];

            for (let k = i; k < lengthY; k++)
                matrix[j][k] -= factor * matrix[i][k];
        };

        det *= matrix[i][i];
    };
    return det;
};

export default gausse_method;