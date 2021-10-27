import DigitalRoot from './scripts/digitalRoot';
import Utility from './scripts/utility';
import './styles/style.scss';

const { $ } = Utility;

const h2 = $('h2');
// replace the h2 tag letter by letter
h2.innerText = "Results"
// render svg into svg wrapper
h2.innerHTML = h2.innerText.replace(/\S/g, '<span class="result-split-heading">$&</span>');

const inputNode = $('#inputNumber');
const digitalRoot = new DigitalRoot(inputNode);

// run the event 👍
digitalRoot.runInputEvent();