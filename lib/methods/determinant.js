'use strict';

/**
 * 1. Метод Гаусса
 * 2. Метод нахождения по минорам
 * 3. Метод нахждения Крамера
 * 4. Метод Барейса
 * 5. Метод LU-разложения
 * 6. Метод Гаусса-Жордана
 * 7. Метод Гаусса-Кронекера
 * 8. Метод использования свйоств определителя
 * 9. Метод Лапласа
 * 10. Метод блочного разложения
 * 11. Метод Данзинга-Вулфа
 * 12. Метод Халецкого
 */

const
    gausse_method = matrix => {

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
    },
    minor_method = matrix => {

        const { length: lengthY } = matrix;

        if (lengthY === 1) return matrix[0][0];
        if (lengthY === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

        let det = 0;
        for (let i = 0; i < lengthY; i++) {
            const minor = [];
            for (let j = 1; j < lengthY; j++)
                minor.push(matrix[j].slice(0, i).concat(matrix[j].slice(i + 1)));

            const sign = i % 2 === 0 ? 1 : -1;
            det += sign * matrix[0][i] * minor_method(minor);
        };
        return det;
    },
    cramer_method = matrix => {

        const
            { length: lengthY } = matrix,
            lengthX = matrix[0].length;

        if (lengthY !== lengthX) throw new Error('Матрица должна быть квадратной!');

        if (lengthY === 1) return matrix[0][0];

        if (lengthY === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

        let det = 0;

        for (let j = 0; j < lengthY; j++) {
            const minor = [];
            for (let k = 1; k < lengthY; k++)
                minor.push(matrix[k].slice(0, j).concat(matrix[k].slice(j + 1)));

            const sign = j % 2 === 0 ? 1 : -1;
            det += sign * matrix[0][j] * cramer_method(minor);
        };

        return det;
    },
    bareis_method = matrix => {

        const { length: lengthY } = matrix;

        let det = 1;

        for (let i = 0; i < lengthY; i++) {
            for (let j = i + 1; j < lengthY; j++) {
                const factor = matrix[j][i] / matrix[i][i];
                for (let k = i; k < lengthY; k++)
                    matrix[j][k] = matrix[j][k] - factor * matrix[i][k];
            };
        };
        for (let i = 0; i < lengthY; i++)  det *= matrix[i][i];

        return det;
    },
    lu_method = matrix => {

        const { length: lengthY } = matrix;

        const { L, U, P } = highermathjs.lu_decomposition(matrix);

        let det = 1;

        for (let i = 0; i < lengthY; i++) det *= U[i][i];

        let sign = 1;
        for (let i = 0; i < lengthY; i++) if (i !== P[i]) sign *= -1;

        return sign * det;
    },
    gausse_jordan_method = matrix => {

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
    },
    gausse_croneker_method = matrix => {

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
    },
    det_property_method = matrix => {

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
    },
    laplace_method = matrix => {

        const { length: lengthY } = matrix;

        if (lengthY === 1) return matrix[0][0];
        if (lengthY === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

        let det = 0;

        for (let i = 0; i < lengthY; i++) {
            const minor = new Array(lengthY - 1);

            for (let j = 0; j < lengthY - 1; j++) minor[j] = new Array(lengthY - 1);

            for (let j = 1; j < lengthY; j++) {
                for (let k = 0; k < lengthY; k++)
                    if (k < i) minor[j - 1][k] = matrix[j][k];
                    else if (k > i) minor[j - 1][k - 1] = matrix[j][k];
            };

            const sign = (i % 2 === 0) ? 1 : -1;
            det += sign * matrix[0][i] * laplace_method(minor);
        };

        return det;
    },
    block_decompose_method = matrix => {

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
    },
    danzing_wolf_method = matrix => {

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
    },
    khaletsky_method = matrix => {
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

/**
    * @param  {number[][]} matrix - Матрица, определитель которого нужно получить
    * @param  {object}   [data] - Объект с кастомными свойствами
    * @param  {number}   [data.digitAfterPoint] - Количество знаков после запятой в числах-результатах работы конкретно этой функции
    * @param  {string}   [data.method = 'auto'] - Метод определения определителя матрицы
    * @return {number}
*/
const det = (matrix, { method = 'auto', digitAfterPoint = highermathjs.digitAfterPoint }) => {

    if (!Array.isArray(matrix) || !Array.isArray(matrix[0]))
        throw new Error('Неверно переданный аргумент!');

    matrix = JSON.parse(JSON.stringify(matrix));

    switch (method) {
        case 'lu'   : return highermathjs.round(lu_method(matrix),        digitAfterPoint);
        case 'minor': return highermathjs.round(minor_method(matrix),     digitAfterPoint);
        case 'gausse': return highermathjs.round(gausse_method(matrix),    digitAfterPoint);
        case 'cramer': return highermathjs.round(cramer_method(matrix),    digitAfterPoint);
        case 'bareis': return highermathjs.round(bareis_method(matrix),    digitAfterPoint);
        case 'laplace'  : return highermathjs.round(laplace_method(matrix),   digitAfterPoint);
        case 'khaletsky': return highermathjs.round(khaletsky_method(matrix), digitAfterPoint);
        case 'det_property' : return highermathjs.round(det_property_method(matrix),    digitAfterPoint);
        case 'danzing_wolf' : return highermathjs.round(danzing_wolf_method(matrix),    digitAfterPoint);
        case 'gausse_jordan': return highermathjs.round(gausse_jordan_method(matrix),   digitAfterPoint);
        case 'gausse_croneker': return highermathjs.round(gausse_croneker_method(matrix), digitAfterPoint);
        case 'block_decompose': return highermathjs.round(block_decompose_method(matrix), digitAfterPoint);

        case 'auto': ;
    };
};

export default det;
