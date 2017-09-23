/**
 * @rsTeam02
 * Countdown accuracy 1/10s
 */

export class Countdown {

    setDefault() {
        this.elapsedLap = -50;
    }

    startCountdown(start, paused, callback) {
        this.elapsedLap = new Date().getTime() - start - paused;
        callback(this.convertHms(-this.elapsedLap));
    }


    convertHms(input) {
        var milli10 = Math.round(input / 100);
        var timeUnit = {
            "hour": ("0" + Math.floor(milli10 / 36000) % 99).slice(-2),
            "min": ("0" + Math.floor(milli10 / 600) % 60).slice(-2),
            "sec": ("0" + Math.floor(milli10 / 10) % 60).slice(-2),
            "tenth": milli10 % 10
        }
        return timeUnit;
    }
}
