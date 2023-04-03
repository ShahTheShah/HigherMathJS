'use strict';

import variables_math from './_variables.js';

class functions_math extends variables_math {

    /**
     *  Функция изменения количества знаков после запятой во всех вычислениях модуля HigherMath
     *
     * @param {number} newDigitAfterPoint - Новое значение количества знаков после запятой
     * @return {void}
     */
    static setDigitAfterPoint = newDigitAfterPoint => {
        if (newDigitAfterPoint > 0)
            this.digitAfterPoint = newDigitAfterPoint;
        else
            throw new Error('Количество знаков после запятой не может быть отрицательным числом!');
    };

    /**
     *  Функция изменения количества знаков после запятой
     *
     * @param {number} number - Число, которое нужно "обрезать"
     * @param {number | digitAfterPoint} digitPoint - Индивидульное значение количества знаков после запятой
     * @return {number}
     */
    static round = (number, digitPoint = this.digitAfterPoint) =>
        Math.floor(number * 10 ** digitPoint) / 10 ** digitPoint;

    /**
     *  Функция изменения количества знаков после запятой в одномерном или двумерном массиве
     *
     * @param {number[] | number[][]} matrix - Одномерный или двумерный массив(матрица), числа в котором нужно "обрезать"
     * @param {number | digitAfterPoint} digitPoint - Индивидульное значение количества знаков после запятой
     * @return {number[] | number[][]}
     */
    static round_matrix = (matrix, digitPoint) => matrix.map(matrix_undf => {
        switch (typeof matrix_undf) {
            case 'object': return matrix_undf.map(matrix_elem => this.round(matrix_elem, digitPoint));
            case 'number': return this.round(matrix_undf, digitPoint);

            default: throw Error('Возможна обработка только одномерных и двумерных массивов!');
        };
    });
};

export default functions_math;