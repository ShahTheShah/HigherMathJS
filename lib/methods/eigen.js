'use strict';

const eigen = matrix => {
    const EPSILON = 1e-10;
    const MAX_ITERATIONS = 1000;
    let iterationCount = 0;
    const n = matrix.length;
    let Q = identity(n);
    let error = Number.POSITIVE_INFINITY;
    let B = matrix;

    while (error > EPSILON && iterationCount < MAX_ITERATIONS) {
        const QR = qr(B);
        Q = multiply(Q, QR.Q);
        B = multiply(QR.R, QR.Q);
        error = maxOffDiagonal(B);
        iterationCount++;
    }

    const eigenvalues = new Array(n);
    const eigenvectors = new Array(n);
    for (let i = 0; i < n; i++) {
        eigenvalues[i] = B[i][i];
        eigenvectors[i] = column(Q, i);
    }

    return { eigenvalues, eigenvectors };
};

const qr = A => {
    const n = A.length;
    let Q = identity(n);
    let R = A;

    for (let k = 0; k < n - 1; k++) {
        const x = column(R, k);
        const alpha = norm(x);
        const vk = subtract(x, multiplyByScalar(normalize(x), alpha));
        const Qk = identity(n);
        setColumn(Qk, vk, k);
        R = multiply(Qk, R);
        Q = multiply(Q, transpose(Qk));
    }

    return { Q, R };
}
function norm(v) {
    return Math.sqrt(dot(v, v));
}

function normalize(v) {
    return multiplyByScalar(v, 1 / norm(v));
}
function maxOffDiagonal(A) {
    let max = 0;
    const n = A.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                max = Math.max(max, Math.abs(A[i][j]));
            }
        }
    }
    return max;
}

function column(A, j) {
    const numRows = A.length;
    const result = new Array(numRows);
    for (let i = 0; i < numRows; i++) {
        result[i] = A[i][j];
    }
    return result;
}

function setColumn(A, v, j) {
    const numRows = A.length;
    for (let i = 0; i < numRows; i++) {
        A[i][j] = v[i];
    }
}
function multiply(A, B) {
    const numRowsA = A.length;
    const numColsA = A[0].length;
    const numRowsB = B.length;
    const numColsB = B[0].length;
    if (numColsA !== numRowsB) {
        throw new Error('Matrices are not compatible for multiplication');
    }
    const result = new Array(numRowsA);
    for (let i = 0; i < numRowsA; i++) {
        result[i] = new Array(numColsB);
        for (let j = 0; j < numColsB; j++) {
            let sum = 0;
            for (let k = 0; k < numRowsB; k++) {
                sum += A[i][k] * B[k][j];
            }
            result[i][j] = sum;
        }
        return result;
    }
}
const
    matrix_1 = [
        [12, 13, 17],
        [14, 12, 16],
        [21, 12, 11],
    ],
    matrix_2 = [
        [2, 12.001210, 12.12212],
        [7, 23.23221, 112.02321],
        [12.2, 123, 232.1231231]
    ];


console.log(eigen(matrix_1))

function subtract(A, B) {
    const numRows = A.length;
    const numCols = A[0].length;
    const result = new Array(numRows);
    for (let i = 0; i < numRows; i++) {
        result[i] = new Array(numCols);
        for (let j = 0; j < numCols; j++) {
            result[i][j] = A[i][j] - B[i][j];
        }
    }
    return result;
}
function transpose(A) {
    const numRows = A.length;
    const numCols = A[0].length;
    const result = new Array(numCols);
    for (let j = 0; j < numCols; j++) {
        result[j] = new Array(numRows);
        for (let i = 0; i < numRows; i++) {
            result[j][i] = A[i][j];
        }
    }
    return result;
}
function multiplyByScalar(A, c) {
    const numRows = A.length;
    const numCols = A[0].length;
    const result = new Array(numRows);
    for (let i = 0; i < numRows; i++) {
        result[i] = new Array(numCols);
        for (let j = 0; j < numCols; j++) {
            result[i][j] = c * A[i][j];
        }
    }
    return result;
}


function identity(n) {
    const result = new Array(n);
    for (let i = 0; i < n; i++) {
        result[i] = new Array(n).fill(0);
        result[i][i] = 1;
    }
    return result;
}

function dot(u, v) {
    let result = 0;
    const n = u.length;
    for (let i = 0; i < n; i++) {
        result += u[i] * v[i];
    }
    return result;
}