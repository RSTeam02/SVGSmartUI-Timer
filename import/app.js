require.config({
    paths: {
        "jquery": "https://code.jquery.com/jquery-1.11.1.min"
    }
});

define(["jquery","../SVGdom/svgLed", "../SVGdom/svgDec", "../SVGdom/svgCircle", "../SVGdom/svgRect","../strategy/drawStrategy", "../SVGdom/svgStaticObj", "../SVGdom/svgTextObj", "../msvc/binaryConverter", "../msvc/raster", "../msvc/countdown", "../msvc/controller"], function () {
    new Controller();    
});