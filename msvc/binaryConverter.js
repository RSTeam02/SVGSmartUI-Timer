class BinaryConverter {

    convert(unit) {
        let binArr = [];
        let timeUnit = [unit.hour, unit.min, unit.sec, unit.tenth];

        for (let i = 0; i < timeUnit.length; i++) {
            binArr[i] = ("00000" + parseInt(timeUnit[i]).toString(2)).slice(-6);
        }
        return binArr;
    }
}