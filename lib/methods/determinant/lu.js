'use strict';

const lu_method = matrix => {

    const { length: lengthY } = matrix;

    const { L, U, P } = highermathjs.decomposition.lu(matrix);

    let det = 1;

    for (let i = 0; i < lengthY; i++) det *= U[i][i];

    let sign = 1;
    for (let i = 0; i < lengthY; i++) if (i !== P[i]) sign *= -1;

    return sign * det;
};

export default lu_method;