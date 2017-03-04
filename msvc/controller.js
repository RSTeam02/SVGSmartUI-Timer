/**
 * @rsTeam02
 * Control unit 
 */
class Controller {

    constructor() {
        this.model = new Countdown();
        this.view = new View();
        this.numSwitcher = new NumSwitcher();
        new SVGStaticObj().svgTitle(new TitleDisplay().titleText("SmartUI-Countdown Timer"));
        this.classRadio = document.getElementsByClassName("radioBtn");
        this.mode = document.selector.elements.format;
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

        for (let i = 0; i < this.classRadio.length; i++) {
            if (this.classRadio[i].checked) {
                this.numSwitcher.setMode(this.classRadio[i].value);
            }
        }

        for (let i = 0; i < this.classRadio.length; i++) {
            this.classRadio[i].addEventListener("click", () => {
                this.numSwitcher.setMode(this.classRadio[i].value);
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
                this.view.svgRaster(this.numSwitcher, new BinaryConverter().convert(this.model.convertHms(this.getTimer())));
            }
            this.view.svgText(this.model.convertHms(this.getTimer()));
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
            this.view.svgRaster(this.numSwitcher, new BinaryConverter().convert(cb));
            this.view.svgText(cb);
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

        this.view.svgRaster(this.numSwitcher);
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
            unit += Math.pow(2, 5 - led.id) * 3600000;
        } else if (led.id <= 11) {
            unit += Math.pow(2, 5 - led.id % 6) * 60000;
        } else if (led.id <= 17) {
            unit += Math.pow(2, 5 - led.id % 12) * 1000;
        } else {
            unit += Math.pow(2, 5 - led.id % 18) * 100;
        }
        return unit;
    }

    //click on raster element(s) => convert to ms
    inputMatrix(led, active) {
        (active)
            ? this.res += this.unitConverter(led)
            : this.res -= this.unitConverter(led);
        this.view.ledActivity(led, active);
        this.setTimer(this.res);
        this.view.svgText(this.model.convertHms(this.res));
    }
}
