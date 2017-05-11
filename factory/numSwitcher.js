class NumSwitcher extends SVGMatObject{

    setMode(mode) {
        this.mode = mode;
    }

    getMode() {
        return this.mode;
    }

    numSwitch(ledObj) {
        switch (this.getMode()) {
            case "dot":
                return this.svgCircle(ledObj);
            case "dec":
                return this.svgNum(ledObj);
            case "rect":
                return this.svgRect(ledObj);
            default:
                return null;
        }

    }

}