class SVGLed{
        
    onOffState(elem, enabled, col) {
        let led = document.getElementById(elem);

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