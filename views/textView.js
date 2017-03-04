class TextView {

    clearSVGTxt() {
        while (nativeDisplay.firstChild) {
            nativeDisplay.removeChild(nativeDisplay.firstChild);
        }
    }

    //numerical time display
    svgText(text) {
        this.clearSVGTxt();
        new SVGTextObj().svgText(text.join(":"));
    }
}