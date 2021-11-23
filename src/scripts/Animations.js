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
        this.placeholderTimeline = gsap.timeline({ defaults: { duration: 0.5, delay: 3.5, ease: `power1.inOut` } });
    }

    /**
     * @description this method create the intro animation of the existing application
     * @returns {this}
     */
    runIntroAnimation() {
        const { input, svg, headingPaths, resultLetters, iconPath } = this.#selectedNode;

        // set dash offset === dash array
        setStrokeDash(headingPaths);
        setStrokeDash([iconPath]);

        // opacity 0 to 1
        const svgs = $$('svg');
        gsap.to(svgs, { opacity: 1 });

        const rootLine = headingPaths.pop();

        this.introTimeline
            .to(headingPaths, { strokeDashoffset: 0, stagger: .10, ease: 'elastic(2.5, 3)' }) // headingDigits
            .to(rootLine, { strokeDashoffset: 0 }, '-=1') //root
            .to(input, { scaleX: 1, y: -15, onComplete: this.placeholderAnimation }) // scale up the inputBox
            .to(resultLetters, { opacity: 1, stagger: .2, duration: 0.8 }, '-=1') // result heading fade in
            .to(iconPath, { strokeDashoffset: 0 }) // github iconDash
            .to(iconPath, { fill: '#ffffff', strokeWidth: 0, duration: 1 }); // github iconFill
        
        return this;
    }

    /**
     * @description this method create placeholder text animation which can help user to give a clue what user can do
     * @returns {this}
     */
    placeholderAnimation = () => {
        const { input } = this.#selectedNode;
        
        // if the app open in desktop it's return true and add some words by condition
        const isDesktop = () => window.innerWidth > 768 ? true : ''
        
        this.placeholderTimeline
            .to(input, { attr: { placeholder: `1234` } }, `-=3.5`)
            .to(input, { attr: { placeholder: `12.345` } })
            .to(input, { attr: { placeholder: `1234,5678,9012${isDesktop() && ' input multiple via comma (,)'}`} })
            .to(input, { attr: { placeholder: `1.234,5.678,9.012${isDesktop() && ' input multiple via comma (,)'}`} })
            .to(input, { attr: { placeholder: `1-100 define range${isDesktop() && ' via dash (-)'}` } })
            .to(input, { attr: { placeholder: `1-10+2 get sequence${isDesktop() && ' via (+) plus'}` } })
            .to(input, { attr: { placeholder: `1-10/2 get sequence${isDesktop() && ' via (/) divide'}` } })
            .to(input, { attr: { placeholder: `1-10*2 get sequence${isDesktop() && ' via (*) multiply'}` } })
            .to(input, { attr: { placeholder: `1-10^2 get sequence${isDesktop() && ' via (^) power'}` } })
            .to(input, { attr: { placeholder: `type, what you want` } })
            .to(input, { attr: { placeholder: `` }, duration: 0.5, onComplete: () => this.placeholderTimeline.restart() })

        return this;
    }

    /**
     * @description it's just create a gsap tween
     * @param {DOM Node<Object>} target
     * @returns {gsap timeline<Object>}
     */
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

    /**
     * @description it's return a fade in Out effect tween
     * @param {DOM Node<Object>} target
     * @return {Object} gsap tween
     */
    fadeInOutTween(target) {
        return gsap.to(target, { paused: true, opacity: 1, duration: 0.1, ease: 'power1' })
    }
}

export default Animations;