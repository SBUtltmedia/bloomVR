var sceneEl;
var stepHolder;
var terrainWidth = 6;
var terrainLength = 4;
var colorScaleWidth = 255;
var data;

$.when(getBloomData()).then(
    function (bloomData) {
        console.log(bloomData)
        data = bloomData;
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
            var shrinkScale=.25;
            var saturation = 80; // User for having different shades of colors
            var brightness = 90;

            var countShift = 0 // Counts number of blocks so they can be shifted the proper amount
            var initialDepth = 0.125;
            var incrememntZ = 0.125

            var lengthCounter = 1; // Used f
            var widthCounter = 1;
            
            for( x in [...Array(terrainWidth).keys()]) { // This while loop generates the "steps" that increase in size  based on the length of the terrain.
                var length = terrainLength;
                hue -= 33;
                var brightnessTemp = brightness
                countShift++;
                //initialDepth += 0.125
                incrememntZ = 1;
                var countShiftY = 0
                lengthCounter = 1;
                 for( y in [...Array(terrainLength).keys()]) {
                    var shrinkage=(lengthCounter + widthCounter)* shrinkScale;
                    console.log(shrinkage, lengthCounter, widthCounter)
                    var height=shrinkage;
                    brightnessTemp -= 10;
                    var entityEl = document.createElement('a-entity');
                    entityEl.setAttribute("step", "color: hsl(" + hue + ", " + saturation + "% ," + brightnessTemp + "%)");
//                    entityEl.setAttribute("step", "depth: " + (initialDepth * (lengthCounter + widthCounter)));
                    entityEl.setAttribute("step", "height: " +height);
                    entityEl.setAttribute("class", "step");
                    entityEl.setAttribute("step", "text: " + data[lengthCounter-1][widthCounter-1]);
                    entityEl.setAttribute("position", `${-x} ${height/2} ${-y}  `);
                    entityEl.setAttribute("id", `${(y)}_${x}`);
                    countShiftY++
                    stepHolder.appendChild(entityEl);
                    entityEl.setAttribute("step", "text: " + data[lengthCounter-1][widthCounter-1]);
                    console.log(entityEl.attributes.getNamedItem("step"))
                    $(entityEl).on("fusing", function (evt) {
                        var id=evt.target.id
                        var [row,col]=id.split("_")
                        console.log(data[row][col])
                        $("#textHolder").attr("text", "value: "  +data[row][col]);
                        var smartText = sceneEl.querySelector('#smartText');
                        smartText.emit('textShow')
                    });
                    lengthCounter++;    
                }
                widthCounter++;
            }
        }
    });

