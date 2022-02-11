class Group{
    constructor(){
        this.group = [];
    }

    add(value) {
        // Adds value to the group, if not already a member
        if (!this.has(value)){
            this.group.push(value);
        }
    }

    delete(value){
        // Remove value from the group, if it was a member
        if (this.has(value)){
            this.group.splice(this.group.indexOf(value),1);
        }
    }

    has(value){
        // Returns a Boolean value indicating whether its argument is a member of the group
        for (let element of this.group) {
            if (value === element){
                return true;
            }
        }
        return false;
    }
}