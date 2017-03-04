/**
 * @rsTeam02
 * View as SVG => dom
 */

class View {

    //raster display decimal or circle dots
    svgRaster(numSwitcher, binArr = new Array(6)) {
        let x = 0;
        let ledArr = [];
        let bin = [];
        let ledNo = 0;

        this.clearSVGMat();
        this.clearSVGTxt();

        for (let k = 0; k < binArr.length; k++) {
            (binArr[k] !== undefined)
                ? bin[k] = [...binArr[k]]
                : bin[k] = [..."000000"];
        }

        for (let i = 0; i < 4; i++) {
            ledArr[i] = [];
            let y = 0;
            for (let j = 0; j < 6; j++) {
                (bin[i][j] === "1")
                    ? numSwitcher.numSwitch(new Led().ledActivity.on, y, x, ledNo)
                    : numSwitcher.numSwitch(new Led().ledActivity.off, y, x, ledNo);
                ledNo++;
                //next row
                y += 50;
            }
            //next column
            x += 50
        }

    }    
   
    clearSVGMat() {
        while (ledDisplay.firstChild) {
            ledDisplay.removeChild(ledDisplay.firstChild);
        }
       
    }
    
    clearSVGTxt(){
         while (nativeDisplay.firstChild) {
            nativeDisplay.removeChild(nativeDisplay.firstChild);
        }
    }

    //numerical time display
    svgText(text) {
        new SVGTextObj().svgText(text.join(":"));
    }

    //invoked when event occurs 
    ledActivity(led, enabled) {   
        this.clearSVGTxt();   
        if (enabled) {
            led.setAttribute("fill", `url(#RadialGradient1)`);
            led.setAttribute("fill-opacity", 1);
            led.textContent = Math.pow(2, (5 - led.id % 6));
        } else {
            led.setAttribute("fill", `url(#RadialGradient2)`);
            led.setAttribute("fill-opacity", .2);
            led.textContent = 0;
        }
    }

}