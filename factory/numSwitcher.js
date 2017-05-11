class NumSwitcher extends SVGMatObject{

    constructor(){
        super();
    }

    setMode(mode) {
        this.mode = mode;
    }

    getMode() {
        return this.mode;
    }

    numSwitch(ledObj) {
        switch (this.getMode()) {
            case "dot":
                return super.svgCircle(ledObj);
            case "dec":
                return super.svgNum(ledObj);
            case "rect":
                return super.svgRect(ledObj);
            default:
                return null;
        }

    }

}