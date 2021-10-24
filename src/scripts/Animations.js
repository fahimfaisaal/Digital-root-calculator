import { gsap } from 'gsap';
import Utility from './utility';

const { $, $$, setStrokeDash } = Utility;

class Animations {
    #selectedNode;
    introTimeline;
    placeholderTimeline;

    constructor() {
        this.#selectedNode = {
            input: $('#inputNumber'),
            svg: $('.svg-wrapper svg'),
            headingPaths: $$('.svg-wrapper svg > path'),
            resultLetters: $$('.result-split-heading'),
            iconPath: $('#githubIcon svg > path')
        }
        this.introTimeline = gsap.timeline({ defaults: { duration: 1, ease: 'power1.inOut' } });
        this.placeholderTimeline = gsap.timeline({ defaults: { duration: 1.5, delay: 3, ease: "power2" } });
    }

    runIntroAnimation() {
        const { input, svg, headingPaths, resultLetters, iconPath } = this.#selectedNode;

        // set dash offset === dash array
        setStrokeDash(headingPaths);
        setStrokeDash([iconPath]);

        const rootLine = headingPaths.pop();

        this.introTimeline
            .to(headingPaths, { strokeDashoffset: 0, stagger: .12, delay: 0.5 }) // headingDigits
            .to(svg, { scale: 1.1, y: '0vh', ease: 'elastic(2.5, 3)' }) // headingScaleDown
            .to(svg, { x: 0, ease: 'elastic(2.8, 3)' }) // headingMoveX
            .to(rootLine, { strokeDashoffset: 0 }, '-=1') //root
            .to(input, { scaleX: 1, y: -15, onComplete: this.placeholderAnimation }) // scale up the inputBox
            .to(resultLetters, { opacity: 1, stagger: .2, duration: 0.8 }, '-=1') // result heading
            .to(iconPath, { strokeDashoffset: 0 }) // github iconDash
            .to(iconPath, { fill: '#ffffff', strokeWidth: 0, duration: 1 }); // github iconFill
        
        return this;
    }

    placeholderAnimation = () => {
        const placeholder = $('#dynamicPlaceholder');

        window.innerWidth > 770 && this.placeholderTimeline
            .to(placeholder, { text: "1234", delay: 0.5 })
            .to(placeholder, { text: "1234,5678,9012 input multiple via comma (,)", duration: 3 })
            .to(placeholder, { text: "1-10 define range via dash (-)" })
            .to(placeholder, { text: "1-10+2 get sequance via (+) plus" })
            .to(placeholder, { text: "1-10/2 get sequance via (/) divide" })
            .to(placeholder, { text: "1-10*2 get sequance via (*) multiply" })
            .to(placeholder, { text: "1-10^2 get sequance via (^) power" })
            .to(placeholder, { text: "", duration: 0.5, onComplete: () => this.placeholderTimeline.restart() })

        return this;
    }

    fadeOutUp(target) {
        const animationObj = {
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: 0.5,
            stagger: 0.1
        }

        const fadeOut = gsap.from(target, animationObj);

        return fadeOut;
    }
}

export default Animations;