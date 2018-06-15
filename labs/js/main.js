/*global window, document, alert, Snow, Vector, Image,
ChristmasTree, House, ChristmasHouse, Scene, Matrix,
requestAnimationFrame*/
// window load event handler
//
//CREDIT to CGTextures (textures.com) for the free wood 
//texture used in the 'Merry Christmas' sign. 
//
// this function will initialise the main canvas and get its context.
function onLoad() {
    var testScene,
        preCanvas,
        preContext,
        origin,
        canvas = document.getElementById('mainCanvas'),
        snow = new Snow(200),
        mainContext,
        xPos,
        houses,
        rotation,
        dir,
        sign = new Image(),
        house,
        lTime;
    function doKeyDown(e) {
        if (e.keyCode === 45) { // - key
            snow.removeParticles(40);
        }
        if (e.keyCode === 43) { // + key
            snow.addParticles(40);
        }
    }
    function initialiseCanvasContext() {
        if (!canvas) {
            alert('Error locating main canvas element');
            return;
        }
        mainContext = canvas.getContext('2d');
        if (!mainContext) {
            alert('Error: failed locating main context');
            return;
        }
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        xPos = 0;
        houses = [];
        //max number of snow particles. Over around 1500 shows
        //some issues with snow re-entering in clusters that looks kind of odd.  
        rotation = 0;
        dir = 1;
        snow.createParticles();
        sign.src = 'img/MerryChristmasSign.png';
        //Pre rendering static items in the scene as it is massively
        //better performance to simply redraw an existing cnavas than
        //to redraw the entire scene every animation frame.
        preCanvas = document.createElement('canvas');
        preCanvas.width = window.innerWidth;
        preCanvas.height = window.innerHeight;
        preContext = preCanvas.getContext('2d');
        testScene = new Scene('#210c33', '#ffffff');
        house = new House(new Vector(0, 0, '#8B2323'));
        origin = new Vector(window.innerWidth * 0.5, window.innerHeight * 0.5);
        lTime = Date.now;
        testScene.drawScene(preContext);
        //canvas.addEventListener("keypress", doKeyDown, false); 
        // could not get this working at all for some reason..
        //I assume because the canvas is stuck in the animation loop
        //and is not looking for input? Would require two threads I guess?
        window.addEventListener("keypress", doKeyDown, false);
    }

    //this function will allow us to draw on the canvas
    function draw() {
        var matrix;
        mainContext.drawImage(preCanvas, 0, 0);
        //rotate Sign
        matrix = new Matrix.createTranslation(new Vector(window.innerWidth / 2, 100));
        matrix.setTransform(mainContext);
        matrix = new Matrix.createScale(new Vector(0.7, 0.7));
        matrix.transform(mainContext);
        matrix = new Matrix.createRotationDeg(rotation);
        matrix.transform(mainContext);
        matrix = new Matrix.createTranslation(new Vector(-300, -200));
        matrix.transform(mainContext);
        mainContext.drawImage(sign, -xPos, 0);
        //rotate Sign End

        //THIS method actually uses much more cpu than the above 
        //for the exact same effect,
        //however I am leaving it to show that the same effect can be 
        //achieved by using different functions within the Matrix class.
        //For the extra CPU and memory cost I feel Matrix.multiply is best kept for 
        //more complicated transformations that could not be achieved 
        //as easily as transforming in series.
        //matrix = new Matrix.createTranslation(new Vector(window.innerWidth / 2, 100));
        //matrix2 = new Matrix.createScale(new Vector(0.7, 0.7));
        //matrix = matrix.multiply(matrix2);
        //matrix2 = new Matrix.createRotationDeg(rotation);
        //matrix = matrix.multiply(matrix2);
        //matrix2 = new Matrix.createTranslation(new Vector(-300, -200));
        //matrix = matrix.multiply(matrix2);
        //matrix.setTransform(mainContext);
        //mainContext.drawImage(sign, 0, 0);

        mainContext.setTransform(1, 0, 0, 1, 0, 0); // set transform to identity matrix.
        snow.draw(mainContext);
        lTime = Date.now();
    }
    function rotateSign(dTime) {
        var increment = Math.random(0, 15) / 10, time;
        time = Date.now();
        if (dir === 1) {
            increment *= dTime / 16;
            // keeping animation relative to the position it would be at
            //if the display was 60fps.
            rotation += increment;
            xPos += increment * 10;
            if (rotation > 15) {
                dir = -1;
            }
        } else {
            increment *= dTime / 16;
            rotation -= increment;
            xPos -= increment * 10;
            if (rotation < -15) {
                dir = 1;
            }
        }
        if (Math.abs(xPos > 205)) {
            xPos = 0;
        }
        if (Math.abs(rotation > 17)) {
            rotation = 0;
        }

    }
    function update(dTime) {
        snow.update(dTime);
        rotateSign(dTime);
    }
    function animLoop() {
        var time, dTime;
        time = Date.now();
        dTime = time - lTime;
        update(dTime);
        draw();
        requestAnimationFrame(animLoop);
    }
    initialiseCanvasContext();
    draw();
    animLoop();
}

window.addEventListener('load', onLoad, false);
