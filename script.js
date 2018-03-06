var sceneEl;
var terrainWidth = 6;
var terrainLength = 4;
var colorScaleWidth = 255;
$(function () {
    var sceneEl = document.querySelector('a-scene');
    if (sceneEl.hasLoaded) {
        run();
    } else {
        sceneEl.addEventListener('loaded', run, {
            passive: true
        });
    }


    function run() {
        var hue = 200;
        var saturation = 80;
        var brightness = 90;

        var countShift = 0 // Counts number of blocks so they can be shifted the proper amount
        var initialDepth = 0;
        var incrememntZ = 0.125
        while (x = terrainWidth--) {
            var length = terrainLength;
            hue -= 33;
            var brightnessTemp = brightness
            countShift++;
            initialDepth = 0.5
            incrememntZ = 1;
            var countShiftY = 1
            while (y = length--) {
                brightnessTemp -= 10;

                console.log(x)
                var entityEl = document.createElement('a-entity');
                entityEl.setAttribute("step", "color: hsl(" + hue + ", " + saturation + "% ," + brightnessTemp + "%)");
                entityEl.setAttribute("step", "depth: " + initialDepth);
                entityEl.setAttribute("position", `${x+(countShift * 0.5)} ${y+(countShiftY * 0.5)} ${incrememntZ *= 0.125}`);
                entityEl.setAttribute("depth", initialDepth)
                initialDepth += 0.125;
                countShiftY++
                sceneEl.appendChild(entityEl);

            }
        }

    }




});
