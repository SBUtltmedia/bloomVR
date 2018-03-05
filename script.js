var sceneEl;
var terrainWidth = 5;
var terrainLength = 3;
var colorScaleWidth=255;
$(function () {
    var sceneEl = document.querySelector('a-scene');
    if (sceneEl.hasLoaded) {
        run();
    } else {
        sceneEl.addEventListener('loaded', run);
    }

    
function run() {


    while (x = terrainWidth--) {
        var length= terrainLength;
        while (y = length--) {
            console.log(x)
            var entityEl = document.createElement('a-entity');
            entityEl.setAttribute("step", "color: rgb("x*));
            entityEl.setAttribute("position", `${x} ${y} 0`);
                sceneEl.appendChild(entityEl);

            }
        }

    }    
    
    
    
    
});



