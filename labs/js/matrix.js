/*global Vector*/
var Matrix = (function () {
    function Matrix(x1, x2, x3, y1, y2, y3, z1, z2, z3) {
        this.mMatrixArray = [
            [x1, x2, x3],
            [y1, y2, y3],
            [z1, z2, z3]
        ];
    }
    Matrix.prototype.setElement = function (col, row, value) {
        this.mMatrixArray[col][row] = value;
    };
    Matrix.prototype.getElement = function (col, row) {
        return this.mMatrixArray[col][row];
    };
    Matrix.prototype.getRowCount = function () {
        return this.Array.length;
    };
    Matrix.prototype.getColumnCount = function () {
        return this[0].length;
    };
    Matrix.createIdentity = function () {
        return new Matrix(1, 0, 0, 0, 1, 0, 0, 0, 1);
    };
    Matrix.createTranslation = function (tVector) {
        var ident = Matrix.createIdentity();
        ident.setElement(0, 2, tVector.getX());
        ident.setElement(1, 2, tVector.getY());
        ident.setElement(2, 2, 1);
        return ident;
    };
    Matrix.createScale = function (sVector) {
        var ident = Matrix.createIdentity();
        ident.setElement(0, 0,
            ident.getElement(0, 0) * sVector.getX());
        ident.setElement(1, 1,
            ident.getElement(1, 1) * sVector.getY());
        return ident;
    };
    Matrix.createRotation = function (rot) {
        var ident = Matrix.createIdentity();
        ident.setElement(0, 0, Math.cos(rot));
        ident.setElement(0, 1, -(Math.sin(rot)));
        ident.setElement(1, 0, Math.sin(rot));
        ident.setElement(1, 1, Math.cos(rot));
        return ident;
    };
    Matrix.createRotationDeg = function (rot) {
        var rad = rot / 57.2958, ident = Matrix.createIdentity();
        ident.setElement(0, 0, Math.cos(rad));
        ident.setElement(0, 1, -(Math.sin(rad)));
        ident.setElement(1, 0, Math.sin(rad));
        ident.setElement(1, 1, Math.cos(rad));
        return ident;
    };
    Matrix.prototype.multiply = function (matrix) {
        var mult = new Matrix(), i, j, k, x;
        for (i = 0; i < 3; i += 1) {
            for (j = 0; j < 3; j += 1) {
                mult.setElement(i, j, 0);
                for (k = 0; k < 3; k += 1) {
                    x = mult.getElement(i, j);
                    mult.setElement(i, j,
                        x += this.getElement(i, k) * matrix.getElement(k, j));
                }
            }
        }
        return mult;
    };
    Matrix.prototype.multiplyVector = function (vector) {
        var i, x, y, z, tempVector, newVector = new Vector(0, 0, 0);
        for (i = 0; i < 3; i += 1) {
            x = this.getElement(i, 0);
            y = this.getElement(i, 1);
            z = this.getElement(i, 2);
            tempVector = new Vector(x, y, z);
            switch (i) {
            case 0:
                newVector.setX(tempVector.dotProduct(vector));
                break;
            case 1:
                newVector.setY(tempVector.dotProduct(vector));
                break;
            case 2:
                newVector.setZ(tempVector.dotProduct(vector));
                break;
            default:
                break;
            }
        }
        return newVector;
    };
    Matrix.prototype.setTransform = function (pContext) {
        pContext.setTransform(this.getElement(0, 0),
            this.getElement(1, 0),
            this.getElement(0, 1),
            this.getElement(1, 1),
            this.getElement(0, 2),
            this.getElement(1, 2));
    };
    Matrix.prototype.transform = function (pContext) {
        pContext.transform(this.getElement(0, 0),
            this.getElement(1, 0),
            this.getElement(0, 1),
            this.getElement(1, 1),
            this.getElement(0, 2),
            this.getElement(1, 2));
    };
    return Matrix;
}());