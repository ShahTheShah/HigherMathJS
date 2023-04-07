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

import lu_method     from './determinant/lu.js'    ;
import minor_method  from './determinant/minor.js' ;
import gausse_method from './determinant/gausse.js';

import cramer_method  from './determinant/cramer.js' ;
import bareis_method  from './determinant/bareis.js' ;
import laplace_method from './determinant/laplace.js';

import khaletsky_method     from './determinant/khaletsky.js'    ;
import det_property_method  from './determinant/det_property.js' ;
import danzing_wolf_method  from './determinant/danzing_wolf.js' ;

import gausse_jordan_method   from './determinant/gausse_jordan.js'  ;
import block_decompose_method from './determinant/block_decompose.js';
import gausse_croneker_method from './determinant/gausse_croneker.js';

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
