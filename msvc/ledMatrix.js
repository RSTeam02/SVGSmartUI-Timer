/**
 * @rsTeam02
 * define a set of leds (row, column)
 * 
 */
class LedMatrix {

    constructor() {
        this.clearDisp();
    }

    //init matrix of led instances
    createLedMat() {
        var leds = [];
        const x = 4;
        const y = 6;

        for (var i = 0; i < x; i++) {
            leds[i] = [];

            for (var j = 0; j < y; j++) {
                leds[i][j] = new Led();
            }
        }
        return leds;
    }

    clearDisp() {
        while (ledDisplay.firstChild)
            ledDisplay.removeChild(ledDisplay.firstChild);

    }
}