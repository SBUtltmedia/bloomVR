var sceneEl;
var stepHolder;
var terrainWidth = 6;
var terrainLength = 4;
var colorScaleWidth = 255;
$(function () {
    var sceneEl = document.querySelector('a-scene');
    var stepHolder = document.querySelector('#stepHolder');
    if (sceneEl.hasLoaded) {
        run();
    } else {
        sceneEl.addEventListener('loaded', run, {
            passive: true
        });
    }


    function run() {
        var hue = 200;
        var saturation = 80; // User for having different shades of colors
        var brightness = 90;

        var countShift = 0 // Counts number of blocks so they can be shifted the proper amount
        var initialDepth = 0.125;
        var incrememntZ = 0.125

        var lengthCounter = 1; // Used f
        var widthCounter = 1;
        while (x = terrainWidth--) { // This while loop generates the "steps" that increase in size  based on the length of the terrain.
            var length = terrainLength;
            hue -= 33;
            var brightnessTemp = brightness
            countShift++;
            //initialDepth += 0.125
            incrememntZ = 1;
            var countShiftY = 1
            lengthCounter = 1;
            while (y = length--) {
                brightnessTemp -= 10;

                console.log(x)
                var entityEl = document.createElement('a-entity');
                entityEl.setAttribute("step", "color: hsl(" + hue + ", " + saturation + "% ," + brightnessTemp + "%)");
                entityEl.setAttribute("step", "depth: " + (initialDepth * (lengthCounter + widthCounter)));
                entityEl.setAttribute("class", "step");

                entityEl.setAttribute("position", `${x+(countShift * 0.5)} ${y+(countShiftY * 0.5)} ${incrememntZ -= ((widthCounter) * 0.06) }`);
                //initialDepth += 0.125;
                countShiftY++
                stepHolder.appendChild(entityEl);
                lengthCounter++;

                console.log(initialDepth * (lengthCounter + widthCounter))
                $(entityEl).on("fusing", function (evt) {
                    console.log("dfsd")
                    $("#textHolder").attr("text", "value: Phred");
                    var smartText = sceneEl.querySelector('#smartText');
                    smartText.emit('textShow')

                    // $("#smartText").animate({"scale","1 1 1")
                });

            }
            widthCounter++;
        }
        // document.querySelector('step').addEventListener('click', function (evt) {
        //console.log('This 2D element was clicked!');
        //});
    }



});

$.when(getBloomData()).then(
    function (bloomData) {
        console.log(bloomData)
    });
