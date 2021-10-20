import DisplayResults from './displayResult';
import Utility from './utility';

const { $ } = Utility;
class DigitalRoot {
    #staticPattern;
    #dynamicPattern;
    #results;
    #resultNode;

    constructor(input = null) {
        this.input = input;
        this.#staticPattern = [
            {
                regex: /^,/,
                replace: ''
            },
            {
                regex: /,{2,}/g,
                replace: '$1'
            },
            {
                regex: /[^\d,]/g,
                replace: ''
            }
        ];
        this.#dynamicPattern = [
            {
                regex: /-{2,}/,
                replace: '-'
            },
            {
                regex: /(\d+-)\D+/,
                replace: '$1'
            },
            {
                regex: /(\d+-\d+)[^*^/+\d]+/,
                replace: '$1'
            },
            {
                regex: /(\d+-\d+[*^/+])\D+/,
                replace: '$1'
            },
            {
                regex: /(\d+-\d+[+*^\/]\d+)\D+/,
                replace: '$1'
            }
        ];
        this.#results = {};
        this.#resultNode = $('#results-wrapper');
        this.errors = {};
    }

    /**
     * @param {string} value
     * @returns string
     * @description it's validate in two pattern static and dynamic and return only string of numbers
    */
    #validateInput(value) {
        let patterns = this.#staticPattern;

        if (/^\d+-/.test(value)) {
            patterns = this.#dynamicPattern;
        }

        return patterns
            .reduce((value, pattern) => value.replace(pattern.regex, pattern.replace), value);
    };

    /**
     * @param {string} num 
     * @returns {Object}
     * @description any number converted to digital root; as like -> 56; 5 + 6 = 11; 1 + 1 = 2;
    */
    #getDigitalRoot(num) {
        if (num === undefined) {
            return {};
        }

        num = num.replace(/\./g, ''); // replace all dots for floating number

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
            const splitResult = this.#getDigitalRoot(rootObj.result);
            rootObj.result = splitResult.result;
            rootObj.calculation += splitResult.calculation; // join the new calculation string with previous calculation

            return rootObj;
        }

        return rootObj;
    }

    /**
     * @param {string} number 
     * @returns {boolean}
     * @description if number has multiple number it's return true otherwise false
     */
    #isMultipleNumber(number) {
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
     * @returns {object result<string>, calculation<array[][]>}
     * @description split the calculation into 2D array and return an object with two props
    */
    #getCalculation(number) {
        const digitalRootObj = this.#getDigitalRoot(number);
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

    /**
     * @param {number} start 
     * @param {number} end 
     * @param {number} cal 
     * @param {string} operator 
     * @returns {string} 
     * @description if user input is dynamic pattern then it's this method generate string of numbers via user input range
     */
    #calculateRange(start, end, cal, operator = '+') {
        const numbers = [];

        cal ||= 1;

        if (end < start || start === end) {
            this.errors.rangeError = 'Please input the ascending range';

            return `${start},${end}`;
        }

        const actions = {
            '+': () => {
                for (let number = start; number <= end; number += cal) {
                    numbers.push(number);
                }
            },
            '*': () => {
                let base = start;

                for (let number = start; number <= end; number++) {
                    numbers.push(base);
                    base *= cal
                }
            },
            '/': () => {
                let base = start;

                for (let number = start; number <= end; number++) {
                    base /= cal;
                    numbers.push(base);
                }
            },
            '^': () => {
                for (let number = start; number <= end; number++) {
                    numbers.push(Math.pow(number, cal));
                }
            }
        }

        'rangeError' in this.errors && delete this.errors.rangeError;

        actions[operator]();

        return numbers.join(',');
    }

    /**
     * @param {string} number 
     * @returns {object} state results
     * @description it's modify the result object by user input
     */
    #parseToObject(number) {
        let isDynamicNumbers = false;

        // if number is dynamic range
        if (/^\d+-/.test(number)) {
            const [start, end, cal] = number.split(/[*+/^-]/g);
            const [, operator] = number.split(/\d+/).filter(item => item !== '');
            if (start && end) {
                number = this.#calculateRange(+start, +end, +cal, operator);
                isDynamicNumbers = true;
            } else {
                return this.#results;
            }
        }

        // if input multiple numbers
        if (this.#isMultipleNumber(number)) {
            const splitNumbers = number.split(',');

            const newResults = splitNumbers.reduce((multiNumberObj, number) => {
                if (number) {
                    !isDynamicNumbers && delete multiNumberObj[number.substring(0, number.length - 1)]; // delete the previous input number in live input

                    multiNumberObj[number] = this.#getCalculation(number);
                }
                return multiNumberObj;
            }, {})

            this.#results = newResults;

            return this.#results;
        }


        number = number.replace(/,/, '');
        this.#results = {} // delete the previous input number

        this.#results[number] = this.#getCalculation(number);

        return this.#results;
    }

    /**
     * Async method
     * @callback callback
     * @description send the state results in input event listener
    */
    runInputEvent(callback) {
        if (typeof this.input === 'object') {
            this.input.addEventListener('input', (event) => {
                // validate the user input only valid number
                const value = this.#validateInput(event.target.value);
                event.target.value = value; // assign the validate value to the input value

                // get the digital root of value
                const parsedObject = this.#parseToObject(value);

                // create the instance of DisplayResults class
                const display = new DisplayResults(parsedObject);
                const markup = display.generateMarkup(); // generate the markup via parsed object

                if ("" in parsedObject) {
                    this.#resultNode.innerHTML = '';
                } else {
                    this.#resultNode.innerHTML =
                        'rangeError' in this.errors ?
                        `<h4 class="error">${this.errors.rangeError}</h4>`
                        : markup;
                }
                
               typeof callback === 'function' && callback(parsedObject, markup);
            })

            return
        }

        callback(null);
    }

    /**
     * @returns {string}
     * @description it's return the digital root object if the argument input type will be string
     */
    getObject() {
        if (typeof this.input === 'string') {
            const validateNumber = this.#validateInput(this.input);
            const parseObject = this.#parseToObject(validateNumber);
            const display = new DisplayResults(parseObject);
            const markup = display.generateMarkup();

            return [parseObject, markup];
        }

        return null;
    }
}

export default DigitalRoot;