import {SVGLed} from '../SVGdom/svgLed.js';

export class SVGCircle extends SVGLed{

    draw(ledObj) {
        let led = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        $(led).attr("cursor", "pointer");
        $(led).attr("id", ledObj.id);     
        $(led).attr("transform", `translate(${ledObj.absX + 24} ${ledObj.absY +30})`);               
        $(led).attr("r", 12);
        $("#ledDisplay").append(led);
        super.onOffState(ledObj.id, ledObj.onState);
    }
}
