/**
 * @rsTeam02
 * View as SVG => dom
 */

class View {

    //draw each led as svg circle or square shape
    constructor() {
        this.svgNS = "http://www.w3.org/2000/svg";
    }


    svgControl(led, binArr) {
        let x = 0;
        let ledArr = [];
        let bin = [];

        for (let k = 0; k < binArr.length; k++) {
            bin[k] = binArr[k].split("");
        }
   
        for (let i = 0; i < led.length; i++) {
            ledArr[i] = led[i];
            let y = 0;
            for (let j = 0; j < led[i].length; j++) {
                (bin[i][j] === "1")
                    ? this.svgCircle(ledArr[i][j].ledActivity.on, y, x)
                    : this.svgCircle(ledArr[i][j].ledActivity.off, y, x);
                //next row
                y += 50;
            }
            //next column
            x += 50
        }

    }


    //mat output as svg
    svgShapeMat(led) {
        let x = 0;
        let ledArr = [];
        let bin = [];

        this.i = 0;
        for (let i = 0; i < led.length; i++) {
            ledArr[i] = led[i];
            let y = 0;
            for (let j = 0; j < led[i].length; j++) {
                this.svgCircle(ledArr[i][j].ledActivity.off, y, x);
                //next row
                y += 50;
            }
            //next column
            x += 50
        }
    }

    ledActivity(led, enabled) {

        if (enabled) {
            led.setAttribute("fill", `url(#RadialGradient1)`);
            led.setAttribute("fill-opacity", 1);
        } else {
            led.setAttribute("fill", `url(#RadialGradient2)`);
            led.setAttribute("fill-opacity", .2);
        }
    }


    svgCircle(ledActivity, relDistX, relDistY) {
        let led = document.createElementNS(this.svgNS, "circle");
        led.setAttribute("id", this.i++);
        led.setAttribute("cx", 20);
        led.setAttribute("transform", `translate(${relDistX} ${relDistY})`);
        led.setAttribute("cy", 20);
        led.setAttribute("r", 20);
        led.setAttribute("fill-opacity", ledActivity.opacity);
        led.setAttribute("fill", `url(${ledActivity.color})`);
        document.getElementById("ledDisplay").appendChild(led);

    }
    
    
    svgTitle(text) {

        let txt = document.createElementNS(this.svgNS, "text");
        txt.setAttribute("fill-opacity", .7);
        txt.setAttribute("fill", "white");
        txt.setAttribute("font-family", "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif");
        txt.setAttribute("font-size", "14px");
        txt.textContent = text;
        document.getElementById("svgTitle").appendChild(txt);
    }
    
    svgText(text) {

        let txt = document.createElementNS(this.svgNS, "text");
        txt.setAttribute("fill-opacity", .7);
        txt.setAttribute("fill", "white");
        txt.setAttribute("font-family", "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif");
        txt.setAttribute("font-size", "54px");
        txt.textContent = text;
        document.getElementById("nativeDisplay").appendChild(txt);
    }

}