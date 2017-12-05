import {SVGLed} from '../SVGdom/svgLed.js';

export class SVGRect extends SVGLed{

    draw(ledObj) {
        let led = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        $(led).attr("cursor", "pointer");
        $(led).attr("id", ledObj.id);
        //$(led).attr("transform", `translate(${ledObj.absX + 14} ${ledObj.absY + 15})`);
        $(led).attr("x", ledObj.absX + 14);
        $(led).attr("y", ledObj.absY + 14);
        $(led).attr("width", 20);
        $(led).attr("height", 30);
        $("#ledDisplay").append(led);
        super.onOffState(ledObj.id, ledObj.onState);
    }

}
