import {SVGLed} from '../SVGdom/svgLed.js';

export class SVGRect extends SVGLed{

    draw(ledObj) {
        let led = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        $(led).attr("cursor", "pointer");
        $(led).attr("class", "raster");
        $(led).attr("id", ledObj.id);
        $(led).attr("transform", `translate(${ledObj.absX + 15} ${ledObj.absY + 10})`);
        $(led).attr("width", 30);
        $(led).attr("height", 20);
        $("#ledDisplay").append(led);
        super.onOffState(ledObj.id, ledObj.onState);
    }

}
