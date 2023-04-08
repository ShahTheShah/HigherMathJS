'use strict';

import {
    setDigitAfterPoint
} from './managingNumbers.js';
import arithmetic from './arithmetic.js';
import arithmeticByScalar from './arithmeticByScalar.js';

import rounds from './rounds.js';


export default {
    ...rounds,
    setDigitAfterPoint,
    arithmetic,
    arithmeticByScalar
};
