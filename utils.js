Array.prototype.flatten = function() {
    var ret = [];
    for(var i = 0; i < this.length; i++) {
        if(Array.isArray(this[i])) {
            ret = ret.concat(this[i].flatten());
        } else {
            if (typeof this[i] != 'undefined') {
                ret.push(this[i]);
            }
        }
    }
    return ret;
};
