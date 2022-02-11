class Vec{
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    get length() {
        return Math.sqrt(Math.pow(this.x,2) +
                            Math.pow(this.y,2));
    }

    plus(vector){
        let resultingVector =
            new Vec(this.x + vector.x,
                    this.y + vector.y);

        return resultingVector;
    }

    minus(vector){
        let resultingVector =
            new Vec(this.x - vector.x,
                    this.y - vector.y);

        return resultingVector;
    }
}