import { gsap } from 'gsap';
import Utility from './utility';

const { $, $$, setStrokeDash } = Utility;

class Animations {
    #introAnimation;
    #selectedNode;

    constructor() {
        this.#introAnimation = {
            headingDigits: { strokeDashoffset: 0, stagger: .12 },
            headingScaleDown: { scale: 1.1, y: '0vh', ease: 'elastic(2.5, 3)' },
            root: { strokeDashoffset: 0 },
            inputBox: { scaleX: 1, y: -15 },
            result: { opacity: 1, stagger: .2, duration: 0.8 }
        }
        this.#selectedNode = {
            input: $('#inputNumber'),
            svg: $('svg'),
            paths: $$('svg > path'),
            h2: $('h2')
        }
    }

    runIntroAnimation() {
        const { headingDigits, headingScaleDown, root, inputBox, result } = this.#introAnimation;
        
        const { input, svg, paths, h2 } = this.#selectedNode;

        setStrokeDash(paths);
        const rootLine = paths.pop();

        const defaults = { duration: 1, ease: 'power1.inOut' };
        const tl = gsap.timeline({ defaults: defaults });
        h2.innerHTML = h2.innerText.replace(/\S/g, '<span class="result-split-heading">$&</span>')

        tl
            .to(paths, headingDigits)
            .to(svg, headingScaleDown)
            .to(rootLine, root)
            .to(input, inputBox)
            .to(".result-split-heading", result, '-=1');
    }
}


export default Animations;