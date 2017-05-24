class SVGLed {

    onOffState(elem, enabled) {
        let led = $(`#${elem}`);

        if (enabled) {
            led.attr("fill", `url(#RadialGradient5)`);
            led.attr("fill-opacity", 1);
            led.text(Math.pow(2, elem % 6));
        } else {
            led.attr("fill", `url(#RadialGradient2)`);
            led.attr("fill-opacity", .3);
            led.text(0);
        }
    }
}