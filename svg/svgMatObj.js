class SVGMatObject extends SVGLed{

    svgCircle(ledObj) {
        let led = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        $(led).attr("cursor", "pointer");
        $(led).attr("id", ledObj.id);
        $(led).attr("cx", 10);
        $(led).attr("transform", `translate(${ledObj.absX} ${ledObj.absY})`);
        $(led).attr("cy", 40);
        $(led).attr("r", 12);
        $("#ledDisplay").append(led);
        this.onOffState(ledObj.id, ledObj.onState);
    }

    svgRect(ledObj) {
        let led = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        $(led).attr("cursor", "pointer");
        $(led).attr("id", ledObj.id);
        $(led).attr("transform", `translate(${ledObj.absX} ${ledObj.absY + 25})`);
        $(led).attr("width", 20);
        $(led).attr("height", 30);
        $("#ledDisplay").append(led);
        this.onOffState(ledObj.id, ledObj.onState);
    }

    svgNum(ledObj) {
        let txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
        let numMode;
        $(txt).attr("cursor", "pointer");
        $(txt).attr("transform", "translate(5,20)");
        $(txt).attr("id", ledObj.id);
        $(txt).attr("x", ledObj.absX + 10);
        $(txt).attr("y", ledObj.absY + 10);
        $(txt).attr("style", "writing-mode: sideways-lr");
        $(txt).attr("font-family", "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif");
        $(txt).attr("font-size", "24px");
        $("#ledDisplay").append(txt);
        this.onOffState(ledObj.id, ledObj.onState);
    }



}