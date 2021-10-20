import DigitalRoot from './scripts/digitalRoot';
import Utility from './scripts/utility';
import './styles/style.scss';

const { $ } = Utility;

const inputNode = $('#inputNumber');
const digitalRoot = new DigitalRoot(inputNode);

// run the event 👍
digitalRoot.runInputEvent();