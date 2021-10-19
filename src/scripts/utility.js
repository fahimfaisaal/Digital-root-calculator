class Utility {
    /**
     * @param {string} cssSelector 
     * @returns {DomNode}
     */
    static $(cssSelector) {
        return document.querySelector(cssSelector);
    }

    /**
     * @param {string} cssSelector 
     * @returns {array} of DomNode
     */
    static $$(cssSelector) {
        return [...document.querySelectorAll(cssSelector)];
    }

    /**
     * @param {string} tagName
     * @param {object} attrs
     * @param {string} text
     * @param {array} children
     * @returns {DomNode}
     */
    static createElement(tagName, attrs, text, children) {
        const tag = document.createElement(tagName);

        if (typeof attrs === 'object') {
            for (const key in attrs) {
                tag.setAttribute(key, attrs[key]);
            }
        }
        
        if (typeof text === 'string') {
            tag.innerText = text;
        }

        if (Array.isArray(children)) {
            children.forEach(child => tag.appendChild(child));
        }

        return tag;
    }
}

export default Utility;