

function getCodeGenerators(Arduino) {
    Arduino['time_delay'] = function (block) {
        var delayTime = Arduino.valueToCode(
            block, 'DELAY_TIME_MILI', Arduino.ORDER_ATOMIC) || '0';
        var code = 'delay(' + delayTime + ');\n';
        return code;
    };
}
export default getCodeGenerators;

