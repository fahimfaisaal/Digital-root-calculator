import { gsap } from 'gsap';
import Utility from './utility';

const { $, $$, setStrokeDash } = Utility;

class Animations {
    #introAnimation;
    #selectedNode;

    constructor() {
        this.#introAnimation = {
            headingDigits: { strokeDashoffset: 0, stagger: .12, delay: 0.5 },
            headingScaleDown: { scale: 1.1, y: '0vh', ease: 'elastic(2.5, 3)' },
            headingMoveX: { x: 0, ease: 'elastic(2.8, 3)' },
            root: { strokeDashoffset: 0 },
            inputBox: { scaleX: 1, y: -15 },
            result: { opacity: 1, stagger: .2, duration: 0.8 },
            iconDash: { strokeDashoffset: 0 },
            iconFill: { fill: '#ffffff', strokeWidth: 0, duration: 1}
        }
        this.#selectedNode = {
            input: $('#inputNumber'),
            svg: $('.svg-wrapper svg'),
            headingPaths: $$('.svg-wrapper svg > path'),
            resultLetters: $$('.result-split-heading'),
            iconPath: $('#githubIcon svg > path')
        }
    }

    runIntroAnimation() {
        const { headingDigits, headingScaleDown, headingMoveX, root, inputBox, result, iconDash, iconFill } = this.#introAnimation;
        
        const { input, svg, headingPaths, resultLetters, iconPath } = this.#selectedNode;

        setStrokeDash(headingPaths);
        setStrokeDash([iconPath]);

        const rootLine = headingPaths.pop();

        const defaults = { duration: 1, ease: 'power1.inOut' };
        const tl = gsap.timeline({ defaults: defaults });

        tl
            .to(headingPaths, headingDigits)
            .to(svg, headingScaleDown)
            .to(svg, headingMoveX)
            .to(rootLine, root, '-=1')
            .to(input, inputBox)
            .to(resultLetters, result, '-=1')
            .to(iconPath, iconDash)
            .to(iconPath, iconFill);
    }
}

export default Animations;