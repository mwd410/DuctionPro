var EDMP = {};
EDMP.extend = function(child, base) {
    child.superClass = base;
    for (var key in base.prototype) {
        if (!(key in child.prototype)) {
            child.prototype[key] = base.prototype[key];
        }
    }
}

Array.range= function(a, b, step){
    var A= [];
    if(typeof a== 'number'){
        A[0]= a;
        step= step || 1;
        while(a+step<= b){
            A[A.length]= a+= step;
        }
    }
    else{
        var s= 'abcdefghijklmnopqrstuvwxyz';
        if(a=== a.toUpperCase()){
            b=b.toUpperCase();
            s= s.toUpperCase();
        }
        s= s.substring(s.indexOf(a), s.indexOf(b)+ 1);
        A= s.split('');        
    }
    return A;
}


EDMP.Object = function(config) {
}
EDMP.Object.prototype = {
    applyDefaults : function(config, defaultAttrs) {
        config = config || {};
        for (var key in defaultAttrs) {
            if (!(key in config)) {
                config[key] = defaultAttrs[key];
            }
            this[key] = config[key];
        }
        return config;
    },
    recurse : function(config, branch, Class) {
        for (var i = 0; i < config[branch].length; ++i) {
            this[branch][i] = new Class(config[branch][i]);
        }
    }
}

var Schedule = function(config) {
    Schedule.superClass.call(this);
    var defaultAttrs = {
        month : "January",
        year : 2012,
        dayCount : 31,
        startDay : 0,
        days : []
    }
    config = this.applyDefaults(config, defaultAttrs);
    this.recurse(config, "days", Day);
}
Schedule.prototype = {
    
}
EDMP.extend(Schedule, EDMP.Object);

var Day = function(config) {
    Day.superClass.call(this);
    var defaultAttrs = {
        date : 1,
        streams : []
    }
    config = this.applyDefaults(config, defaultAttrs);
    this.recurse(config,"streams", Stream);
};
Day.prototype = {
    
};
EDMP.extend(Day, EDMP.Object);


var Stream = function(config) {
    Stream.superClass.call(this);
    var defaultAttrs = {
        time : "00:00:00 GMT",
        daw : "Daw",
        genre : "Genre"
    }
    config = this.applyDefaults(config,defaultAttrs);
}
Stream.prototype = {
    
}
EDMP.extend(Stream, EDMP.Object);
