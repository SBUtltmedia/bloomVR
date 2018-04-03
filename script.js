var sceneEl;
var stepHolder;
var terrainWidth = 7;
var terrainLength = 5;
var colorScaleWidth = 255;
var data;
var colWords = ["factual","conceptual", "procedural", "metacognitive"]
var rowWords = ['remember',"understand","apply","analyze","evaluate","create"]

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
            var hue = 250;
            var shrinkScale = .25;
            var saturation = 80; // User for having different shades of colors
            var brightness = 90;

            var countShift = 0 // Counts number of blocks so they can be shifted the proper amount
            var initialDepth = 0.125;
            var incrememntZ = 0.125

            var lengthCounter = 1; // Used f
            var widthCounter = 1;

            for (x in [...Array(terrainWidth).keys()]) { // This while loop generates the "steps" that increase in size  based on the length of the terrain.
                var length = terrainLength;
                hue -= 33;
                var brightnessTemp = brightness
                countShift++;
                //initialDepth += 0.125
                incrememntZ = 1;
                var countShiftY = 0
                lengthCounter = 1;
                for (y in [...Array(terrainLength).keys()]) {
                    if (y == 0 && x == 0) {
                        continue;
                    }
                    var shrinkage = ((lengthCounter-1) + (widthCounter-1)) * shrinkScale;
                    var height;
                    var text = "";
                    var color = ""
                    if (x == 0) {
                        height = 0.01;
                        text = colWords[y-1]
                        color = "white";
                    }
                    else if (y == 0) {
                        height = 0.01;
                        text = rowWords[x-1]
                        color = "red";
                    }
                    else {
                        height = shrinkage;
                    }
                    
                    


                    brightnessTemp -= 10;
                    var entityEl = document.createElement('a-entity');
                    
                    entityEl.setAttribute("id", `${(y)}_${(x)}`);
                    entityEl.setAttribute("step", "color: hsl(" + hue + ", " + saturation + "% ," + brightnessTemp + "%)");
                    entityEl.setAttribute("step", "height: " + height);
                    entityEl.setAttribute("class", "step");
                    entityEl.setAttribute("text", "value: " + text + "; width: 3; align:center; baseline: bottom; color: " + color);
                    entityEl.setAttribute("position", `${-x} ${height/2} ${-y}  `);
                    countShiftY++
                    stepHolder.appendChild(entityEl);
                    $(entityEl).on("fusing", function (evt) {
                        var id = evt.currentTarget.id
                        var [row, col] = id.split("_")
                        console.log(row,col)
                        document.querySelector("#textHolder").setAttribute("text", {
                            value: '\n' + data[row][col] + '\n\n'
                        });
                        
                        var smartText = sceneEl.querySelector('#textHolder');
                        smartText.emit('textShow')
                    });
                    lengthCounter++;
                }
                widthCounter++;
            }
        }
    });
