class SVGLed {

    onOffState(elem, enabled, col) {
        let led = document.getElementById(elem);

        if (col === "RadialGradient1,RadialGradient2,RadialGradient3") {
            let colArr = col.split(",");
            let i = Math.floor(Math.random() * parseInt(colArr.length));
            col = colArr[i];
        }

        if (enabled) {
            led.setAttribute("fill", `url(#${col})`);
            led.setAttribute("fill-opacity", 1);
            led.textContent = Math.pow(2, led.id % 6);
        } else {
            led.setAttribute("fill", `url(#RadialGradient2)`);
            led.setAttribute("fill-opacity", .3);
            led.textContent = 0;
        }
    }
}