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

import lu_method     from './lu.js'    ;
import minor_method  from './minor.js' ;
import gausse_method from './gausse.js';

import cramer_method  from './cramer.js' ;
import bareis_method  from './bareis.js' ;
import laplace_method from './laplace.js';

import khaletsky_method     from './khaletsky.js'    ;
import det_property_method  from './det_property.js' ;
import danzing_wolf_method  from './danzing_wolf.js' ;

import gausse_jordan_method   from './gausse_jordan.js'  ;
import block_decompose_method from './block_decompose.js';
import gausse_croneker_method from './gausse_croneker.js';

/**
    * @param  {number[][]} matrix - Матрица, определитель которого нужно получить
    * @param  {object}   [data] - Объект с кастомными свойствами
    * @param  {number}   [data.digitAfterPoint] - Количество знаков после запятой в числах-результатах работы конкретно этой функции
    * @param  {string}   [data.method = 'auto'] - Метод определения определителя матрицы
    * @return {number}
*/
const determinant = (matrix, { method = 'auto', digitAfterPoint = highermathjs.digitAfterPoint }) => {

    if (!Array.isArray(matrix) || !Array.isArray(matrix[0]))
        throw new Error('Неверно переданный аргумент!');

    matrix = JSON.parse(JSON.stringify(matrix));
    let answer;

    switch (method) {
        case 'lu'   : {
            answer = lu_method(matrix);
        break};
        case 'minor': {
            answer = minor_method(matrix);
        break};
        case 'gausse': {
            answer = gausse_method(matrix);
        break};
        case 'cramer': {
            answer = cramer_method(matrix);
        break};
        case 'bareis': {
            answer = bareis_method(matrix);
        break};
        case 'laplace'  : {
            answer = laplace_method(matrix);
        break};
        case 'khaletsky': {
            answer = khaletsky_method(matrix);
        break};
        case 'det_property' : {
            answer = det_property_method(matrix);
        break};
        case 'danzing_wolf' : {
            answer = danzing_wolf_method(matrix);
        break};
        case 'gausse_jordan': {
            answer = gausse_jordan_method(matrix);
        break};
        case 'gausse_croneker': {
            answer = gausse_croneker_method(matrix);
        break};
        case 'block_decompose': {
            answer = block_decompose_method(matrix);
        break};

        case 'auto': ;
    };

    return highermathjs.round(answer, digitAfterPoint)
};

export default determinant
