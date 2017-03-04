/**
 * @rsTeam02
 * View as SVG => dom
 */

class View {

    //raster display decimal or circle dots
    svgRaster(numSwitcher, led, binArr = new Array(6)) {
        let x = 0;
        let ledArr = [];
        let bin = [];
        let ledNo = 0;

        for (let k = 0; k < binArr.length; k++) {
            (binArr[k] !== undefined)
                ? bin[k] = [...binArr[k]]
                : bin[k] = [..."000000"];
        }

        for (let i = 0; i < led.length; i++) {
            ledArr[i] = led[i];
            let y = 0;
            for (let j = 0; j < led[i].length; j++) {
                (bin[i][j] === "1")
                    ? numSwitcher.numSwitch(ledArr[i][j].ledActivity.on, y, x, ledNo)
                    : numSwitcher.numSwitch(ledArr[i][j].ledActivity.off, y, x, ledNo);
                ledNo++;
                //next row
                y += 50;
            }
            //next column
            x += 50
        }
    }

    //numerical time display
    svgText(text) {
        new SVGTextObj().svgText(text);
    }

    //invoked when event occurs 
    ledActivity(led, enabled) {
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