import './styles/style.scss';


const input = document.querySelector('#inputNumber');
let results = {};
/**
 * return only numbers of <empty string>
 * @param {string} value 
 * @returns string
 */
const validateInput = value => {
    const patterns = [
        {
            regex: /^,/,
            replace: ''
        },
        {
            regex: /,{2,}/,
            replace: ','
        },
        {
            regex: /[^\d,]/g,
            replace: ''
        }
    ]

    return patterns
        .reduce((value, pattern) => value.replace(pattern.regex, pattern.replace), value);
};

/**
 * any number converted to digital root; as like -> 56; 5 + 6 = 11; 1 + 1 = 2;
 * @param {number} num 
 * @returns {Object}
 */
const digitalRoot = num => {
    if (num === undefined) {
        return {};
    }

    const splitNum = [...("" + BigInt(num))]; // split number to arr of string
    const rootObjStruct = { result: 0n, calculation: '' };

    // create root object with two properties like { result: number(the digital root of num), calculation: string(representing the calculation process)}
    const rootObj = splitNum.reduce((acc, cur, index) => {
        acc.result += BigInt(cur);
        acc.calculation += `${cur}${index === splitNum.length - 1 ? '' : '+'}`; // calculation String

        return acc;
    }, rootObjStruct);

    rootObj.result = rootObj.result.toString();
    rootObj.calculation += `=${rootObj.result};`;

    if (rootObj.result > 9) {
        // if result is greater then 9 then again split the number
        const splitResult = digitalRoot(rootObj.result);
        rootObj.result = splitResult.result;
        rootObj.calculation += splitResult.calculation; // join the new calculation string with previous calculation

        return rootObj;
    }

    return rootObj;
}

const isMultipleNumber = number => {
    const isComma = number.includes(',')

    if (!isComma) {
        return false;
    }

    const lengthOfNumbers = number.split(',').filter(item => item !== '').length;

    if (lengthOfNumbers < 2) {
        return false;
    }

    return true;
};

/**
 * @param {number} number 
 * @returns {array} 2D
 */
const getCalculation = number => {
    const digitalRootObj = digitalRoot(number);
    const getCalculationAsArr = digitalRootObj.calculation.split(';');
    const calculationSplitToArr = getCalculationAsArr.reduce((arr, cal) => {
        cal && arr.push(cal.split('='));

        return arr;
    }, []);

    return {
        result: digitalRootObj.result,
        calculation: calculationSplitToArr
    };
}

const parseNumbers = number => {
    console.log(isMultipleNumber(number))
    // if input multiple numbers
    if (isMultipleNumber(number)) {
        const splitNumbers = number.split(',');
        
        const newResults = splitNumbers.reduce((multiNumberObj, number) => {
            if (number) {
                delete multiNumberObj[number.substring(0, number.length - 1)]; // delete the previous input number

                multiNumberObj[number] = getCalculation(number);
            }
            return multiNumberObj;
        }, {})

        results = newResults

        return
    }


    number = number.replace(/,/, '');
    delete results[number.substring(0, number.length - 1)]; // delete the previous input number

    results[number] = getCalculation(number);
}

const handleInput = e => {
    // validate the user input only valid number
    const value = validateInput(e.target.value);
    e.target.value = value; // assign the validate value to the input value

    // get the digital root of value
    parseNumbers(value);

    console.log(JSON.stringify(results, null, 2))
    // console.log(calculationSplitToArr)
}

input.addEventListener('input', handleInput)