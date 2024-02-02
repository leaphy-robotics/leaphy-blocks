# Leaphy Blocks

Leaphy Blocks is an adaptation of the Blockly library. [Google's Blockly](https://github.com/google/blockly) is a library that adds a visual code editor to web and mobile apps. The Blockly editor uses interlocking, graphical blocks to represent code concepts like variables, logical expressions, loops, and more. It allows users to apply programming principles without having to worry about syntax or the intimidation of a blinking cursor on the command line.  All code is free and open source.

Leaphy Blocks is primarily developed for use in the [Leaphy Easybloqs](https://github.com/leaphy-robotics/leaphy-webbased) application. It is published as an npm package.


## Getting Help

* Ask for help on the Leaphy Forum
* Report an Issue on Github

## Contributing to Leaphy Blocks

### Creating Custom Blocks

Good documentation about creating custom blocks exists in the [Google Blockly Developer Pages](https://developers.google.com/blockly/guides/create-custom-blocks/overview).

A block always exists of 2 parts, a definition and a generator. The definition code are the looks of the block and the input and outputs. The generator code will generate code for this block. We'll start with making a block for the sonar sensor. 

#### Definition
First we will create the definition code in the [blocks folder](blocks). You can choose any of the files for the definition but choose the one that makes the most sense for your block.
```json
{
    type: "leaphy_sonar_read",
    message0:
    "%%{BKY_LEAPHY_SONAR_READ_TRIG} %1 %%{BKY_LEAPHY_SONAR_READ_ECHO} %2",
    args0: [
    {
        type: "field_dropdown",
        name: "TRIG_PIN",
        options: board.digitalPins,
    },
    {
        type: "field_dropdown",
        name: "ECHO_PIN",
        options: board.digitalPins,
    },
    ],
    output: "Number",
    style: "leaphy_blocks",
    tooltip: "%{BKY_LEAPHY_SONAR_READ_TIP}",
    helpUrl: "",
}
```
This json makes this block:
![sonar block](media\leaphy_sonar_read_block.png)
Be sure to make the type name (leaphy_sonar_read) recognisable, because you will use it as a reference in your project. To find more explanation on the definition look at [google's documentation](https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks).

#### Messages
We are using messages to use different languages across Leaphy Blockly. These messages are defined in the [msg folder](msg). 
```javascript
"%%{BKY_LEAPHY_SONAR_READ_TRIG} %1 %%{BKY_LEAPHY_SONAR_READ_ECHO} %2",
```
```javascript
/// Trig pin
Blockly.Msg.LEAPHY_SONAR_READ_TRIG = 'Sonar Trig';
/** @type {string} */
```
For now you will only have to place your message in [messages.js](msg/messages.js). Support for other languages is on it's way.


#### Generator
When making the generator code you will use the same type name: leaphy_sonar_read:
```javascript
Arduino.forBlock["leaphy_sonar_read"] = function (block) {
    Arduino.addInclude("leaphy_extra", '#include "Leaphy_Extra.h"');
    var trigPin = block.getFieldValue("TRIG_PIN");
    var echoPin = block.getFieldValue("ECHO_PIN");
    var code = "getDistanceSonar(" + trigPin + ", " + echoPin + ")";
    return [code, Arduino.ORDER_ATOMIC];
  };
```
Here we are also using the same name: leaphy_sonar_read.

#### Testing
Support for testing locally is coming soon, for now you will have to commit your code to github and test it with leaphy-webbased repository.

## Release Process


Use `yarn publish` and NOT `yarn run publish` to publish a new version of the npm package