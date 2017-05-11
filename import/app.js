require.config({
    paths: {
        "jquery": "https://code.jquery.com/jquery-1.11.1.min"
    }
});

define(["jquery","../svg/svgLed", "../svg/svgMatObj","../factory/numSwitcher", "../svg/svgStaticObj", "../svg/svgTextObj",  "../views/titleView", "../msvc/binaryConverter", "../views/textView", "../views/matView", "../msvc/countdown", "../msvc/controller"], function () {
    new Controller();    
});