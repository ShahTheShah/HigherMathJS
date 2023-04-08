'use strict';

const rank = matrix => {
    const
        { length: lengthY } = matrix,
        { length: lengthX } = matrix[0];

    let matrixRank = 0, lead = 0;

    for (let row = 0; row < lengthY && lead < lengthX; row++) {
        let i = row;
        while (matrix[i][lead] === 0) {
            i++;
            if (i === lengthY) {
                i = row;
                lead++;
                if (lead === lengthX) return matrixRank;
            };
        };
        if (i !== row)
            [
                matrix[row], matrix[i]
            ] = [matrix[i], matrix[row]];

        const lv = matrix[row][lead];
        for (let j = 0; j < lengthX; j++) matrix[row][j] /= lv;

        for (let i = 0; i < lengthY; i++) {
            if (i !== row) {
                const lv = matrix[i][lead];
                for (let j = 0; j < lengthX; j++)
                    matrix[i][j] -= lv * matrix[row][j];
            };
        };
        lead++;
        matrixRank++;
    };

    return matrixRank;
};

export default rank;