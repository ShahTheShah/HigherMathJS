'use strict';

class Matrix {
    static matrixs = {
        count: 0,
        list: []
    };
    digitAfterPoint = highermathjs.digitAfterPoint;

    constructor(matrix) {
        this.matrix = matrix;
        this.lengthY = matrix.length;
        this.lengthX = matrix[0].length;
        Matrix.matrixs.count++;
        Matrix.matrixs.list.push(this);
    };
    static setDigitAfterPoint = newDigitAfterPoint => {
        for (let i = 0; i < Matrix.matrixs.count; i++) {
            Matrix.matrixs.list[i].setDigitAfterPoint(newDigitAfterPoint)
        }
    };
    setDigitAfterPoint = newDigitAfterPoint => {
        this.digitAfterPoint = newDigitAfterPoint > 0 ? newDigitAfterPoint : this.digitAfterPoint;
        this.matrix = highermathjs.round_matrix(this.matrix, this.digitAfterPoint)
    }
    toString() {
        return this.matrix;
    }
    get det() {
        return highermathjs.determinant(this.matrix, {
            method: 'gausse',
            digitAfterPoint: this.digitAfterPoint
        });
    };
    get lu() {
        return highermathjs.lu_decomposition(this.matrix, {
            digitAfterPoint: this.digitAfterPoint
        });
    };
    get transpose() {
        return highermathjs.transpose(this.matrix);
    };
    get rank() {
        return highermathjs.rank(this.matrix)
    }
    union = number => {
        return this.matrix.map(row => row.map(num => num / number));
    }
    arithmetic = (deducMatrix, action = 'add') => new Matrix(
        highermathjs.arithmetic(
            this.matrix,
            deducMatrix instanceof Matrix ? deducMatrix.matrix : deducMatrix,
            action
        )
    );
    arithmeticByScalar = (number, action = 'add') => new Matrix(
        highermathjs.arithmeticByScalar(this.matrix, number, action)
    );
};

export default Matrix;
