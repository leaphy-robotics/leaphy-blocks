
function getCodeGenerators(Arduino) {
    Arduino.forBlock['leaphy_flitz_read_stomach_sensor'] = function (block){
        var sensorType = block.getFieldValue('SENSOR_TYPE');
        var code = '';
        var setup = '';
        if(sensorType == "1"){
            setup = 'pinMode(8, OUTPUT);\n  pinMode(9, OUTPUT);\n  pinMode(10, INPUT);\n  digitalWrite(8, LOW);\n  digitalWrite(9, HIGH);\n'
            code = 'digitalRead(10)'
        } else if(sensorType == "2"){
            setup = 'pinMode(8, INPUT);\n  pinMode(9, OUTPUT);\n  pinMode(10, OUTPUT);\n  digitalWrite(8, LOW);\n  digitalWrite(9, HIGH);\n'
            code = 'digitalRead(8)'
        }
        Arduino.addSetup('setup_flitz_stomach', setup, false);
        return [code, Arduino.ORDER_ATOMIC];
    };

    Arduino.forBlock['leaphy_flitz_nano_read_stomach_sensor'] = function (block){
        let setup = 'pinMode(2, INPUT);'
        let code = 'digitalRead(2)'
        Arduino.addSetup('setup_flitz_stomach', setup, false);
        return [code, Arduino.ORDER_ATOMIC];
    };

    Arduino.forBlock['leaphy_flitz_read_hand_sensor'] = function (block){
        Arduino.addSetup('setup_flitz_hand', 'pinMode(14, OUTPUT);\n pinMode(15, OUTPUT);\n pinMode(2, INPUT);\n digitalWrite(14, HIGH);\n digitalWrite(15, LOW);\n', false);
        var code = 'analogRead(2)'
        return [code, Arduino.ORDER_ATOMIC];
    };

    Arduino.forBlock['leaphy_flitz_nano_read_hand_sensor'] = function (block){
        Arduino.addSetup('setup_flitz_hand', 'pinMode(A0, INPUT);', false);
        var code = 'analogRead(A0)'
        return [code, Arduino.ORDER_ATOMIC];
    };

    Arduino.forBlock['leaphy_flitz_led'] = function (block){
        var flitz_red = Arduino.valueToCode(this, 'FLITZ_LED_R', Arduino.ORDER_ATOMIC) || '0'
        var flitz_green = Arduino.valueToCode(this, 'FLITZ_LED_G', Arduino.ORDER_ATOMIC) || '0'
        var flitz_blue = Arduino.valueToCode(this, 'FLITZ_LED_B', Arduino.ORDER_ATOMIC) || '0'
        var code = 'analogWrite(3, ' + flitz_red + ');\nanalogWrite(5, ' + flitz_green + ');\nanalogWrite(6, ' + flitz_blue + ');\n';
        return code;
    };

    Arduino.forBlock['leaphy_flitz_nano_led'] = function (block){
        var flitz_red = Arduino.valueToCode(this, 'FLITZ_LED_R', Arduino.ORDER_ATOMIC) || '0'
        var flitz_green = Arduino.valueToCode(this, 'FLITZ_LED_G', Arduino.ORDER_ATOMIC) || '0'
        var flitz_blue = Arduino.valueToCode(this, 'FLITZ_LED_B', Arduino.ORDER_ATOMIC) || '0'
        var code = 'analogWrite(9, ' + flitz_red + ');\nanalogWrite(10, ' + flitz_green + ');\nanalogWrite(11, ' + flitz_blue + ');\n';
        return code;
    };
}

export default getCodeGenerators;
