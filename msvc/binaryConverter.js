export class BinaryConverter {

    convert(unit) {
        let binArr = [];

        $.each(unit, function (k, v) {
            binArr.push(("00000" + parseInt(v).toString(2)).slice(-6));
        });
        return binArr;
    }
}
