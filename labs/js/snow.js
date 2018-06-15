/*global Vector, Matrix, window, canvas, main, alert*/
var Snow = (function () {
    function Snow(maxParticles) {
        this.setMaxParticles(maxParticles);
        this.initialiseParticles();
        this.setAngle(0);
    }
    Snow.prototype.setMaxParticles = function (pParticles) {
        this.mMaxParticles = pParticles;
    };
    Snow.prototype.getMaxParticles = function () {
        return this.mMaxParticles;
    };
    Snow.prototype.initialiseParticles = function () {
        this.particles = [];
    };
    Snow.prototype.setParticles = function (index, pParticle) {
        this.particles[index] = pParticle;
    };
    Snow.prototype.getParticles = function () {
        return this.particles;
    };
    Snow.prototype.createParticles = function () {
        var i, w, h;
        w = window.innerWidth;
        h = window.innerHeight;
        for (i = 0; i < this.getMaxParticles(); i += 1) {
            this.getParticles().push({
                pos: new Vector(Math.random() * w, Math.random() * h),
        //position vector - initially place snow at random 
        //positions so that the screen doesnt start blank and suddenly get covered. 
                radius: Math.random() * 3 + 2,
                speed: Math.random() * this.getMaxParticles()
            });
        }
    };
    // add and initialise more snow particles to the particles array.
    Snow.prototype.addParticles = function (count) {
        var i, w, h, warning;
        w = window.innerWidth;
        h = window.innerHeight;
        if (this.mMaxParticles < 0) {
            this.mMaxParticles = 0;
        }
        for (i = 0; i < count; i += 1) {
            this.particles.push({
                pos: new Vector(Math.random() * w, Math.random() * h),
                radius: Math.random() * 3 + 2,
                speed: Math.random() * this.getMaxParticles()
            });
        }
        this.mMaxParticles += count;
        if (this.mMaxParticles > 1500 && this.mMaxParticles < 1521) {
            warning = "Warning, over 1500 snow particles starts to";
            warning += " slow things and cause unpredictable behaviour";
            warning += " continue increasing at your own risk.";
            //seriously. JS lint needs this broke down
            //into 3 lines. Who is this helping?
            alert(warning);
        }
        // just a one time warning when increasing the snow particles, 
        //after 1500 things get laggy. 
    };
    Snow.prototype.removeParticles = function (count) {
        this.particles = this.particles.slice(0, -count);
        this.mMaxParticles -= count;
    };
    Snow.prototype.setAngle = function (angle) {
        this.mAngle = angle;
    };
    Snow.prototype.getAngle = function () {
        return this.mAngle;
    };
    Snow.prototype.incrementAngle = function () {
        this.mAngle += 0.01;
    };
    Snow.prototype.draw = function (ctx) {
        var i, p;
        ctx.fillStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#000000';
        ctx.beginPath();
        for (i = 0; i < this.getMaxParticles(); i += 1) {
            p = this.getParticles()[i];
            ctx.moveTo(p.pos.getX(), p.pos.getY());

            ctx.arc(p.pos.getX(), p.pos.getY(), p.radius, 0, Math.PI * 2, true);
        }
        ctx.closePath();
        ctx.fill();
    };
    Snow.prototype.update = function (dTime) {
        var i, p, W, H;
        W = window.innerWidth;
        H = window.innerHeight;
        this.incrementAngle();
        //update x and y pos.
        //add 1 to ensure cos is positive. Math.abs would be 
        //an option but this is much cheaper
        //different speeds give the illusion of some randomness 
        //despite the fact all snow is following the same sin wave
        for (i = 0; i < this.getMaxParticles(); i += 1) {
            p = this.getParticles()[i];
            //multiply next pos by dTime / 16 where dTime is time between frames.
            //This keeps the snow in line with it's 60fps equivalent.
            p.pos.setX(p.pos.getX() +
                Math.sin(this.getAngle()) * (2 * dTime / 16));
            p.pos.setY(p.pos.getY() +
                Math.cos(this.getAngle() + p.speed * dTime / 16)
                + 1 + p.radius / 2);
            if (p.pos.getX() > W + 5 || p.pos.getX() < -5 || p.pos.getY() > H) {
                //90% will enter from the top at a random w pos.
                if (i % 9 > 0) {
                    this.setParticles(i, {
                        pos: new Vector(Math.random() * W, -10),
                        radius: p.radius,
                        speed: p.speed
                    });
                } else {
                    //If the flake is exitting from the right make it reenter 
                    //from left and vice versa. This keeps the smooth flow of 
                    //the sin wave, otherwise snow looks chaotic.
                    if (Math.sin(this.getAngle()) > 0) {
                        //Enter from the left
                        this.setParticles(i, {
                            pos: new Vector(-5, Math.random() * H),
                            radius: p.radius,
                            speed: p.speed
                        });
                    } else {
                        //Enter from the right
                        this.setParticles(i, {
                            pos: new Vector(W + 5, Math.random() * H),
                            radius: p.radius,
                            speed: p.speed
                        });
                    }
                }
            }
        }
    };
    return Snow;
}());