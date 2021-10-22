import { gsap } from "gsap";

const { set } = gsap;
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

    /**
     * @param {DOM Node} paths 
     * @param {number} offset only 0
     * @returns undefined
     */
    static setStrokeDash([...paths], offset) {
        if (paths.length > 0) {
            const path = paths.pop();
            const length = path.getTotalLength();
            const props = {
                strokeDasharray: length,
                strokeDashoffset: offset === 0 ? offset : length
            }

            // set dash array and offset
            set(path, props);

            return Utility.setStrokeDash(paths, offset);
        }
    }
}

export default Utility;
