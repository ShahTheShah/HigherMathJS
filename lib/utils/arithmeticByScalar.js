'use strict';

const arithmeticByScalar = (matrix, scalar, action) => {
    const
        { length: matrixY } = matrix,
        { length: matrixX } = matrix[0];

    const result = [];
    for (let i = 0; i < matrixY; i++) {
        const row = [];
        for (let j = 0; j < matrixX; j++) {
            let answer;
            switch (action) {
                case 'add': {
                    answer = matrix[i][j] + scalar;
                    break
                };
                case 'substract': {
                    answer = matrix[i][j] - scalar;
                    break
                };
                case 'multiply': {
                    answer = matrix[i][j] * scalar;
                    break
                };
                case 'division': {
                    answer = matrix[i][j] / scalar;
                    break
                };
                case 'division_whole': {
                    answer = Math.floor(matrix[i][j] / scalar);
                    break
                };
                case 'remain': {
                    answer = matrix[i][j] % scalar;
                    break
                };
            };
            row.push(answer);
        }
        result.push(row);
    };
    return result;
};

export default arithmeticByScalar;