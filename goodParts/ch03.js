var empty_object = {};

var stooge = {
    "first-name": "Jerome",
    "last-name": "Howard"
};


var flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2004-09-22 14:55",
        city: "Sydney"
    },
    arrival: {
        IATA: "LAX",
        time: "2004-09-23 10:42",
        city: "Los Angeles"
    }
};


stooge["first-name"]     // "Joe"
flight.departure.IATA    // "SYD"


stooge["middle-name"]    // undefined
flight.status            // undefined
stooge["FIRST-NAME"]     // undefined


var middle = stooge["middle-name"] || "(none)";
console.log("middle:" + middle);
var status = flight.status || "unknown";
console.log("status:" + status);


console.log(flight.equipment)                            // undefined
//flight.equipment.model                        // throw "TypeError"
console.log(flight.equipment && flight.equipment.model)    // undefined


stooge['first-name'] = 'Jerome';


stooge['middle-name'] = 'Lester';
stooge.nickname = 'Curly';
flight.equipment = {
    model: 'Boeing 777'
};
flight.status = 'overdue';


var x = stooge;
x.nickname = 'Curly';
var nick = stooge.nickname;
// nick is 'Curly' because x and stooge
// are references to the same object

var a = {}, b = {}, c = {};
// a, b, and c each refer to a
// different empty object
a = b = c = {};
// a, b, and c all refer to
// the same empty object


if (typeof Object.beget !== 'function') {
    Object.beget = function (o) {
        var F = function () {
        };
        F.prototype = o;
        return new F();
    };
}
var another_stooge = Object.beget(stooge);


another_stooge['first-name'] = 'Harry';
another_stooge['middle-name'] = 'Moses';
another_stooge.nickname = 'Moe';


stooge.profession = 'actor';
another_stooge.profession    // 'actor'


typeof flight.number      // 'number'
typeof flight.status      // 'string'
typeof flight.arrival     // 'object'
typeof flight.manifest    // 'undefined'


typeof flight.toString    // 'function'
typeof flight.constructor // 'function'


flight.hasOwnProperty('number')         // true
flight.hasOwnProperty('constructor')    // false


var name;
for (name in another_stooge) {
    if (typeof another_stooge[name] !== 'function') {
        console.log(name + ': ' + another_stooge[name]);
    }
}


var i;
var properties = [
    'first-name',
    'middle-name',
    'last-name',
    'profession'
];
for (i = 0; i < properties.length; i += 1) {
    console.log(properties[i] + ': ' + another_stooge[properties[i]]);
}


another_stooge.nickname    // 'Moe'

// Remove nickname from another_stooge, revealing
// the nickname of the prototype.

delete another_stooge.nickname;

another_stooge.nickname    // 'Curly'


var MYAPP = {};


MYAPP.stooge = {
    "first-name": "Joe",
    "last-name": "Howard"
};
 
MYAPP.flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2004-09-22 14:55",
        city: "Sydney"
    },
    arrival: {
        IATA: "LAX",
        time: "2004-09-23 10:42",
        city: "Los Angeles"
    }
};