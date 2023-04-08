'use strict';

const transpose = matrix => {
    const
        { length: lengthY } = matrix,
        { length: lengthX } = matrix[0];

    const result = new Array(lengthX);

    for (let i = 0; i < lengthX; i++)
        result[i] = new Array(lengthY);

    for (let i = 0; i < lengthY; i++)
        for (let j = 0; j < lengthX; j++)
            result[j][i] = matrix[i][j];

    return result;
};

export default transpose;