'use strict';

const
    gausse_method = matrix => {
        const { length } = matrix;
        let det = 1;
        for (let i = 0; i < length; i++) {
            for (let j = i + 1; j < length; j++) {
                if (matrix[i][i] === 0) {
                    let foundNonZero = false;

                    for (let k = i + 1; k < length; k++)
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

                for (let k = i; k < length; k++)
                    matrix[j][k] -= factor * matrix[i][k];
            };

            det *= matrix[i][i];
        };
        return det;
    },
    minor_method = matrix => {
        const { length } = matrix;
        if (length === 1) return matrix[0][0];
        if (length === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

        let det = 0;
        for (let i = 0; i < length; i++) {
            const minor = [];
            for (let j = 1; j < length; j++)
                minor.push(matrix[j].slice(0, i).concat(matrix[j].slice(i + 1)));

            const sign = i % 2 === 0 ? 1 : -1;
            det += sign * matrix[0][i] * minor_method(minor);
        };
        return det;
    },
    cramer_method = matrix => {
        const { length } = matrix;

        if (length !== matrix[0].length) throw new Error('Matrix must be square');

        if (length === 1) return matrix[0][0];

        if (length === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

        let det = 0;

        for (let j = 0; j < length; j++) {
            const minor = [];
            for (let k = 1; k < length; k++)
                minor.push(matrix[k].slice(0, j).concat(matrix[k].slice(j + 1)));

            const sign = j % 2 === 0 ? 1 : -1;
            det += sign * matrix[0][j] * cramer_method(minor);
        };

        return det;
    },
    bareis_method = matrix => {
        const { length } = matrix;
        let det = 1;
        for (let i = 0; i < length; i++) {
            for (let j = i + 1; j < length; j++) {
                const factor = matrix[j][i] / matrix[i][i];
                for (let k = i; k < length; k++)
                    matrix[j][k] = matrix[j][k] - factor * matrix[i][k];
            };
        };
        for (let i = 0; i < length; i++)  det *= matrix[i][i];

        return det;
    },
    lu_method = matrix => {
        const { length } = matrix;
        const { L, U, P } = highermathjs.lu_decomposition(matrix);

        let det = 1;

        for (let i = 0; i < length; i++) det *= U[i][i];

        let sign = 1;
        for (let i = 0; i < length; i++) if (i !== P[i]) sign *= -1;

        return sign * det;
    },
    gausse_jordan_method = matrix => {
        const { length } = matrix;
        let det = 1;

        for (let i = 0; i < length; i++) {
            if (matrix[i][i] === 0) {
                for (let j = i + 1; j < length; j++) {
                    if (matrix[j][i] !== 0) {
                        [matrix[i], matrix[j]] = [matrix[j], matrix[i]];
                        det *= -1;
                        break;
                    };
                };
            };

            const diagonalElement = matrix[i][i];
            det *= diagonalElement;
            for (let j = i; j < length; j++) matrix[i][j] /= diagonalElement;

            for (let j = i + 1; j < length; j++) {
                const coefficient = matrix[j][i];
                for (let k = i; k < length; k++)  matrix[j][k] -= coefficient * matrix[i][k];
            };
        };

        return det;
    },
    gausse_croneker_method = matrix => {
        const { length } = matrix;
        let det = 1;

        for (let k = 0; k < length - 1; k++) {
            for (let i = k + 1; i < length; i++) {
                const factor = matrix[i][k] / matrix[k][k];
                for (let j = k + 1; j < length; j++) {
                    matrix[i][j] -= factor * matrix[k][j];
                }
            }
        }

        for (let i = 0; i < length; i++) {
            det *= matrix[i][i];
        }

        return det;
    }

/**
    * @param  {number[][]} matrix - Матрица, определитель которого нужно получить
    * @param  {object}   [data] - Объект с кастомными свойствами
    * @param  {number}   [data.digitAfterPoint] - Количество знаков после запятой в числах-результатах работы конкретно этой функции
    * @param  {string}   [data.method = 'auto'] - Метод определения определителя матрицы
    * @return {number}
*/
const det = (matrix, { method = 'auto', digitAfterPoint }) => {
    matrix = JSON.parse(JSON.stringify(matrix));
    switch (method) {
        case 'gausse_jordan': return gausse_jordan_method(matrix);
        case 'gausse_croneker': return gausse_croneker_method(matrix);
        case 'gausse': return gausse_method(matrix);
        case 'minor': return minor_method(matrix);
        case 'cramer': return cramer_method(matrix);
        case 'bareis': return bareis_method(matrix);
        case 'lu': return lu_method(matrix);

        case 'auto': ;
    };
};



export default det;