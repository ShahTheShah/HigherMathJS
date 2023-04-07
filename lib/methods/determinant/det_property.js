'use strict';

const det_property_method = matrix => {

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
            if (matrix[i][i] === 0) return 0;
        };

        for (let j = i + 1; j < lengthY; j++) {
            const coef = matrix[j][i] / matrix[i][i];
            for (let k = i + 1; k < lengthY; k++)
                matrix[j][k] -= coef * matrix[i][k];

            matrix[j][i] = 0;
        };
        det *= matrix[i][i];
    };

    return det;
};

export default det_property_method;