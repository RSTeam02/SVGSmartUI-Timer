/**
 * @rsTeam02
 * View as SVG => dom
 */

import {BinaryConverter} from "./binaryConverter.js";

export class Raster extends BinaryConverter {
    //raster display decimal or circle dots
    drawRaster(strategy, binArr = { hour: 0, min: 0, sec: 0, tenth: 0 }) {
        let y = 0;
        let ledArr = [];
        let ledNo = 23;
        let ledObj = {};
        let binConv = super.convert(binArr);

        for (let i = binConv.length - 1; i >= 0; i--) {
            ledArr[i] = [];
            let x = 0;
            for (let j = 0; j < binConv[i].length; j++) {
                strategy.executeStrategy(ledObj = {
                    onState: ((binConv[i][j] === "1") ? true : false), absX: x, absY: y, id: ledNo
                });
                ledNo--;
                //next row
                x += 35;
            }
            //next column
            y += 85
        }        
    }

}
