'use strict';

import functions_math from './functions_math.js';



class HigherMath extends functions_math {
    /**
     * @constructor
     * @param {*} data
     */
    constructor(data) {

    };

    /**
    * Данная функция вычисляет определитель матрицы с помощью модифицированного
    * метода LU-разложения с выбором главного элемента по столбцу.
    *
    * В конце функция возвращает найденный определитель.
    *
    * @param  {number[][]} matrix - Матрица, определитель которого нужно получить
    * @param  {object}   data - Объект с кастомными свойствами
    * @param  {number}   data.digitAfterPoint - Количество знаков после запятой в числах-результатах работы конкретно этой функции
    * @return {number}
    */
    static det = (matrix, data) => {
        const { length } = matrix;
        let
            det = 1,
            permutations = 0,
            new_matrix = matrix.map(array => array.slice());

        for (let k = 0; k < length; k++) {

            let
                max = Math.abs(new_matrix[k][k]),
                imax = k;

            for (let i = k + 1; i < length; i++) {
                if (Math.abs(new_matrix[i][k]) > max) {
                    max = Math.abs(new_matrix[i][k]);
                    imax = i;
                };
            };

            if (imax !== k) {
                let temp = new_matrix[k];
                new_matrix[k] = new_matrix[imax];
                new_matrix[imax] = temp;
                permutations++;
            };

            let akk = new_matrix[k][k];
            det *= akk;

            if (Math.abs(akk) < Number.EPSILON) return 0;

            for (let j = k; j < length; j++) new_matrix[k][j] /= akk;

            for (let i = k + 1; i < length; i++) {
                let aik = new_matrix[i][k];
                for (let j = k; j < length; j++) new_matrix[i][j] -= aik * new_matrix[k][j];
            };
        };


        for (let i = 0; i < length; i++) det *= new_matrix[i][i];

        if (permutations % 2 === 1) det = -det;

        return this.round(det, data?.digitAfterPoint);
    };

    /**
     * Функция для создания матрицы Вандермонда строит квадратную матрицу.
     * В матрице каждая строка представляет собой последовательность возведенных в степень элементов входного массива,
     * начиная от x_roots^0 до x_roots^length, где x_roots - это корень из последовательности, length - количество корней.
     *
     * @param {number[]} roots - Последовательность корней(x_roots)
     * @param {object}   data - Объект с кастомными свойствами
     * @param {number}   data.digitAfterPoint - Количество знаков после запятой в числах-результатах работы конкретно этой функции
     * @return {number[][]}
     */
    static vandermond = (roots, data) => {
        const { length } = roots;

        let matrix = [];

        for (let i = 0; i < length; i++)
            matrix.push(
                Array(length).fill(roots[i])
                    .map((item, i_map) => Math.pow(item, i_map))
            );

        return this.round_matrix(matrix, data?.digitAfterPoint);
    };

    /**
     * Функция для нахождения вспомогательных многочленов основываясь на значениях корней
     *
     * @param {number[]} roots - Последовательность корней(x_roots)
     * @param {object}   data - Объект с кастомными свойствами
     * @param {number}   data.digitAfterPoint - Количество знаков после запятой в числах-результатах работы конкретно этой функции
     * @return {number[]}
     */
    static auxiliary_polynomials = (roots, data) => {
        const { length } = roots;
        const result = [];

        for (let i = 0; i < length; i++) {
            let
                numerator = [],
                denominator = 1;
            for (let j = 0; j < length; j++) {
                if (i !== j) {
                    numerator.push(roots[j]);
                    denominator *= (roots[i] - roots[j]);
                };
            };
            result.push(
                numerator.reduce((acc, rec) => acc * rec) / denominator
            );
        };

        return this.round_matrix(result, data?.digitAfterPoint);
    };

    /**
     * Эта функция принимает два массива x_roots и y_roots, содержащих координаты точек,
     * и возвращает новую функцию, которая при вызове принимает значение x_point и вычисляет
     * значение многочлена Лагранжа в точке x_point.
     *
     * @param {number[]} x_roots - Последовательность корней(x_roots)
     * @param {number[]} y_roots - Последовательность корней(y_roots)
     * @param {object}   data - Объект с кастомными свойствами
     * @param {number}   data.digitAfterPoint - Количество знаков после запятой в числах-результатах работы конкретно этой функции
     * @return {number}
     */
    static lagrange_polynomials = (x_roots, y_roots, data) => {
        const { length } = x_roots;
        const basis = j => {
            return x_point => {
                let numerator = 1,
                    denominator = 1;
                for (let i = 0; i < length; i++) {
                    if (i !== j) {
                        numerator *= x_point - x_roots[i];
                        denominator *= x_roots[j] - x_roots[i];
                    }
                }
                return numerator / denominator;
            };
        };

        return x_point => {
            return this.round(
                Array(length).fill(0)
                    .reduce((accelerator, current, i) => accelerator + y_roots[i] * basis(i)(x_point), 0),
                data?.digitAfterPoint
            );
        };
    };

    /**
     * Эта функция принимает два массива x_roots и y_roots, содержащих координаты точек,
     * и находит полиномиальное приближение функции по методу наименьших квадратов.
     *
     * В данном случае, считается подходящим квадратный класс функций вида
     * y = ax^2 + bx + c
     *
     * @param {number[]} x_roots - Последовательность корней(x_roots)
     * @param {number[]} y_roots - Последовательность корней(y_roots)
     * @param {object}   data - Объект с кастомными свойствами
     * @param {number}   data.digitAfterPoint - Количество знаков после запятой в числах-результатах работы конкретно этой функции
     * @return {number[]}
     */
    static quad_roots = (x_roots, y_roots, data) => {
        const { length } = x_roots;

        let
            sumX = x_roots.reduce((acc, curr) => acc + curr),
            sumY = y_roots.reduce((acc, curr) => acc + curr),
            sumXSquared = x_roots.reduce((acc, curr) => acc + curr ** 2, 0),
            sumXCubed = x_roots.reduce((acc, curr) => acc + curr ** 3, 0),
            sumXFourth = x_roots.reduce((acc, curr) => acc + curr ** 4, 0),
            sumXY = x_roots.reduce((acc, curr, i) => acc + curr * y_roots[i], 0),
            sumXSquaredY = x_roots.reduce((acc, curr, i) => acc + curr ** 2 * y_roots[i], 0);

        let
            determinant = length * sumXSquared * sumXFourth + 2 * sumX * sumXCubed * sumXSquared - sumXCubed * sumXCubed - sumXSquared * sumXFourth - length * sumX * sumXFourth,

            a_ratio = (sumXSquared * sumXY + sumX * sumXSquaredY + length * sumXCubed * sumY - sumXCubed * sumY - sumX * sumXSquaredY - length * sumXSquared * sumXY) / determinant,
            b_ratio = (length * sumXSquaredY * sumXFourth + sumXY * sumXCubed * sumX + sumXSquared * sumXCubed * sumY - sumXCubed * sumXSquaredY * length - sumXSquared * sumXSquaredY * sumXFourth - sumXY * sumXFourth) / determinant,
            c_ratio = (sumXCubed * sumXSquaredY * sumX + sumX * sumXSquared * sumXSquaredY + sumXSquared * sumXY * sumXFourth - sumXFourth * sumXY * sumXCubed - sumXSquared * sumXCubed * sumXSquaredY - sumXSquared * sumXSquared * sumXCubed * length) / determinant;

        return this.round_matrix([a_ratio, b_ratio, c_ratio], data?.digitAfterPoint);
    };
    static lu = matrix => {
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
            L: this.round_matrix(L),
            U: this.round_matrix(U),
            P
        };
    };
};

export default HigherMath;