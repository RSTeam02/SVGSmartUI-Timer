class SVGMatObject {

    svgCircle(...property) {
        let led = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        $(led).attr("cursor", "pointer");
        $(led).attr("id", property[3]);
        $(led).attr("cx", 10);
        $(led).attr("transform", `translate(${property[1]} ${property[2]})`);
        $(led).attr("cy", 40);
        $(led).attr("r", 12);
        $("#ledDisplay").append(led);
        new SVGLed().onOffState(property[3], property[0], property[4]);
    }

    svgRect(...property) {
        let led = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        $(led).attr("cursor", "pointer");
        $(led).attr("id", property[3]);
        $(led).attr("transform", `translate(${property[1]} ${property[2] + 25})`);
        $(led).attr("width", 20);
        $(led).attr("height", 30);
        $("#ledDisplay").append(led);
        new SVGLed().onOffState(property[3], property[0], property[4]);
    }

    svgNum(...property) {
        let txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
        let numMode;
        $(txt).attr("cursor", "pointer");
        $(txt).attr("transform", "translate(5,20)");
        $(txt).attr("id", property[3]);
        $(txt).attr("x", property[1] + 10);
        $(txt).attr("y", property[2] + 10);
        $(txt).attr("style", "writing-mode: sideways-lr");
        $(txt).attr("font-family", "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif");
        $(txt).attr("font-size", "24px");
        $("#ledDisplay").append(txt);
        new SVGLed().onOffState(property[3], property[0], property[4]);
    }



}