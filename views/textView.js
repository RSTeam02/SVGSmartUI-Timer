class TextView {

    clearSVGTxt() {
        while (nativeDisplay.firstChild) {
            nativeDisplay.removeChild(nativeDisplay.firstChild);
        }
    }

    //numerical time display
    svgText(unit) {
        this.clearSVGTxt();
        new SVGTextObj().svgText(`${unit.hour}:${unit.min}:${unit.sec}:${unit.tenth}`);
    }
}