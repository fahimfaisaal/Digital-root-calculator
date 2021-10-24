import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import Animations from './scripts/Animations';
import DigitalRoot from './scripts/digitalRoot';
import headingSVG from './scripts/headingSVG';
import Utility from './scripts/utility';
import './styles/style.scss';

const { $ } = Utility;

gsap.registerPlugin(TextPlugin);

const h2 = $('h2');
h2.innerText = "Results"
// replace the h2 tag letter by letter
h2.innerHTML = h2.innerText.replace(/\S/g, '<span class="result-split-heading">$&</span>');

// render svg into svg wrapper
const headingWrapper = $('.svg-wrapper');
headingWrapper.innerHTML = headingSVG;

const animations = new Animations();
animations.runIntroAnimation()

const inputNode = $('#inputNumber');
const digitalRoot = new DigitalRoot(inputNode);

// run the event 👍
digitalRoot.runInputEvent();

// TODO: add helper text animation