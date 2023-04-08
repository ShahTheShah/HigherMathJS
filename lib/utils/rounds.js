'use strict';

const
    /**
    *  Функция изменения количества знаков после запятой
    *
    * @param {number} number - Число, которое нужно "обрезать"
    * @param {number} digitAfterPoint - Индивидульное значение количества знаков после запятой
    * @return {number}
    */
    round = (number, digitAfterPoint = highermathjs.digitAfterPoint) =>
        Math.floor(number * 10 ** digitAfterPoint) / 10 ** digitAfterPoint,

    /**
    *  Функция изменения количества знаков после запятой в одномерном или двумерном массиве
    *
    * @param {number[] | number[][]} matrix - Одномерный или двумерный массив(матрица), числа в котором нужно "обрезать"
    * @param {number} digitAfterPoint - Индивидульное значение количества знаков после запятой
    * @return {number[] | number[][]}
    */
    round_matrix = (matrix, digitAfterPoint = highermathjs.digitAfterPoint) => matrix.map(matrix_undf => {
        switch (typeof matrix_undf) {
            case 'object': return matrix_undf.map(matrix_elem => highermathjs.round(matrix_elem, digitAfterPoint));
            case 'number': return highermathjs.round(matrix_undf, digitAfterPoint);

            default: throw Error('Возможна обработка только одномерных и двумерных массивов!');
        };
    });

export default {
    round, round_matrix
}
