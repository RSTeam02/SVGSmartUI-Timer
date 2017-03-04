class NumSwitcher {

    setMode(mode) {
        this.mode = mode;
    }

    getMode() {
        return this.mode;
    }

    numSwitch(...property) {
        switch (this.getMode()) {
            case "dot":
                return new SVGMatObject().svgCircle(...property);
            case "dec":
                return new SVGMatObject().svgNum(...property);
            default:
                return null;
        }
        
    }
    
    

}