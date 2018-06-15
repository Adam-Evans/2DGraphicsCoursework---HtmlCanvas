/*global Vector, Matrix, window, canvas, main, document*/
var ChristmasHouse = (function () {
    function ChristmasHouse(pDoorCol) {
        this.mDoorCol = pDoorCol;
        this.initialise();
    }

    ChristmasHouse.prototype.setPosition = function (pPosition) {
        this.mPosition = pPosition;
    };
    ChristmasHouse.prototype.getPostition = function () {
        return this.mPosition;
    };

    ChristmasHouse.prototype.setDoorCol = function (pDoorCol) {
        this.mDoorCol = pDoorCol;
    };
    ChristmasHouse.prototype.getDoorCol = function () {
        return this.mDoorCol;
    };
    ChristmasHouse.prototype.initialise = function () {
        // on creating a new house object we create need to know:
        //number of icicles (detail), the width for these details,
        //the variance in height permitted to each detail to add
        //more unique randomness
        var i;
        // the number of buttons a house will have and an
        //array of these buttons containing position, color and radius.
        this.detailCount = Math.floor(Math.random() * 20) + 20;
        this.detailWidth = 250 / this.detailCount;
        this.heightVariance = [];
        for (i = 0; i < this.detailCount; i += 1) {
            this.heightVariance[i] = Math.floor(Math.random() * 15);
        }
        this.buttonCount = Math.floor(Math.random() * 7) + 3;
        this.button = [];
        this.initialiseButtons();
    };
    ChristmasHouse.prototype.initialiseButtons = function () {
        //buttons must be initialised as an object to a) prevent 
        //NaN/null references. b) make it easier to keep track of inpdependant houses. 
        var i, col;
        col = ['#287AA9', '#e13636', '#ee95cf', '#9ad765', '#efcc00'];
        for (i = 0; i < this.getButtonCount(); i += 1) {
            this.button[i] = {
                pos: new Vector(Math.floor(Math.random() * 200) - 100,
                    Math.floor(Math.random() * 100) - 50),
                color: col[Math.floor(Math.random() * col.length)],
                radius: (Math.floor(Math.random() * 10) + 5)
            };
        }
    };
    ChristmasHouse.prototype.getButtons = function () {
        return this.button;
    };
    ChristmasHouse.prototype.getDetailCount = function () {
        return this.detailCount;
    };
    ChristmasHouse.prototype.getDetailWidth = function () {
        return this.detailWidth;
    };
    ChristmasHouse.prototype.getHeightVariance = function () {
        return this.heightVariance;
    };
    ChristmasHouse.prototype.getButtonCount = function () {
        return this.buttonCount;
    };
    ChristmasHouse.prototype.draw = function (pContext) {
        var matrix, matrix2;
        if (!this.getDoorCol()) {
            this.setDoorCol('#2A6881');
        }
        this.drawBase(pContext);
        this.drawButtons(pContext);
        this.drawIcicles(pContext);
        this.drawRoof(pContext);
        matrix = new Matrix.createTranslation(new Vector(0, -120));
        matrix2 = new Matrix.createScale(new Vector(0.8, 0.8));
        matrix = matrix.multiply(matrix2);
        matrix.transform(pContext);
        this.drawRoofWindow(pContext);
        matrix = new Matrix.createTranslation(new Vector(0, 120));
        matrix2 = new Matrix.createScale(new Vector(1.25, 1.25));
        matrix = matrix.multiply(matrix2);
        matrix.transform(pContext);
        matrix = new Matrix.createTranslation(new Vector(-110, 95));
        matrix.transform(pContext);
        this.drawDoor(pContext, this.getDoorCol());
        matrix = new Matrix.createTranslation(new Vector(150, -70));
        matrix.transform(pContext);
        this.drawWindow(pContext);
    };

    ChristmasHouse.prototype.drawBase = function (ctx) {
        //base pattern
        var basePattern = document.createElement("canvas"), baseContext,
            pattern1;
        basePattern.width = 10;
        basePattern.height = 10;
        baseContext = basePattern.getContext("2d");
        //create a new canvas to draw a pattern on which will be
        //repeated along the fill portion of our house base.
        //Similar to the method used to pre render the scene image to save 
        //redrawing everything. 
        baseContext.beginPath();
        baseContext.lineWidth = 0.5;
        baseContext.fillStyle = '#b06500';
        baseContext.rect(0, 0, 5, 5);
        baseContext.closePath();
        baseContext.fill();
        baseContext.beginPath();
        baseContext.fillStyle = '#b06500';
        baseContext.rect(0, 5, 5, 5);
        baseContext.closePath();
        baseContext.fill();
        baseContext.beginPath();
        baseContext.fillStyle = '#7d4800';
        baseContext.rect(5, 0, 5, 5);
        baseContext.closePath();
        baseContext.fill();
        baseContext.beginPath();
        baseContext.fillStyle = '#7d4800';
        baseContext.rect(5, 5, 5, 5);
        baseContext.closePath();
        baseContext.fill();
        //base pattern end
        ctx.lineWidth = 5;
        ctx.beginPath();
        //ctx.fillStyle = '#b06500';
        //base
        ctx.strokeStyle = 'black';
        ctx.moveTo(-125, -75);
        ctx.lineTo(-125, 75);
        ctx.lineTo(125, 75);
        ctx.lineTo(125, -75);
        ctx.closePath();
        pattern1 = ctx.createPattern(basePattern, "repeat");
        ctx.fillStyle = pattern1;
        ctx.fill();
        ctx.stroke();
        //base end
    };
    ChristmasHouse.prototype.drawRoof = function (ctx) {
        //roof pattern
        ctx.strokeStyle = '#000000';
        var canvasPattern, pattern2, contextPattern;
        canvasPattern = document.createElement("canvas");
        //create a new canvas to draw a pattern on which will be
        //repeated along the fill portion of our roof. Similar to 
        //the method used to pre render the scene image to save
        //redrawing everything. 
        canvasPattern.width = 10;
        canvasPattern.height = 10;
        contextPattern = canvasPattern.getContext("2d");
        contextPattern.beginPath();
        contextPattern.lineWidth = 0.5;
        contextPattern.fillStyle = '#b06500';
        contextPattern.rect(0, 0, 10, 2.5);
        contextPattern.closePath();
        contextPattern.stroke();
        contextPattern.fill();
        contextPattern.beginPath();
        contextPattern.fillStyle = '#7d4800';
        contextPattern.rect(0, 2.5, 10, 7.5);
        contextPattern.closePath();
        contextPattern.stroke();
        contextPattern.fill();
        //roof pattern end
        pattern2 = ctx.createPattern(canvasPattern, "repeat");
        ctx.moveTo(-150, -65);
        ctx.beginPath();
        ctx.fillStyle = pattern2;
        ctx.lineTo(-100, -175);
        ctx.lineTo(100, -175);
        ctx.lineTo(150, -65);
        ctx.lineTo(-150, -65);
        ctx.lineCap = "round";
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    };
    ChristmasHouse.prototype.drawIcicles = function (ctx) {
        //roofDetail (icicles)
        var pos, nextPos, i;
        ctx.fillStyle = '#ffffff';
        for (i = 0; i < this.detailCount; i += 1) {

            ctx.beginPath();
            pos = new Vector(-125 + (this.getDetailWidth() * i), -75);
            //not going to lie, JS Lint makes no sense.
            //in what way is this more readable than
            // one line...
            nextPos =
                new Vector(-125 + (this.getDetailWidth() * i)
                    - this.getDetailWidth() * 0.5,
                    -40 - this.getHeightVariance()[i]);
            //seriously.
            ctx.moveTo(pos.getX(), pos.getY());
            pos = pos.interpolate(nextPos, 0.2);
            ctx.lineTo(pos.getX(), pos.getY());
            pos = pos.interpolate(nextPos, 0.35);
            ctx.lineTo(pos.getX(), pos.getY());
            pos = pos.interpolate(nextPos, 0.5);
            ctx.lineTo(pos.getX(), pos.getY());
            pos = pos.interpolate(nextPos, 0.7);
            ctx.lineTo(pos.getX(), pos.getY());
            pos = pos.interpolate(nextPos, 0.9);
            ctx.lineTo(pos.getX(), pos.getY());
            ctx.lineTo(nextPos.getX(), nextPos.getY());
            nextPos = new Vector((-125 + this.getDetailWidth() * i)
                + this.getDetailWidth(), -75);
            pos = pos.interpolate(nextPos, 0.2);
            ctx.lineTo(pos.getX(), pos.getY());
            pos = pos.interpolate(nextPos, 0.35);
            ctx.lineTo(pos.getX(), pos.getY());
            pos = pos.interpolate(nextPos, 0.5);
            ctx.lineTo(pos.getX(), pos.getY());
            pos = pos.interpolate(nextPos, 0.7);
            ctx.lineTo(pos.getX(), pos.getY());
            pos = pos.interpolate(nextPos, 0.9);
            ctx.lineTo(pos.getX(), pos.getY());
            ctx.lineTo(nextPos.getX(), nextPos.getY());
            ctx.closePath();
            ctx.fill();
        }
        //roofDetail end
    };
    ChristmasHouse.prototype.drawRoofWindow = function (ctx) {
        ctx.lineWidth = 2;
        ctx.fillStyle = '#643900';
        ctx.strokeStyle = '#ffffff';
        ctx.moveTo(-50, 45);
        ctx.beginPath();
        ctx.lineTo(-50, -15);
        ctx.lineTo(0, -45);
        ctx.lineTo(50, -15);
        ctx.lineTo(50, 45);
        ctx.lineTo(-50, 45);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        //ledge
        ctx.moveTo(-55, -10);
        ctx.beginPath();
        ctx.lineTo(0, -40);
        ctx.lineTo(55, -10);
        ctx.lineTo(55, -20);
        ctx.lineTo(0, -50);
        ctx.lineTo(-55, -20);
        ctx.lineTo(-55, -10);
        ctx.closePath();
        ctx.fillStyle = '#643900';
        ctx.fill();
        ctx.stroke();
        //ledge end
        //window
        ctx.strokeStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(-20, 30);
        ctx.lineTo(-20, -10);
        ctx.lineTo(20, -10);
        ctx.lineTo(20, 30);
        ctx.lineTo(-20, 30);
        ctx.closePath();
        ctx.fillStyle = '#7CCDD3';
        ctx.stroke();
        ctx.fill();
        ctx.moveTo(0, -10);
        ctx.lineTo(0, 30);
        ctx.closePath();
        ctx.stroke();
        ctx.moveTo(-20, 10);
        ctx.lineTo(20, 10);
        ctx.closePath();
        ctx.stroke();
        //window end
    };
    ChristmasHouse.prototype.drawButtons = function (ctx) {
        //each object has a random number of buttons associated to it.
        //This will draw them at randomly set positions along the house.
        var i, b;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        for (i = 0; i < this.getButtonCount(); i += 1) {
            b = this.getButtons()[i];
            ctx.beginPath();
            ctx.arc(b.pos.getX(), b.pos.getY(), b.radius, 0, 2 * Math.PI);
            ctx.fillStyle = b.color;
            ctx.fill();
            ctx.stroke();
        }
    };
    ChristmasHouse.prototype.drawDoor = function (ctx, doorCol) {
        var radius = 5;
        ctx.moveTo(0, -75);
        ctx.beginPath();
        ctx.lineTo(50, -75);
        ctx.lineTo(50, 0);
        ctx.lineTo(0, 0);
        ctx.lineTo(0, -75);
        ctx.closePath();
        ctx.fillStyle = doorCol;
        ctx.strokeStyle = "#ffffff";
        ctx.fill();
        ctx.stroke();
        ctx.moveTo(-5, 0);
        ctx.beginPath();
        ctx.lineTo(55, 0);
        ctx.lineTo(55, 5);
        ctx.lineTo(-5, 5);
        ctx.lineTo(-5, 0);
        ctx.closePath();
        ctx.fillStyle = '#6D6B5F';
        ctx.fill();
        ctx.stroke();
        ctx.moveTo(10, -35);
        ctx.beginPath();
        ctx.arc(10, -35, radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    };
    ChristmasHouse.prototype.drawWindow = function (ctx) {
        ctx.moveTo(-35, 35);
        ctx.beginPath();
        ctx.lineTo(-35, -35);
        ctx.lineTo(35, -35);
        ctx.lineTo(35, 35);
        ctx.lineTo(-35, 35);
        ctx.closePath();
        ctx.fillStyle = '#7CCDD3';
        ctx.strokeStyle = '#ffffff';
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(35, 0);

        ctx.lineTo(-35, 0);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, 35);

        ctx.lineTo(0, -35);
        ctx.closePath();
        ctx.stroke();
    };
    return ChristmasHouse;
}());