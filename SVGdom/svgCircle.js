class SVGCircle extends SVGLed{


    draw(ledObj) {
        let led = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        $(led).attr("cursor", "pointer");
        $(led).attr("class", "raster");
        $(led).attr("id", ledObj.id);
        $(led).attr("cx", 10);
        $(led).attr("transform", `translate(${ledObj.absX} ${ledObj.absY})`);
        $(led).attr("cy", 40);
        $(led).attr("r", 12);
        $("#ledDisplay").append(led);
        super.onOffState(ledObj.id, ledObj.onState);
    }

}