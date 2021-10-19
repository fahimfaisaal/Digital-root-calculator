import DigitalRoot from './scripts/digitalRoot';
import Utility from './scripts/utility';
import './styles/style.scss';

const { $, createElement } = Utility;

const inputNode = $('#inputNumber');
const digitalRoot = new DigitalRoot(inputNode);

const el = createElement('h1', { class: 'newClass', id: 'newId' }, 'Hello')

document.body.appendChild(el)