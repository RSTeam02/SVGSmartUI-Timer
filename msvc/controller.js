/**
 * @rsTeam02
 * Control unit 
 */
class Controller {

    constructor() {
        this.model = new Countdown();
        this.view = new View();
        this.view.svgTitle(new TitleDisplay().titleText("SmartUI-Countdown Timer"));
        this.model.setDefault();
        this.evalInput();
        this.buttonListener();
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
            this.evalInput();

            if (resetPush === 2) {
                this.setTimer(0);
                resetPush = 1;
            } else {
                this.view.svgControl(new LedMatrix().createLedMat(), new BinaryConverter().convert(this.model.convertHms(this.getTimer())));
            }
            this.view.svgText(new NativeDisplay().controlText(this.model.convertHms(this.getTimer())));
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
            this.view.svgControl(new LedMatrix().createLedMat(), new BinaryConverter().convert(cb));
            this.view.svgText(new NativeDisplay().controlText(cb));
        });

    }

    setTimer(timer) {
        this.timer = timer;
    }

    getTimer() {
        return this.timer;
    }

    evalInput() {
        this.ledListener();
    }

    //mxn listener
    ledListener() {
        let x = 0;
        let leds = [];

        this.ledArr = new LedMatrix();
        this.view.svgShapeMat(this.ledArr.createLedMat());

        //init each led
        for (let i = 0; i < 24; i++) {
            leds[i] = document.getElementById(i);
        }

        //handler/listener for each led
        for (let j = 0; j < leds.length; j++) {
            (() => {
                let x = j;
                let enabled = true;
                //access Matrix through handler
                let handler = () => {
                    if (enabled) {
                        this.inputMatrix(leds[x], true);
                        enabled = false;
                    } else {
                        this.inputMatrix(leds[x], false);
                        enabled = true;
                    }
                };
                leds[x].addEventListener("click", handler, false);
            })();
        }
    }

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

    inputMatrix(led, on) {
        if (on) {
            this.view.ledActivity(led, true);
            this.res += this.unitConverter(led);
        } else {
            this.view.ledActivity(led, false);
            this.res -= this.unitConverter(led);
        }

        this.setTimer(this.res);
        this.view.svgText(new NativeDisplay().controlText(this.model.convertHms(this.res)));
    }
}
