/*global window, document, alert, Vector, House,
Matrix, ChristmasTree, ChristmasHouse, Scene*/
var Scene = (function () {
    function Scene(pBackgroundCol, pGrassCol) {
        this.setBackgroundColor(pBackgroundCol);
        this.setGrassColor(pGrassCol);
        this.initialiseStars();
        this.setHouses();
        this.setTress();
    }
    Scene.prototype.setBackgroundColor = function (pBackgroundCol) {
        this.mBackgroundCol = pBackgroundCol;
    };
    Scene.prototype.getBackgroundColor = function () {
        return this.mBackgroundCol;
    };
    Scene.prototype.setGrassColor = function (pGrassCol) {
        this.mGrassCol = pGrassCol;
    };
    Scene.prototype.setHouses = function () {
        // populate our house array with a bunch of unique ChristmasHouse objects. 
        //Note House is an option too but it was remade to fit the festive theme! 
        this.houses = [];
        this.houses[0] = new ChristmasHouse('#c91515');
        this.houses[1] = new ChristmasHouse('#556B2F');
        this.houses[2] = new ChristmasHouse('#c91515');
        this.houses[3] = new ChristmasHouse('#556B2F');
        this.houses[4] = new ChristmasHouse('#c91515');
        this.houses[5] = new ChristmasHouse('#556B2F');
    };
    Scene.prototype.setTress = function () {
        this.trees = [];
        this.trees[0] = new ChristmasTree(11);
        this.trees[1] = new ChristmasTree(7);
        this.trees[2] = new ChristmasTree(13);
    };
    Scene.prototype.getHouses = function () {
        return this.houses;
    };
    Scene.prototype.getTrees = function () {
        return this.trees;
    };
    Scene.prototype.initialiseStars = function () {
        // stars involve 2 circles, one inner (IR) and one outer (OR). 
        //A number of points that will decide the shape of the star and a position. 
        this.stars = [40];
        var i, cx, cy, points, IR, OR;
        i = 0;
        for (i = 0; i < 40; i += 1) {
            cx = Math.floor(Math.random() * window.innerWidth);
            cy = Math.floor(Math.random() * window.innerHeight * 0.65);
            points = Math.floor(Math.random() * 3) + 4;
            IR = Math.floor(Math.random() * 3) + 2;
            OR = Math.floor(Math.random() * 6) + 4;
            this.stars[i] = {
                pos: new Vector(cx, cy),
                numberOfPoints: points,
                InnerRadius: IR,
                OuterRadius: OR
            };
        }
    };
    Scene.prototype.getStars = function () {
        return this.stars;
    };
    Scene.prototype.getGrassCol = function () {
        return this.mGrassCol;
    };
    Scene.prototype.drawScene = function (pContext) {
        var i, h, t, pos, matrix, sMatrix;
        h = this.getHouses(); //houses
        t = this.getTrees(); //trees
        matrix = new Matrix();
        sMatrix = new Matrix();
        this.drawBackground(pContext);
        for (i = 0; i < this.getStars().length; i += 1) {
            this.drawStars(this.getStars()[i], pContext);
        }
        this.drawMoon(new Vector(pContext.canvas.width - 250, 100), pContext);
        this.drawBackgroundGrass(pContext);
        //origin = new Vector(window.innerWidth / 2, window.innerHeight / 2);
        pos = new Vector(window.innerWidth * 0.75, window.innerHeight * 0.65);
        matrix = new Matrix.createTranslation(pos);
        sMatrix = new Matrix.createScale(new Vector(0.85, 0.85));
        matrix = matrix.multiply(sMatrix);
        matrix.setTransform(pContext);
        h[0].draw(pContext);
        matrix = new Matrix.createTranslation(new Vector(250, 100));
        sMatrix = new Matrix.createScale(new Vector(1 / 0.85, 1 / 0.85));
        matrix = matrix.multiply(sMatrix);
        matrix.transform(pContext);
        h[1].draw(pContext);
        matrix = new Matrix.createTranslation(new Vector(100, 50));
        matrix.transform(pContext);
        t[0].draw(pContext);
        matrix = new Matrix.createTranslation(new Vector(-625, -50));
        matrix.transform(pContext);
        t[2].draw(pContext);
        matrix = new Matrix.createTranslation(new Vector(0, 50));
        matrix.transform(pContext);
        h[2].draw(pContext);
        matrix = new Matrix.createTranslation(new Vector(-250, -40));
        matrix.transform(pContext);
        t[1].draw(pContext);
        matrix = new Matrix.createTranslation(
            new Vector(-window.innerWidth / 2 + 325, -85)
        );
        sMatrix = new Matrix.createScale(new Vector(0.85, 0.85));
        matrix = matrix.multiply(sMatrix);
        matrix.transform(pContext);
        h[3].draw(pContext);
        matrix = new Matrix.createTranslation(new Vector(-350, 125));
        sMatrix = new Matrix.createScale(new Vector(1 / 0.85, 1 / 0.85));
        matrix = matrix.multiply(sMatrix);
        matrix.transform(pContext);
        h[4].draw(pContext);
        matrix = new Matrix.createTranslation(new Vector(500, -75));
        matrix.transform(pContext);
        t[2].draw(pContext);
        matrix = new Matrix.createTranslation(new Vector(0, 75));
        matrix.transform(pContext);
        h[5].draw(pContext);
    };

    Scene.prototype.drawBackground = function (pContext) {
        pContext.fillStyle = this.getBackgroundColor();
        pContext.fillRect(0, 0, pContext.canvas.width, pContext.canvas.height);
    };
    Scene.prototype.drawBackgroundGrass = function (pContext) {
        // simply draws a few curves about 2/3 of the way down the screen 
        //and passes color in from constructor. 
        pContext.beginPath();
        pContext.strokeStyle = '#000000';
        pContext.lineWidth = 5;
        pContext.fillStyle = this.getGrassCol();
        pContext.moveTo(0, pContext.canvas.height * 0.67);
        pContext.bezierCurveTo(pContext.canvas.width * 0.2,
            pContext.canvas.height * 0.6,
            pContext.canvas.width * 0.35,
            pContext.canvas.height * 0.63,
            pContext.canvas.width * 0.5,
            pContext.canvas.height * 0.69);
        pContext.bezierCurveTo(pContext.canvas.width * 0.6,
            pContext.canvas.height * 0.66,
            pContext.canvas.width * 0.85,
            pContext.canvas.height * 0.64,
            pContext.canvas.width,
            pContext.canvas.height * 0.67);
        pContext.lineTo(pContext.canvas.width,
            pContext.canvas.height);
        pContext.lineTo(0,
            pContext.canvas.height);
        pContext.closePath();
        pContext.fill();
        pContext.stroke();
    };
    Scene.prototype.drawHouse = function (pVector, pDoorCol, pContext) {
        var house = new House(pVector, pDoorCol);
        house.draw(pContext);
    };
    Scene.prototype.drawStars = function (star, pContext) {
        pContext.beginPath();
        var rotation = (3 * Math.PI) / 2, // sin rotation = -1, start in fourth quadrant.
            x = star.pos.getX(),
            y = star.pos.getY(),
            step = Math.PI / star.numberOfPoints,
            // how much do we need to adjust rotation by each itteration.
            //note each itteration involves 2 steps, one out and one back 
            //so pi is used, not 2 pi.
            i;
        pContext.moveTo(x, y - star.OuterRadius);
        // start from the top point of the outer radius of the star. 
        for (i = 0; i < star.numberOfPoints; i = i + 1) {       // 
            x = star.pos.getX() + Math.cos(rotation) * star.OuterRadius;
            // 'circle' is built as a sum of parts. i.e a star with 5 points
            //is essentially a pentagon.  
            y = star.pos.getY() + Math.sin(rotation) * star.OuterRadius;
            // triangle (cx->x, cy->y) == (sinx, cosx) for unit circle. 
            //unit circle * radius = resulting star.
            //Wow I haven't used this trig in so long. 
            pContext.lineTo(x, y);
            rotation += step;
            x = star.pos.getX() + Math.cos(rotation) * star.InnerRadius;
            // line back from outer to centre. 
            //Unlike unit circle we don't want to go to (0,0) but instead (IR, IR).
            y = star.pos.getY() + Math.sin(rotation) * star.InnerRadius;
            pContext.lineTo(x, y);
            rotation += step;
        }
        pContext.closePath();
        pContext.lineWidth = 5;
        pContext.strokeStyle = '#DEC153';
        pContext.stroke();
        pContext.fillStyle = '#FFE47D';
        pContext.fill();
    };
    Scene.prototype.drawMoon = function (position, pContext) {
        //Crescent moon for style. Could have achieved the same using
        //interpolate however it took way more lines of code and for 
        //some reason caused cpu to spike (might have just been my computer?)
        pContext.beginPath();
        pContext.fillStyle = '#FFE47D';
        pContext.strokeStyle = '#DEC153';
        var x = position.getX(), y = position.getY();
        pContext.moveTo(x, y);
        pContext.bezierCurveTo(x - 150, y, x - 175, y + 100, x, y + 175);
        pContext.bezierCurveTo(x - 25, y + 150, x - 75, y + 100, x - 40, y + 50);
        pContext.closePath();
        pContext.fill();
        pContext.stroke();
    };
    return Scene;
}());