import { BlockDefinition } from "blockly/core/blocks";

const displayPinNumbers = [
    ["1", "0"],
    ["2", "1"],
    ["3", "2"],
];

const rgbColor = [
    ["%{BKY_LEAPHY_RGB_COLOR_RED}", "0"],
    ["%{BKY_LEAPHY_RGB_COLOR_GREEN}", "1"],
    ["%{BKY_LEAPHY_RGB_COLOR_BLUE}", "2"],
];

const rgbColorRaw = [
    ["%{BKY_LEAPHY_RGB_RAW_COLOR_RED}", "0"],
    ["%{BKY_LEAPHY_RGB_RAW_COLOR_GREEN}", "1"],
    ["%{BKY_LEAPHY_RGB_RAW_COLOR_BLUE}", "2"],
];

const apds9960RgbColor = [
    ["%{BKY_COLOUR_RGB_RED}", "0"],
    ["%{BKY_COLOUR_RGB_GREEN}", "1"],
    ["%{BKY_COLOUR_RGB_BLUE}", "2"],
    ["%{BKY_COLOUR_RGB_AMBIENT}", "3"],
];

const ledstripDemoOptions = [
    ["%{BKY_LEAPHY_LED_STRIP_LIGHTBANK}", "0"],
    ["%{BKY_LEAPHY_LED_STRIP_BREATHE}", "1"],
    ["%{BKY_LEAPHY_LED_STRIP_GULF}", "3"],
    ["%{BKY_LEAPHY_LED_STRIP_RAINBOW}", "4"],
    ["%{BKY_LEAPHY_LED_STRIP_COLORGULF}", "5"],
];

const blocks: BlockDefinition = [
    {
        type: "time_delay",
        message0: "%{BKY_ARD_TIME_DELAY} %1 %{BKY_ARD_TIME_MS}",
        args0: [
            { type: "input_value", name: "DELAY_TIME_MILI", check: "Number" },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: "loop_blocks",
        tooltip: "%{BKY_ARD_TIME_DELAY_TIP}",
        helpUrl: "http://arduino.cc/en/Reference/Delay",
    },
    {
        type: "leaphy_start",
        lastDummyAlign0: "CENTRE",
        message0: "%%{BKY_LEAPHY_START}",
        style: "leaphy_blocks",
        extensions: ["appendStatementInputStack"],
        isDeletable: false,
        helpUrl: "",
    },
    {
        type: "leaphy_serial_print_line",
        message0: "%%{BKY_LEAPHY_SERIAL_PRINT} %1 %2",
        args0: [
            { type: "input_dummy" },
            { type: "input_value", name: "VALUE" },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
        helpUrl: "",
    },
    {
        type: "leaphy_serial_print_value",
        message0: "%%{BKY_LEAPHY_SERIAL_PRINT} %1 %2 = %3 %4",
        args0: [
            { type: "input_dummy" },
            { type: "input_value", name: "NAME" },
            { type: "input_dummy" },
            { type: "input_value", name: "VALUE" },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
        helpUrl: "",
    },
    {
        type: "leaphy_serial_available",
        message0: "%%{BKY_LEAPHY_SERIAL_AVAILABLE}",
        style: "leaphy_blocks",
        output: "Number",
        helpUrl: "",
    },
    {
        type: "leaphy_serial_read_line",
        message0: "%%{BKY_LEAPHY_SERIAL_READ_LINE}",
        style: "leaphy_blocks",
        output: "String",
        helpUrl: "",
    },
    {
        type: "leaphy_rgb_color",
        message0: "%1",
        args0: [
            {
                type: "field_dropdown",
                name: "COLOR_TYPE",
                options: rgbColor,
            },
        ],
        style: "leaphy_blocks",
        output: "Number",
        helpUrl: "",
    },
    {
        type: "leaphy_rgb_color_raw",
        message0: "%1",
        args0: [
            {
                type: "field_dropdown",
                name: "COLOR_TYPE_RAW",
                options: rgbColorRaw,
            },
        ],
        style: "leaphy_blocks",
        output: "Number",
        helpUrl: "",
    },
    {
        type: "leaphy_rgb_raw_color_red",
        message0: "%%{BKY_LEAPHY_RGB_RAW_COLOR_RED}",
        style: "leaphy_blocks",
        output: "Number",
        helpUrl: "",
    },
    {
        type: "leaphy_rgb_raw_color_green",
        message0: "%%{BKY_LEAPHY_RGB_RAW_COLOR_GREEN}",
        style: "leaphy_blocks",
        output: "Number",
        helpUrl: "",
    },
    {
        type: "leaphy_rgb_raw_color_blue",
        message0: "%%{BKY_LEAPHY_RGB_RAW_COLOR_BLUE}",
        style: "leaphy_blocks",
        output: "Number",
        helpUrl: "",
    },
    {
        type: "leaphy_i2c_rgb_color",
        message0: "%%{BKY_LEAPHY_RGB_READ_SENSOR} %1",
        args0: [
            {
                type: "field_dropdown",
                name: "COLOR_TYPE",
                options: apds9960RgbColor,
            },
        ],
        style: "leaphy_blocks",
        output: "Number",
        helpUrl: "https://www.leaphyfoundation.com/tutorials-leaphy-electronics.html#:~:text=Ambient%20light%20sensor",
    },
    {
        type: "leaphy_i2c_gesture",
        message0: "%%{BKY_LEAPHY_GET_GESTURE}",
        style: "leaphy_blocks",
        output: "Number",
        helpUrl: "",
    },
    {
        type: "leaphy_led_set_strip",

        message0:
            "%%{BKY_LEAPHY_LED_SET_STRIP} %1 %%{BKY_LEAPHY_LED_SET_PIN} %2 %%{BKY_LEAPHY_LED_SET_LEDS} %3",
        args0: [
            { type: "input_dummy" },
            { type: "input_value", name: "LED_SET_PIN", check: "Number" },
            { type: "input_value", name: "LED_SET_LEDS", check: "Number" },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
        helpUrl: "https://www.leaphyfoundation.com/tutorials-leaphy-electronics.html#:~:text=Potmeter-,Multiple%20leds%C2%A0,-Led%20matrix%C2%A0",
    },
    {
        type: "leaphy_led_set_basic",
        message0:
            "%%{BKY_LEAPHY_LED_BASIC_LED} %1 %%{BKY_LEAPHY_LED_BASIC_RED} %2 %%{BKY_LEAPHY_LED_BASIC_GREEN} %3 %%{BKY_LEAPHY_LED_BASIC_BLUE} %4",
        args0: [
            { type: "input_value", name: "LED_SET_LED", check: "Number" },
            { type: "input_value", name: "LED_BASIC_RED", check: "Number" },
            {
                type: "input_value",
                name: "LED_BASIC_GREEN",
                check: "Number",
            },
            {
                type: "input_value",
                name: "LED_BASIC_BLUE",
                check: "Number",
            },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
        helpUrl: "https://www.leaphyfoundation.com/tutorials-leaphy-electronics.html#:~:text=Oled%20display-,RGB%20led,-Potmeter",
    },
    {
        type: "leaphy_led_set_speed",
        message0: "%%{BKY_LEAPHY_LED_SET_SPEEDVALUE} %1",
        args0: [
            {
                type: "input_value",
                name: "LED_SET_SPEEDVALUE",
                check: "Number",
            },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
        helpUrl: "https://www.leaphyfoundation.com/tutorials-leaphy-electronics.html#:~:text=Oled%20display-,RGB%20led,-Potmeter",
    },
    {
        type: "leaphy_display_clear",
        message0: "%%{BKY_LEAPHY_DISPLAY_CLEAR}",
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
        helpUrl: "",
    },
    {
        type: "leaphy_display_display",
        message0: "%%{BKY_LEAPHY_DISPLAY_DISPLAY}",
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
        helpUrl: "",
    },
    {
        type: "leaphy_display_print_line",
        message0: "%%{BKY_LEAPHY_DISPLAY_PRINT} %1 %2 %3",
        args0: [
            { type: "input_dummy" },
            {
                type: "field_dropdown",
                name: "DISPLAY_ROW",
                options: displayPinNumbers,
            },
            { type: "input_value", name: "VALUE" },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
        // "extensions": "updateDisplay",
        helpUrl: "",
    },
    {
        type: "leaphy_display_set_text_size",
        message0: "%%{BKY_LEAPHY_DISPLAY_SET_TEXT_SIZE} %1",
        args0: [{ type: "input_value", name: "NUM", check: "Number" }],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
        // "extensions": "updateDisplay",
        helpUrl: "",
    },
    {
        type: "leaphy_display_print_value",
        message0: "%%{BKY_LEAPHY_DISPLAY_PRINT} %1 %2 %3 = %4 %5",
        args0: [
            { type: "input_dummy" },
            {
                type: "field_dropdown",
                name: "DISPLAY_ROW",
                options: displayPinNumbers,
            },
            { type: "input_value", name: "NAME" },
            { type: "input_dummy" },
            { type: "input_value", name: "VALUE" },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
        // "extensions": "updateDisplay",
        helpUrl: "",
    },
    {
        type: "leaphy_use_lsm9ds1",
        message0: "%1 %2",
        args0: [
            {
                type: "field_dropdown",
                name: "SENSOR",
                options: [
                    ["Gyro", "g.gyro"],
                    ["Compass", "m.magnetic"],
                    ["Accelerator", "a.acceleration"],
                ],
            },
            {
                type: "field_dropdown",
                name: "AXIS",
                options: [
                    ["X-axis", ".x"],
                    ["Y-axis", ".y"],
                    ["Z-axis", ".z"],
                ],
            },
        ],
        inputsInline: true,
        output: "Number",
        style: "leaphy_blocks",
        helpUrl: "",
    },
    {
        type: "leaphy_update_lsm9ds1",
        message0: "Update Lsm9ds1",
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
        helpUrl: "",
    },
    {
        type: "leaphy_compass_degrees",
        message0: "%%{BKY_LEAPHY_COMPASS}",
        style: "leaphy_blocks",
        output: "Number",
        helpUrl: "",
    },
    {
        type: "leaphy_gas_sensor",
        message0: "%%{BKY_LEAPHY_CHOOSE_GAS} %1",
        args0: [
            {
                type: "field_dropdown",
                name: "GAS",
                options: [
                    ["TVOC", "TVOC"],
                    ["eCO2", "eCO2"],
                    ["Raw H2", "Raw H2"],
                    ["Raw Ethanol", "RAWETHANOL"],
                ],
            },
        ],
        style: "leaphy_blocks",
        output: "Number",
        helpUrl: "",
    },
    {
        type: "i2c_use_channel",
        message0: "%{BKY_USE_I2C_CHANNEL} %1",
        args0: [
            {
                type: "field_dropdown",
                name: "CHANNEL",
                options: [
                    ["0", "0"],
                    ["1", "1"],
                    ["2", "2"],
                    ["3", "3"],
                    ["4", "4"],
                    ["5", "5"],
                    ["6", "6"],
                    ["7", "7"],
                ],
            },
        ],
        message1: "%1",
        args1: [
            {
                type: "input_statement",
                name: "DO",
            },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
        tooltip: "%{BKY_USE_I2C_CHANNEL_TOOLTIP}",
        helpUrl: "https://www.leaphyfoundation.com/tutorials-leaphy-electronics.html#:~:text=Batteries%20and%20power-,I2C%20sensor%20module%C2%A0,-Sensors",
    },
    {
        type: "i2c_list_devices",
        message0: "%{BKY_I2C_LIST_DEVICES}",
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
        helpUrl: "https://www.leaphyfoundation.com/tutorials-leaphy-electronics.html#:~:text=Batteries%20and%20power-,I2C%20sensor%20module%C2%A0,-Sensors"
    },
    {
        type: "leaphy_tof_get_distance",
        helpUrl: "https://www.leaphyfoundation.com/tutorials-leaphy-electronics.html#:~:text=Light%20sensor-,ToF%20sensor%C2%A0,-Infrared%20sensor",
        message0: "%%{BKY_LEAPHY_TOF_GET_DISTANCE}",
        style: "leaphy_blocks",
        output: "Number",
    },
    {
        type: "leaphy_get_air_pressure",
        message0: "%%{BKY_LEAPHY_GET_AIR_PRESSURE}",
        style: "leaphy_blocks",
        output: "Number",
        helpUrl: "",
    },
    {
        type: "leaphy_segment_set",
        helpUrl: "https://www.leaphyfoundation.com/tutorials-leaphy-electronics.html#:~:text=%C2%A0Single%20leds-,Segment%20display%C2%A0,-Oled%20display",
        message0: `%{BKY_LEAPHY_SEGMENT_SET}`,
        args0: [
            {
                type: "input_value",
                name: "NUM",
                check: "Number",
            },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
    },
    {
        type: "leaphy_segment_clear",
        helpUrl: "https://www.leaphyfoundation.com/tutorials-leaphy-electronics.html#:~:text=%C2%A0Single%20leds-,Segment%20display%C2%A0,-Oled%20display",
        message0: "%{BKY_LEAPHY_SEGMENT_CLEAR}",
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
    },
    {
        type: "leaphy_segment_set_brightness",
        helpUrl: "https://www.leaphyfoundation.com/tutorials-leaphy-electronics.html#:~:text=%C2%A0Single%20leds-,Segment%20display%C2%A0,-Oled%20display",
        message0: "%{BKY_LEAPHY_SEGMENT_SET_BRIGHTNESS}",
        args0: [
            {
                type: "input_value",
                name: "BRIGHTNESS",
                check: "Number",
            },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
    },
    {
        type: "leaphy_matrix_set",
        helpUrl: "https://www.leaphyfoundation.com/tutorials-leaphy-electronics.html#:~:text=Multiple%20leds-,Led%20matrix%C2%A0,-Speaker%C2%A0",
        message0: "%{BKY_LEAPHY_MATRIX_SET}",
        args0: [
            {
                type: "input_value",
                name: "X",
                check: "Number",
            },
            {
                type: "input_value",
                name: "Y",
                check: "Number",
            },
            {
                type: "input_value",
                name: "ON",
                check: "Boolean",
            },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
    },
    {
        type: "leaphy_matrix_set_brightness",
        helpUrl: "https://www.leaphyfoundation.com/tutorials-leaphy-electronics.html#:~:text=Multiple%20leds-,Led%20matrix%C2%A0,-Speaker%C2%A0",
        message0: "%{BKY_LEAPHY_MATRIX_SET_BRIGHTNESS}",
        args0: [
            {
                type: "input_value",
                name: "BRIGHTNESS",
                check: "Number",
            },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
    },
    {
        type: "leaphy_matrix_clear",
        helpUrl: "https://www.leaphyfoundation.com/tutorials-leaphy-electronics.html#:~:text=Multiple%20leds-,Led%20matrix%C2%A0,-Speaker%C2%A0",
        message0: "%{BKY_LEAPHY_MATRIX_CLEAR}",
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
    },
    {
        type: "leaphy_matrix_fill",
        helpUrl: "https://www.leaphyfoundation.com/tutorials-leaphy-electronics.html#:~:text=Multiple%20leds-,Led%20matrix%C2%A0,-Speaker%C2%A0",
        message0: "%{BKY_LEAPHY_MATRIX_FILL}",
        args0: [
            { type: "input_dummy" },
            {
                type: "field_bitmap",
                name: "MATRIX",
                width: 8,
                height: 8,
            },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
    },
    {
        type: "leaphy_sound_play",
        helpUrl: "https://www.leaphyfoundation.com/tutorials-leaphy-electronics.html#:~:text=Led%20matrix-,Speaker,-Stichting",
        message0: "%{BKY_LEAPHY_SOUND_PLAY}",
        args0: [
            {
                type: "input_value",
                name: "ITEM",
                check: "Number",
            },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
    },
    {
        type: "leaphy_sound_stop",
        helpUrl: "https://www.leaphyfoundation.com/tutorials-leaphy-electronics.html#:~:text=Led%20matrix-,Speaker,-Stichting",
        message0: "%{BKY_LEAPHY_SOUND_STOP}",
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
    },
    {
        type: "leaphy_sound_set_volume",
        helpUrl: "https://www.leaphyfoundation.com/tutorials-leaphy-electronics.html#:~:text=Led%20matrix-,Speaker,-Stichting",
        message0: "%{BKY_LEAPHY_SOUND_SET_VOLUME}",
        args0: [
            {
                type: "input_value",
                name: "VOLUME",
                check: "Number",
            },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
    },
    {
        type: "leaphy_led_strip_demo",
        helpUrl: "https://www.leaphyfoundation.com/tutorials-leaphy-electronics.html#:~:text=Potmeter-,Multiple%20leds%C2%A0,-Led%20matrix%C2%A0",
        message0: "%%{BKY_LEAPHY_LED_STRIP_DEMO} %1 %2 %3 %4 %5",
        args0: [
            {
                type: "field_dropdown",
                name: "DEMO_TYPE",
                options: ledstripDemoOptions,
            },
            { type: "input_dummy" },
            {
                type: "input_value",
                name: "LED_STRIP_DEMO_RED",
                check: "Number",
            },
            {
                type: "input_value",
                name: "LED_STRIP_DEMO_GREEN",
                check: "Number",
            },
            {
                type: "input_value",
                name: "LED_STRIP_DEMO_BLUE",
                check: "Number",
            },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
    },
];

export { blocks };
