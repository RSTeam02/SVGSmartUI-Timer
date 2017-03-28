/**
 * @rsTeam02
 * View as SVG => dom
 */

class MatView {

    //raster display decimal or circle dots
    svgRaster(numSwitcher, col, binArr = new Array(6)) {
        let x = 0;
        let ledArr = [];
        let bin = [];
        let ledNo = 23;

        this.clearSVGMat();

        for (let k = 0; k < binArr.length; k++) {
            (binArr[k] !== undefined)
                ? bin[k] = [...binArr[k]]
                : bin[k] = [..."000000"];
        }

        for (let i = 3; i >= 0; i--) {
            ledArr[i] = [];
            let y = 0;
            for (let j = 0; j < 6; j++) {
                if (bin[i][j] === "1") {
                    numSwitcher.numSwitch(true, y, x, ledNo, col);
                } else {
                    numSwitcher.numSwitch(false, y, x, ledNo, col);
                }
                ledNo--;
                //next row
                y += 35;
            }
            //next column
            x += 85
        }
    }

    clearSVGMat() {
        while (ledDisplay.firstChild) {
            ledDisplay.removeChild(ledDisplay.firstChild);
        }
    }

}