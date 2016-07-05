module.exports = {
    $ : {
    /**
     *@type document
     */
    d: function () {
        return document;
    },
    ce: function (e) {
        return this.d.createElement(e);
    },
    gei: function (ref, e) {
        ref = typeof ref === "object" ? ref : this.d;
        return ref.getElementById(e);
    },
    gen: function (ref, e) {
        ref = typeof ref === "object" ? ref : this.d;
        ref.getElementsByTagName(e);
    },
    
    jsy: function (dados){
        return JSON.stringify(dados);
    }
    
}
};