'use strict';

const arithmetic = (reduceMatrix, deducMatrix, action) => {
    const
        { length: reduceMatrixY } = reduceMatrix,
        { length: reduceMatrixX } = reduceMatrix[0],
        { length: deducLengthY } = deducMatrix,
        { length: deducLengthX } = deducMatrix[0];

    if (reduceMatrixY !== deducLengthY || reduceMatrixX !== deducLengthX)
        throw new Error("Матрицы должны быть одинакового размера");

    const result = [];
    for (let i = 0; i < reduceMatrixY; i++) {
        const row = [];
        for (let j = 0; j < reduceMatrixX; j++) {
            let answer;
            switch (action) {
                case 'add': { answer = reduceMatrix[i][j] + deducMatrix[i][j];
                break};
                case 'substruct': { answer = reduceMatrix[i][j] - deducMatrix[i][j];
                break};
                case 'multiply': { answer = reduceMatrix[i][j] * deducMatrix[i][j];
                break};
                case 'division': { answer = reduceMatrix[i][j] / deducMatrix[i][j];
                break};
                case 'division_whole': { answer = Math.floor(reduceMatrix[i][j] / deducMatrix[i][j]);
                break};
                case 'remain_remain': { answer = reduceMatrix[i][j] % deducMatrix[i][j];
                break};
            };
            row.push(answer);
        }
        result.push(row);
    };
    return result;
};

export default arithmetic;