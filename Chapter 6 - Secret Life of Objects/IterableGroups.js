class GroupIterator {
    constructor(group) {
        this.groupElements = group.groupElements;
        this.currentPosition = 0;
    }

    next() {
        if (this.currentPosition === this.groupElements.length)
            return {done:true};

        let value = this.groupElements[this.currentPosition];
        this.currentPosition++;

        return {value, done: false};
    }
}

class Group{
    constructor(){
        this.groupElements = [];
    }

    add(value) {
        // Adds value to the group, if not already a member
        if (!this.has(value)){
            this.groupElements.push(value);
        }
    }

    delete(value){
        // Remove value from the group, if it was a member
        if (this.has(value)){
            this.groupElements.splice(this.groupElements.indexOf(value),1);
        }
    }

    has(value){
        // Returns a Boolean value indicating whether its argument is a member of the group
        for (let element of this.groupElements) {
            if (value === element){
                return true;
            }
        }
        return false;
    }

    [Symbol.iterator] = function() {
        return new GroupIterator(this);
    }
}