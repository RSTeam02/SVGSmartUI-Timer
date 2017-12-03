/**
 * @rsTeam02
 * View as SVG => dom
 */

import { BinaryConverter } from "./binaryConverter.js";

export class Raster extends BinaryConverter {
    //raster display decimal or circle dots
    drawRaster(strategy, binArr = { hour: 0, min: 0, sec: 0, tenth: 0 }) {
        let y = 0;
        let ledArr = [];        
        let ledObj = {};
        let binConv = super.convert(binArr);
       
        for (let i = 0; i < binConv[0].length; i++) {
            ledArr[i] = [];
            let x = 0;
            let ledNo = 5;
            ledNo -= i;
            for (let j = 0; j < binConv.length; j++) {
                strategy.executeStrategy(ledObj = {
                    onState: ((binConv[j][i] === "1") ? true : false), absX: x, absY: y, id: ledNo
                });
                ledNo = ledNo + 6;
                //next row
                x += 85;
            }
            //next column
            
            y += 35
        }
    }

}
