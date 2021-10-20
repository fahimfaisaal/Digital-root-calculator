
class DisplayResults {
    #resultObject;

    constructor(resultObject = {}) {
        this.#resultObject = resultObject;
    }

    /**
     * @param {array} array 2D array
     * @returns {string} DOM template
     * @description catch the result objects calculation and parse it to dom calculation template
     */
    #getCalculationTemplate(array) {
        let template = '';

        array.forEach(([calculation, result], index) => {
            template += `
            <p class="calculation">${calculation}</p>
            <p>${result}</p>
            ${index === array.length - 1 ? '' : `<p>${result}</p>`}
            `
        })

        return template;
    }

    /**
     * @returns {string} the string representation of parseObjects DOM Nodes
     */
    generateMarkup() {
        let resultsMarkup = '';
        
        for (const number in this.#resultObject) {
            const resultTemplate = `
                <div class="result">
                    <h3 class="result-heading">${number}</h3>
                    <div class="result-cal">
                        <p>${number}</p>
                        ${this.#getCalculationTemplate(this.#resultObject[number].calculation)}
                    </div>
                    <h3 class="result-footer">${this.#resultObject[number].result}</h3>
                </div>
            `;

            resultsMarkup += resultTemplate;
        }

        return resultsMarkup.replace(/\n|\s{2,}/g, '');
    }
}

export default DisplayResults;