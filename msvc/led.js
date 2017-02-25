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
                bin: "1",
                color: "#RadialGradient1"
            },

            off: {
                opacity: .2,
                bin: "0",
                color: "#RadialGradient2"
            }
        };
    }
}


