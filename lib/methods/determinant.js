'use strict';

// Метод Гаусса: матрица приводится к треугольному виду элементарными преобразованиями строк,
// после чего определитель вычисляется как произведение элементов главной диагонали.

// Разложение по минорам: определитель вычисляется как сумма произведений элементов матрицы
// на их алгебраические дополнения.

// Метод Крамера: определитель матрицы и ее миноры используются для нахождения решений
// системы линейных уравнений.

// Метод LU-разложения: матрица разлагается на произведение нижней треугольной и верхней
// треугольной матриц, после чего определитель вычисляется как произведение элементов главной
// диагонали верхней треугольной матрицы.

// Метод Гаусса-Жордана: матрица приводится к диагональному виду элементарными преобразованиями
// строк и столбцов, после чего определитель вычисляется как произведение элементов главной диагонали.

// Метод Гаусса-Кронекера: матрица приводится к квазитреугольному виду элементарными преобразованиями
// строк и столбцов, после чего определитель вычисляется как произведение элементов главной диагонали.


const
    gausse_method = (matrix, length) => {
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
        if (matrix.length === 1) return matrix[0][0];
        if(matrix.length === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

        let det = 0;
        for (let i = 0; i < matrix.length; i++) {
            const minor = [];
            for (let j = 1; j < matrix.length; j++)
                minor.push(matrix[j].slice(0, i).concat(matrix[j].slice(i + 1)));

            const sign = i % 2 === 0 ? 1 : -1;
            det += sign * matrix[0][i] * minor_method(minor);
        };
        return det;
    },
    cramer_method = () => {

    };

/**
    * Данная функция вычисляет определитель матрицы с помощью модифицированного
    * метода LU-разложения с выбором главного элемента по столбцу.
    *
    * В конце функция возвращает найденный определитель.
    *
    * @param  {number[][]} matrix - Матрица, определитель которого нужно получить
    * @param  {object}   data - Объект с кастомными свойствами
    * @param  {number}   digit.digitAfterPoint - Количество знаков после запятой в числах-результатах работы конкретно этой функции
    * @param  {string}   data.method - Метод определения определителя матрицы
    * @return {number}
*/
const det = (matrix, { method = 'auto', digitAfterPoint } = data) => {
    const { length } = matrix;

    switch (method) {
        case 'gausse': return gausse_method(matrix, length);
        case 'minor': return minor_method(matrix);

        case 'auto': {

        };
        default: {

        };
    };
};



export default det;
