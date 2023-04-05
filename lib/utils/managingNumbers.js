'use strict';

export const
    /**
     *  Функция изменения количества знаков после запятой во всех вычислениях модуля HigherMath
     *
     * @param {number} newDigitAfterPoint - Новое значение количества знаков после запятой
     * @return {void}
     */
    setDigitAfterPoint = newDigitAfterPoint => {
        if (newDigitAfterPoint > 0)
            highermathjs.digitAfterPoint = newDigitAfterPoint;
        else
            throw new Error('Количество знаков после запятой не может быть отрицательным числом!');
    };
