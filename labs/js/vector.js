
var Vector = (function () {
    function Vector(pX, pY, pZ) {
        this.setX(pX);
        this.setY(pY);
        this.setZ(pZ);
    }
    Vector.prototype.getX = function () {
        return this.mX;
    };
    Vector.prototype.setX = function (pX) {
        this.mX = pX;
    };

    Vector.prototype.getY = function () {
        return this.mY;
    };
    Vector.prototype.setY = function (pY) {
        this.mY = pY;
    };
    Vector.prototype.getZ = function () {
        return this.mZ;
    };
    Vector.prototype.setZ = function (pZ) {
        this.mZ = pZ;
    };
    Vector.prototype.add = function (pVectorAdd) {
        var newX = this.getX() + pVectorAdd.getX(),
            newY = this.getY() + pVectorAdd.getY(),
            newZ = this.getZ() + pVectorAdd.getZ();
        return new Vector(newX, newY, newZ);
    };
    Vector.prototype.subtract = function (pVectorSubtract) {
        var newX = this.getX() - pVectorSubtract.getX(),
            newY = this.getY() - pVectorSubtract.getY(),
            newZ = this.getZ() - pVectorSubtract.getZ();
        return new Vector(newX, newY, newZ);
    };
    Vector.prototype.multiply = function (pMult) {
        return new Vector(this.getX() * pMult,
            this.getY() * pMult,
            this.getZ() * pMult);
    };
    Vector.prototype.divide = function (pDivide) {
        return new Vector(this.getX() / pDivide,
            this.getY() / pDivide,
            this.getZ() / pDivide);
    };
    Vector.prototype.magnitude = function () {
        var a = this.getX(), b = this.getY(), c = Math.pow(a, 2) + Math.pow(b, 2);
        return Math.sqrt(c);
    };
    Vector.prototype.normalise = function () {
        var mag = this.magnitude();
        if (mag > 0) {
            return this.divide(mag);
        }
    };
    Vector.prototype.limitTo = function (pLimit) {
        if (this.magnitude() > pLimit) {
            var norm = this.normalise();
            return norm.multiply(pLimit);
        }
        return this;
    };
    Vector.prototype.dotProduct = function (pVector) {
        var x1, x2, y1, y2, z1, z2;
        x1 = this.getX();
        y1 = this.getY();
        z1 = this.getZ();
        x2 = pVector.getX();
        y2 = pVector.getY();
        z2 = pVector.getZ();

        return ((x1 * x2) + (y1 * y2) + (z1 * z2));
    };
    Vector.prototype.interpolate = function (pVector, pVal) {
        var a, b;
        a = this.getX();
        b = this.getY();
        return new Vector(a * pVal + pVector.getX() * (1 - pVal),
            b * pVal + pVector.getY() * (1 - pVal));
    };
    Vector.prototype.rotate = function (pRot) {
        var a, b;
        a = Math.cos(pRot) * this.getX() - this.getY() * Math.sin(pRot);
        b = Math.sin(pRot) * this.getX() + this.getY() * Math.cos(pRot);
        return new Vector(a, b, 1);
    };
    Vector.prototype.angleBetween = function (pVector) {
        return Math.acos(this.dotProduct(pVector));
    };
    return Vector;
}());