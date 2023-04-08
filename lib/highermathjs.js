'use strict';

// Configuration
import {
    digitAfterPoint,
    PI, EPSELON
} from './config.js';

// Utils functions
import utils from './utils/index.js';

// Methods
import methods from './methods/index.js';

// Classes
import classes from './classes/index.js';

const
    variablesObject = {
        digitAfterPoint, PI, EPSELON
    },
    methodsObject = {
        ...methods, ...utils,
    };

global.highermathjs = {
    ...variablesObject,
    ...methodsObject,
};

const HigherMathJS = {
    ...global.highermathjs
};

export
    const Matrix = classes.Matrix;

export default HigherMathJS;