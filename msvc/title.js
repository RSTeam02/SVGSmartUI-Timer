class TitleDisplay {

    constructor() {
        this.clearDisp();
    }

    titleText(txt) {

        return txt;
    }

    clearDisp() {
        while (nativeDisplay.firstChild) {
            nativeDisplay.removeChild(nativeDisplay.firstChild);
        }
    }

}