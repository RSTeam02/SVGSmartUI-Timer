/**
 * @rsTeam02
 * Control unit 
 */
class Controller {

    constructor() {
        this.shiftClass = document.getElementsByClassName("shiftClass");
        this.colClass = document.getElementsByClassName("colClass");
        for (let i = 0; i < this.colClass.length; i++) {
            this.colClass[i].value = Math.floor(Math.random() * 252) + 1;
        }
        new SVGStaticObj().svgTitle(new TitleView().titleText("SmartUI-Countdown Timer"));
        this.classRadioShape = document.getElementsByClassName("radioBtnShape");
        this.classRadioCol = document.getElementsByClassName("radioBtnCol");
        this.incrdecr = new Array(3);
        this.op = new Array(3);
        this.op.fill(1);
        this.initGradient();
        this.RGBSlider();
        this.rgbRand(function () { });
        this.model = new Countdown();
        this.matView = new MatView();
        this.textView = new TextView();
        this.numSwitcher = new NumSwitcher();
        this.model.setDefault();
        this.buttonListener();
        this.ledListener();
        this.res = 0;
    }


    buttonListener() {
        var running = false;
        var finished = false;
        var stopped = false;
        var delayed = 1;
        var resetPush = 1;
        var start = 0;
        var btn = [];

        for (let i = 0; i < this.classRadioShape.length; i++) {
            if (this.classRadioShape[i].checked) {
                this.numSwitcher.setMode(this.classRadioShape[i].value);
            }
            $(this.classRadioShape[i]).click(() => {
                this.numSwitcher.setMode(this.classRadioShape[i].value);
            });
        }

        /*$("#rnd").click(() => {
            this.rgbRand(function () { });
        });*/
        //start
        $("#startBtn").click(() => {
            resetPush = 1;
            if (this.getTimer() > 0) {
                if (!running) {
                    $("#startBtn").val("stop");
                    start = new Date().getTime();
                    running = true;
                    finished = false;
                    this.interval = setInterval(() => {
                        //if (document.getElementById("rnd").checked) {
                            this.rgbRand(function () { });
                        //}
                        if (-this.model.elapsedLap >= 50) {
                            (stopped)
                                ? this.updateView(start, delayed)
                                : this.updateView(start + this.getTimer(), delayed);
                        } else {
                            $("#startBtn").val("finished");
                            clearInterval(this.interval);
                            alert("finished");
                            finished = true;
                        }
                    }, 100);
                } else {
                    if (!finished) {
                        $("#startBtn").val("start");
                        delayed = -this.model.elapsedLap;
                        clearInterval(this.interval);
                        running = false;
                        stopped = true;
                    }
                }
            }
        });

        //reset
        $("#resetBtn").click(() => {
            start = new Date().getTime();
            stopped = running = false;
            delayed = 0;
            this.res = 0;
            this.model.setDefault();
            if (resetPush === 2) {
                this.ledListener();
                this.setTimer(0);
                resetPush = 1;
            } else {
                this.matView.svgRaster(this.numSwitcher, new BinaryConverter().convert(this.model.convertHms(this.getTimer())));
            }
            this.textView.svgText(this.model.convertHms(this.getTimer()));
            clearInterval(this.interval);
            $("#startBtn").val("start");
            resetPush++;
        });
    }

    updateView(start, delayed = 0) {
        this.model.startCountdown(start, delayed, (cb) => {
            this.matView.svgRaster(this.numSwitcher, new BinaryConverter().convert(cb));
            this.textView.svgText(cb);
        });
    }

    setTimer(timer) {
        this.timer = timer;
    }

    getTimer() {
        return this.timer;
    }

    //mxn listener
    ledListener() {
        let x = 0;
        this.matView.svgRaster(this.numSwitcher);
        //handler/listener for each led
        for (let j = 0; j < 24; j++) {
            (() => {
                let x = j;
                let enabled = true;
                //access Matrix through handler
                let handler = () => {
                    (enabled)
                        ? enabled = false
                        : enabled = true;
                    this.inputMatrix(document.getElementById(x), !enabled);
                };
                document.getElementById(x).addEventListener("click", handler, false);
            })();
        }
    }

    //assign h:m:s from raster input and convert to ms
    unitConverter(led) {
        var unit = 0;

        if (led <= 5) {
            unit += Math.pow(2, led) * 3600000;
        } else if (led <= 11) {
            unit += Math.pow(2, led % 6) * 60000;
        } else if (led <= 17) {
            unit += Math.pow(2, led % 12) * 1000;
        } else {
            unit += Math.pow(2, led % 18) * 100;
        }
        return unit;
    }

    //click on raster element(s) => convert to ms
    inputMatrix(led, active) {
        (active)
            ? this.res += this.unitConverter(led.id)
            : this.res -= this.unitConverter(led.id);
        new SVGLed().onOffState(led.id, active);
        this.setTimer(this.res);
        this.textView.svgText(this.model.convertHms(this.res));
    }

    RGBSlider() {
        for (var i = 0; i < this.colClass.length; i++) {
            this.colClass[i].addEventListener("input", () => {
                this.setGradient();
            });
        }
    }

    initGradient() {

        var radialGradient = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");

        $(radialGradient).attr("id", "RadialGradient5");
        $("#defCol").append(radialGradient);

        var stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        $(stop1).attr("id", "stop1");
        $(stop1).attr("offset", "0%");
        $(stop1).attr("stop-color", "white");
        $("#RadialGradient5").append(stop1);

        this.stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        $(this.stop2).attr("id", "stop2");
        $(this.stop2).attr("offset", "100%");
        $("#RadialGradient5").append(this.stop2);
    }

    rgbRand(callback) {
        let rgb = new Array(3);
        for (var i = 0; i < rgb.length; i++) {
            rgb[i] = parseInt(this.colClass[i].value);
        }
        for (var i = 0; i < this.colClass.length; i++) {
            if (this.colClass[i].value == 0) {
                this.op[i] = 1;
            }
            if (this.colClass[i].value == 255) {
                this.op[i] = -1;
            }
            rgb[i] += this.op[i];
        }
        for (var i = 0; i < rgb.length; i++) {
            if (this.shiftClass[i].checked) {
                this.colClass[i].value = rgb[i];
            }
        }
        callback(this.setGradient());
    }

    setGradient() {
        $("#redInfo").html(`Red: ${$("#red").val()}`);
        $("#greenInfo").html(`Green: ${$("#green").val()}`);
        $("#blueInfo").html(`Blue: ${$("#blue").val()}`);
        $(this.stop2).attr("stop-color", `rgba(${$("#red").val()},${$("#green").val()},${$("#blue").val()},1)`);
    }
}
