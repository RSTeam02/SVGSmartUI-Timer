/**
 * @rsTeam02
 * View as SVG => dom
 */

class View {

    //draw each led as svg circle or square shape
    constructor() {
        this.svgNS = "http://www.w3.org/2000/svg";
    }


    svgControl(led, binArr = new Array(6)) {
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
                    ? this.numSwitch(ledArr[i][j].ledActivity.on, y, x, ledNo)
                    : this.numSwitch(ledArr[i][j].ledActivity.off, y, x, ledNo);
                ledNo++;
                //next row
                y += 50;
            }
            //next column
            x += 50
        }
    }

    setMode(mode) {
        this.mode = mode;
    }

    getMode() {
        return this.mode;
    }

    numSwitch(ledActivity, relDistX, relDistY, ledNo) {
        switch (this.getMode()) {
            case "dot":
                this.svgCircle(ledActivity, relDistX, relDistY, ledNo);
                break;
            case "dec":
                this.svgNum(ledActivity, relDistX, relDistY, ledNo);
                break;
        }
    }

    ledActivity(led, enabled) {
        let decLed = [32, 16, 8, 4, 2, 1];

        if (enabled) {
            led.setAttribute("fill", `url(#RadialGradient1)`);
            led.setAttribute("fill-opacity", 1);
            led.textContent = decLed[led.id % 6];
        } else {
            led.setAttribute("fill", `url(#RadialGradient2)`);
            led.setAttribute("fill-opacity", .2);
            led.textContent = 0;
        }
    }

    svgCircle(ledActivity, relDistX, relDistY, ledNo) {
        let led = document.createElementNS(this.svgNS, "circle");
        led.setAttribute("id", ledNo);
        led.setAttribute("cx", 20);
        led.setAttribute("transform", `translate(${relDistX} ${relDistY})`);
        led.setAttribute("cy", 20);
        led.setAttribute("r", 20);
        led.setAttribute("fill-opacity", ledActivity.opacity);
        led.setAttribute("fill", `url(${ledActivity.color})`);
        document.getElementById("ledDisplay").appendChild(led);
    }

    svgNum(ledActivity, relDistX, relDistY, ledNo) {
        let numMode;
        let txt = document.createElementNS(this.svgNS, "text");
        txt.setAttribute("cursor", "pointer");
        txt.setAttribute("transform", "translate(5,20)");
        txt.setAttribute("id", ledNo);
        txt.setAttribute("x", relDistX + 10);
        txt.setAttribute("y", relDistY + 10);
        txt.setAttribute("fill-opacity", ledActivity.opacity);
        txt.setAttribute("fill", `url(${ledActivity.color})`);
        txt.setAttribute("font-family", "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif");
        txt.setAttribute("font-size", "24px");
        numMode = document.createTextNode(ledActivity.dec[ledNo % 6]);
        txt.appendChild(numMode);
        document.getElementById("ledDisplay").appendChild(txt);
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