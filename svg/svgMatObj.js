class SVGMatObject {

    svgCircle(...property) {
        let led = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        led.setAttribute("cursor", "pointer");
        led.setAttribute("id", property[3]);
        led.setAttribute("cx", 10);
        led.setAttribute("transform", `translate(${property[1]} ${property[2]})`);
        led.setAttribute("cy", 40);
        led.setAttribute("r", 12);
        document.getElementById("ledDisplay").appendChild(led);
        new SVGLed().onOffState(property[3], property[0], property[4]);
    }

    svgRect(...property) {
        let led = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        led.setAttribute("cursor", "pointer");
        led.setAttribute("id", property[3]);
        led.setAttribute("transform", `translate(${property[1]} ${property[2] + 25})`);
        led.setAttribute("width", 20);
        led.setAttribute("height", 30);
        document.getElementById("ledDisplay").appendChild(led);
        new SVGLed().onOffState(property[3], property[0], property[4]);
    }

    svgNum(...property) {
        let txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
        let numMode;
        txt.setAttribute("cursor", "pointer");
        txt.setAttribute("transform", "translate(5,20)");
        txt.setAttribute("id", property[3]);
        txt.setAttribute("x", property[1] + 10);
        txt.setAttribute("y", property[2] + 10);
        txt.setAttribute("style", "writing-mode: sideways-lr");
        txt.setAttribute("font-family", "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif");
        txt.setAttribute("font-size", "24px");      
        document.getElementById("ledDisplay").appendChild(txt);
        new SVGLed().onOffState(property[3], property[0], property[4]);
    }



}