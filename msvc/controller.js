/**
 * @rsTeam02
 * Control unit 
 */
class Controller {

    constructor() {
        this.r = document.getElementById("red");
        this.g = document.getElementById("green");
        this.b = document.getElementById("blue");
        this.rInfo = document.getElementById("redInfo");
        this.gInfo = document.getElementById("greenInfo");
        this.bInfo = document.getElementById("blueInfo");
        this.initGradient();
        this.RGBSlider();
        this.model = new Countdown();
        this.matView = new MatView();
        this.textView = new TextView();
        this.numSwitcher = new NumSwitcher();
        new SVGStaticObj().svgTitle(new TitleView().titleText("SmartUI-Countdown Timer"));
        this.classRadioShape = document.getElementsByClassName("radioBtnShape");
        this.classRadioCol = document.getElementsByClassName("radioBtnCol");

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
        var classBtn = document.getElementsByClassName("btn");
        var btn = [];



        for (let i = 0; i < this.classRadioShape.length; i++) {
            if (this.classRadioShape[i].checked) {
                this.numSwitcher.setMode(this.classRadioShape[i].value);
            }
            this.classRadioShape[i].addEventListener("click", () => {
                this.numSwitcher.setMode(this.classRadioShape[i].value);
            });
        }

        for (let i = 0; i < this.classRadioCol.length; i++) {
            if (this.classRadioCol[i].checked) {
                this.setColor(this.classRadioCol[i].value);
            }
            this.classRadioCol[i].addEventListener("click", () => {
                this.setColor(this.classRadioCol[i].value);

            });
        }
        document.getElementById("rnd").addEventListener("click", () => {
            this.rgbRand();
            this.setGradient();
        });
        //start
        btn[0] = () => {
            resetPush = 1;
            if (this.getTimer() > 0) {
                if (!running) {
                    classBtn[0].value = "stop";
                    start = new Date().getTime();
                    running = true;
                    finished = false;
                    this.interval = setInterval(() => {
                        if (document.getElementById("rnd").checked) {
                            this.rgbRand();
                            this.setGradient();
                        }
                        if (-this.model.elapsedLap >= 50) {
                            (stopped)
                                ? this.updateView(start, delayed)
                                : this.updateView(start + this.getTimer(), delayed);
                        } else {
                            classBtn[0].value = "finished!";
                            clearInterval(this.interval);
                            alert("finished");
                            finished = true;
                        }
                    }, 100);
                } else {
                    if (!finished) {
                        classBtn[0].value = "start";
                        delayed = -this.model.elapsedLap;
                        clearInterval(this.interval);
                        running = false;
                        stopped = true;
                    }
                }
            }
        }

        //reset
        btn[1] = () => {
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
            classBtn[0].value = "start";
            resetPush++;
        }
        for (var i = 0; i < classBtn.length; i++) {
            classBtn[i].addEventListener('click', btn[i], false);
        }
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

        if (led.id <= 5) {
            unit += Math.pow(2, led.id) * 3600000;
        } else if (led.id <= 11) {
            unit += Math.pow(2, led.id % 6) * 60000;
        } else if (led.id <= 17) {
            unit += Math.pow(2, led.id % 12) * 1000;
        } else {
            unit += Math.pow(2, led.id % 18) * 100;
        }
        return unit;
    }

    //click on raster element(s) => convert to ms
    inputMatrix(led, active) {
        (active)
            ? this.res += this.unitConverter(led)
            : this.res -= this.unitConverter(led);
        new SVGLed().onOffState(led.id, active);
        this.setTimer(this.res);
        this.textView.svgText(this.model.convertHms(this.res));
    }

    rgbRand() {
        let rgb = new Array(3);
        for (var i = 0; i < rgb.length; i++) {
            rgb[i] = Math.floor(Math.random() * 255);
        }
        this.r.value = rgb[0];
        this.g.value = rgb[1];
        this.b.value = rgb[2];
    }

    RGBSlider() {
        let colClass = document.getElementsByClassName("colClass");

        for (var i = 0; i < colClass.length; i++) {
            colClass[i].addEventListener("input", () => {
                this.setGradient();
            });
        }
        this.rgbRand();
        this.setGradient();
    }

    initGradient() {

        var radialGradient = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");

        radialGradient.setAttribute("id", "RadialGradient5");
        document.getElementById("defCol").appendChild(radialGradient);

        var stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop1.setAttribute("id", "stop1");
        stop1.setAttribute("offset", "0%");
        stop1.setAttribute("stop-color", "white");
        document.getElementById("RadialGradient5").appendChild(stop1);

        this.stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        this.stop2.setAttribute("id", "stop2");
        this.stop2.setAttribute("offset", "100%");
        document.getElementById("RadialGradient5").appendChild(this.stop2);
    }

    setGradient() {
        this.rInfo.innerHTML = `Red: ${this.r.value}`;
        this.gInfo.innerHTML = `Green: ${this.g.value}`;
        this.bInfo.innerHTML = `Blue: ${this.b.value}`;
        this.stop2.setAttribute("stop-color", `rgba(${this.r.value},${this.g.value},${this.b.value},1)`);
    }
}
