/**
 * @rsTeam02
 * View as SVG => dom
 */

class MatView {

    //raster display decimal or circle dots
    svgRaster(numSwitcher, binArr = new Array(6)) {
        let y = 0;
        let ledArr = [];
        let bin = [];
        let ledNo = 23;
        let ledObj = {};

        this.clearSVGMat();

        for (let k = 0; k < binArr.length; k++) {
            bin[k] = (binArr[k] !== undefined) ? [...binArr[k]] : [..."000000"];
        }

        for (let i = 3; i >= 0; i--) {
            ledArr[i] = [];
            let x = 0;
            for (let j = 0; j < 6; j++) {                
                    numSwitcher.numSwitch(ledObj = {
                        onState: ((bin[i][j] === "1") ? true : false), absX: x, absY: y, id: ledNo
                    });               
                ledNo--;
                //next row
                x += 35;
            }
            //next column
            y += 85
        }
    }

    clearSVGMat() {
        while (ledDisplay.firstChild) {
            ledDisplay.removeChild(ledDisplay.firstChild);
        }
    }

}