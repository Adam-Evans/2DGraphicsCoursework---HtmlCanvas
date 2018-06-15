/*global Vector, Matrix, window, canvas, main*/
var ChristmasTree = (function () {
    function ChristmasTree(pLevels) {
        this.mLevels = pLevels;
    }
    ChristmasTree.prototype.getLevels = function () {
        return this.mLevels;
    };
    ChristmasTree.prototype.draw = function (ctx) {
        var i, pos, layerHeight;
        ctx.closePath(); //incase a path already exists.
        ctx.beginPath();
        ctx.moveTo(-25, 90);
        ctx.lineTo(25, 90);
        ctx.lineTo(25, 0);
        ctx.lineTo(-25, 0);
        ctx.closePath();
        ctx.fillStyle = '#533118';
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000000';
        ctx.fill();
        ctx.stroke();
        pos = new Vector(70, 30);
        layerHeight = 50;
        // a whole bunch of arrow shapes ^ stacked up to kinda look like a tree! 
        for (i = 0; i < this.getLevels(); i += 1) {
            ctx.beginPath();
            ctx.moveTo(-pos.getX(), pos.getY());
            ctx.lineTo(0, pos.getY() - layerHeight / 3);
            ctx.lineTo(pos.getX(), pos.getY());
            ctx.lineTo(0, pos.getY() - layerHeight * 3);
            ctx.lineTo(-pos.getX(), pos.getY());
            ctx.closePath();
            pos = new Vector(pos.getX(), pos.getY() - layerHeight / 2);
            ctx.fillStyle = '#2A2C05';
            ctx.fill();
            ctx.stroke();

        }
    };
    return ChristmasTree;
}());