/*global Vector, window, canvas, main*/
var House = (function () {
    function House(pPosition, pDoorCol, pRotation) {
        // original boring house. Well, not that boring...
        //but not christmas-y so didn't use it. 
        this.setDoorColor(pDoorCol);
        this.setPosition(pPosition);
        if (pRotation !== "undefined") {
            this.setRotation(pRotation);
        }
    }
    House.prototype.setPosition = function (pPosition) {
        this.mPosition = pPosition;
    };
    House.prototype.getPosition = function () {
        return this.mPosition;
    };
    House.prototype.setRotation = function (pRotation) {
        this.mRotation = pRotation;
    };
    House.prototype.getRotation = function () {
        return this.mRotation;
    };
    House.prototype.setDoorColor = function (pDoorCol) {
        this.mDoorCol = pDoorCol;
    };
    House.prototype.getDoorColor = function () {
        return this.mDoorCol;
    };
    House.prototype.draw = function (pContext) {
        if (!this.getDoorColor()) {
            this.setDoorColor('#2A6881');
        }
        this.drawHouseBase(this.getPosition().getX(),
            this.getPosition().getY(),
            pContext);
        this.drawHouseBaseWindow(this.getPosition().getX(),
            this.getPosition().getY(),
            pContext);
        this.drawHouseDoor(this.getPosition().getX(),
            this.getPosition().getY(),
            pContext);
        this.drawHouseRoof(this.getPosition().getX(),
            this.getPosition().getY(),
            pContext);
        this.drawHouseRoofWindow(this.getPosition().getX(),
            this.getPosition().getY(),
            pContext);
    };

    House.prototype.drawHouseBase = function (w, h, pContext) {
        var i = 0;
        //RECT BASE

        pContext.beginPath();
        pContext.lineWidth = 5;
        pContext.fillStyle = '#997247';
        pContext.strokeStyle = '#000000';
        pContext.moveTo(w - 100, h);  // base rectangle built
        pContext.lineTo(w - 100, h + 100);
        pContext.lineTo(w + 100, h + 100);
        pContext.lineTo(w + 100, h);
        pContext.lineTo(w - 100, h);
        pContext.closePath();
        pContext.fill();
        pContext.stroke();

        //BASE DETAIL
        pContext.strokeStyle = '#6E5737';
        pContext.lineWidth = 2;
        for (i = 1; i < 10; i = i + 1) {      // drawing lines for detail 
            pContext.beginPath();
            pContext.moveTo(w - 97, h + 10 * i);
            pContext.lineTo(w + 97, h + 10 * i);
            pContext.closePath();
            pContext.stroke();
        }
    };

    House.prototype.drawHouseBaseWindow = function (w, h, pContext) {
        //BASE WINDOW
        pContext.beginPath();
        pContext.fillStyle = '#7CCDD3';
        pContext.strokeStyle = '#D1B940';
        pContext.moveTo(w + 20, h + 20);
        pContext.lineTo(w + 80, h + 20);
        pContext.lineTo(w + 80, h + 80);
        pContext.lineTo(w + 20, h + 80);
        pContext.closePath();
        pContext.fill();
        pContext.stroke();
        pContext.beginPath();
        pContext.moveTo(w + 20, h + 50);
        pContext.lineTo(w + 80, h + 50);
        pContext.closePath();
        pContext.stroke();
        pContext.beginPath();
        pContext.moveTo(w + 50, h + 20);
        pContext.lineTo(w + 50, h + 80);
        pContext.closePath();
        pContext.stroke();
    };

    House.prototype.drawHouseDoor = function (w, h, pContext) {
        pContext.beginPath();
        pContext.fillStyle = this.getDoorColor();
        pContext.strokeStyle = '#D1B940';
        pContext.lineWidth = 3;
        pContext.moveTo(w - 80, h + 97);
        pContext.lineTo(w - 80, h + 20);
        pContext.lineTo(w - 30, h + 20);
        pContext.lineTo(w - 30, h + 97);
        pContext.closePath();
        pContext.fill();
        pContext.stroke();
        pContext.beginPath();
        pContext.fillStyle = '#6D6B5F';
        pContext.strokeStyle = '#000000';
        pContext.lineWidth = 3;
        pContext.moveTo(w - 85, h + 97.5);
        pContext.lineTo(w - 85, h + 90);
        pContext.lineTo(w - 25, h + 90);
        pContext.lineTo(w - 25, h + 97.5);
        pContext.closePath();
        pContext.fill();
        pContext.stroke();

        //DOOR DETAIL
        pContext.beginPath();
        pContext.fillStyle = '#7CCDD3';
        pContext.strokeStyle = '#000000';
        pContext.arc(w - 55, h + 45, 17.5, Math.PI, Math.PI * 2, false);
        pContext.closePath();
        pContext.filaaaaaaaaaaaaaaaaaaaaaaaaaaal();
        pContext.stroke();
        pContext.fillStyle = '#B5B6BA';
        pContext.beginPath();
        pContext.arc(w - 70, h + 60, 5, 0, Math.PI * 2, false);
        pContext.closePath();
        pContext.fill();
        pContext.stroke();
    };

    House.prototype.drawHouseRoof = function (w, h, pContext) {
        pContext.beginPath();
        pContext.lineWidth = 5;
        pContext.fillStyle = '#645131';
        pContext.strokeStyle = '#000000';
        pContext.moveTo(w - 100, h);      // move back to top left wall to begin roof.
        pContext.lineTo(w - 130, h);
        pContext.lineTo(w - 80, h - 110);
        pContext.lineTo(w + 80, h - 110);
        pContext.lineTo(w + 130, h);
        pContext.closePath();
        pContext.fill();
        pContext.stroke();
    };

    House.prototype.drawHouseRoofWindow = function (w, h, pContext) {
        //ROOF WINDOW
        pContext.beginPath();
        pContext.lineWidth = 5;
        pContext.fillStyle = '#997247';
        pContext.strokeStyle = '#000000';
        pContext.moveTo(w - 40, h - 15);
        pContext.lineTo(w - 40, h - 65);
        pContext.lineTo(w, h - 90);
        pContext.lineTo(w + 40, h - 65);
        pContext.lineTo(w + 40, h - 15);
        pContext.closePath();
        pContext.stroke();
        pContext.fill();



        //ROOF WINDOW DETAIL
        pContext.beginPath();
        pContext.fillStyle = '#645131';
        pContext.strokeStyle = '#000000';
        pContext.lineWidth = 2.5;
        pContext.moveTo(w - 45, h - 62.5);  // window rectangle
        pContext.lineTo(w, h - 90);
        pContext.lineTo(w + 45, h - 62.5);
        pContext.lineTo(w + 45, h - 67.5);
        pContext.lineTo(w, h - 95);
        pContext.lineTo(w - 45, h - 67.5);
        pContext.closePath();
        pContext.stroke();      // window frame
        pContext.fill();        //window fill
        pContext.beginPath();
        pContext.fillStyle = '#7CCDD3';
        pContext.strokeStyle = '#D1B940';
        pContext.lineWidth = 2.5;
        pContext.rect(w - 30, h - 55, 60, 27.5);
        pContext.fill();
        pContext.stroke();
        pContext.beginPath();
        pContext.strokeStyle = '#D1B940';
        pContext.fillStyle = '#D1B940';
        pContext.lineWidth = 2.5;
        pContext.moveTo(w, h - 27.5);
        pContext.lineTo(w, h - 55);
        pContext.closePath();
        pContext.stroke();
        pContext.fill();
    };

    return House;


}());