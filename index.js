'use strict';

import HigherMath from './HigherMath/HigherMath.js';

HigherMath.setDigitAfterPoint(5);

const N = 19;

const
    //! Инициализация корней
    Xs = [
        -Math.cbrt(N),
        Number(`0.${N}`),
        Math.sqrt(N),
    ],
    Ys = [
        N,
        Number(`0.${N + 5}`),
        N ** 2
    ];


const
    // ? Генерация матрицы Вандермонда
    Vandermond_Matrix      = HigherMath.vandermond(Xs)                 ,

    // ? Нахождение определителя матрицы Вандермонда
    Determinant_Vandermond = HigherMath.det(Vandermond_Matrix)         ,

    // ? Нахождение вспомогательных многочленов
    Auxiliary_Polynomials  = HigherMath.auxiliary_polynomials(Xs)      ,

    // ? Нахождение многочлена Лагранджа
    Lagrange_Polynomials   = HigherMath.lagrange_polynomials(Xs, Ys)(2),

    // ? Нахождение корней уравнения
    Quad_Roots = HigherMath.quad_roots(Xs, Ys)                         ;