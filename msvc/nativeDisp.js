class NativeDisplay {


    constructor() {
        this.clearDisp();
    }

    controlText(txt) {

        return txt.join(":");
    }

    clearDisp() {
        while (nativeDisplay.firstChild) {
            nativeDisplay.removeChild(nativeDisplay.firstChild);
        }
    }

}