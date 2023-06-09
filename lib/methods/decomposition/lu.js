'use strict';

/**
    * @param  {number[][]} matrix - Матрица, определитель которого нужно получить
    * @param  {object}   [data] - Объект с кастомными свойствами
    * @param  {number}   [data.digitAfterPoint] - Количество знаков после запятой в числах-результатах работы конкретно этой функции
    * @return {object[][]}
*/

const lu = (matrix, {digitAfterPoint = highermathjs.digitAfterPoint}) => {
    const
        { length } = matrix,
        P = [];

    for (let i = 0; i < length; i++) P[i] = i;

    for (let k = 0; k < length - 1; k++) {

        let
            max = Math.abs(matrix[k][k]),
            imax = k;

        for (let i = k + 1; i < length; i++) {
            if (Math.abs(matrix[i][k]) > max) {
                max = Math.abs(matrix[i][k]);
                imax = i;
            }
        }

        if (imax !== k) {
            [
                matrix[k], matrix[imax]
            ] = [matrix[imax], matrix[k]];

            [
                P[k], P[imax]
            ] = [P[imax], P[k]];
        };

        for (let i = k + 1; i < length; i++) {

            const mult = matrix[i][k] / matrix[k][k];
            for (let j = k + 1; j < length; j++) matrix[i][j] -= mult * matrix[k][j];

            matrix[i][k] = mult;
        };
    };

    const
        L = Array.from(Array(length), () => Array(length).fill(0)),
        U = Array.from(Array(length), () => Array(length).fill(0));

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            if (i > j)
                L[i][j] = matrix[i][j];
            else if (i === j) {
                L[i][j] = 1;
                U[i][j] = matrix[i][j];
            } else
                U[i][j] = matrix[i][j];
        };
    };

    return {
        L: highermathjs.round_matrix(L, digitAfterPoint),
        U: highermathjs.round_matrix(U, digitAfterPoint),
        P
    };
};

export default lu;
