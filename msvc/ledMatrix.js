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
        for (var i = 0; i < 4; i++) {
            leds[i] = [];

            for (var j = 0; j < 6; j++) {
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