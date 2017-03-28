/**
 * @rsTeam02
 * Control unit 
 */
class Controller {

    constructor() {
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
                this.matView.svgRaster(this.numSwitcher, this.getColor(), new BinaryConverter().convert(this.model.convertHms(this.getTimer())));
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
            this.matView.svgRaster(this.numSwitcher, this.getColor(), new BinaryConverter().convert(cb));
            this.textView.svgText(cb);
        });
    }

    setColor(color) {
        this.color = color;
    }

    getColor() {
        return this.color;
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

        this.matView.svgRaster(this.numSwitcher, this.getColor());
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
        new SVGLed().onOffState(led.id, active, this.getColor());
        this.setTimer(this.res);
        this.textView.svgText(this.model.convertHms(this.res));
    }
}
