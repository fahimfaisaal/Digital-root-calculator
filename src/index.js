import DigitalRoot from './scripts/digitalRoot';
import './styles/style.scss';


const input = document.getElementById('inputNumber');
const digitalRoot = new DigitalRoot(input);

digitalRoot.runEvent(object => {
    console.log(object)
})