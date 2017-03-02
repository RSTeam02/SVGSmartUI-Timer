/**
 * @rsTeam02
 * class for single led
 */

class Led {

    constructor() {
        //init led with certain opacity, color
        this.ledActivity = {
            on: {
                opacity: 1,
                dec: [32, 16, 8, 4, 2, 1],
                color: "#RadialGradient1"
            },

            off: {
                opacity: .2,
                dec: [..."000000"],
                color: "#RadialGradient2"
            }
        };
    }
}


