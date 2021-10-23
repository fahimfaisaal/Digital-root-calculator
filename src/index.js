import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import Animations from './scripts/Animations';
import DigitalRoot from './scripts/digitalRoot';
import Utility from './scripts/utility';
import './styles/style.scss';

const { $ } = Utility;

const inputNode = $('#inputNumber');
const digitalRoot = new DigitalRoot(inputNode);

// run the event 👍
digitalRoot.runInputEvent();

gsap.registerPlugin(TextPlugin);

const animations = new Animations();
animations.runIntroAnimation()

// TODO: add helper text animation