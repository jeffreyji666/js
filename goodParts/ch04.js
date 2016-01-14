var add = function (a, b) {
    return a + b;
};

var myObject = {
    value: 0,
    increment: function (inc) {
        console.log(typeof inc);
        this.value += typeof inc === 'number' ? inc : 1;
        console.log(this.value);
    }
};

myObject.increment();
console.log(myObject.value);
console.log('-------');

myObject.increment(2);
console.log(myObject.value);
console.log('-------');

myObject.double = function () {
    this.value = add(this.value, this.value);
}
myObject.double();
console.log(myObject.value);

myObject.double = function () {
    var that = this;

    var helper = function () {
        that.value = add(that.value, that.value);
    };

    helper();
}

myObject.double();
console.log(myObject.value);
console.log('-------');

var Quo = function (string) {
    this.status = string;
};

Quo.prototype.get_status = function () {
    return this.status;
};

var myQuo = new Quo("confused");
console.log(myQuo.get_status())
console.log('-------');

var array = [3, 4];
var sum = add.apply(null, array);
console.log(sum);

var statusObject = {
    status: 'A-OK'
};

// var status = Quo.prototype.get_status().apply(statusObject);
var status = Quo.prototype.get_status.apply(statusObject);
console.log(status);
console.log('-------');

var sum = function () {
    var sum = 0;
    for (var i = 0; i < arguments.length; i += 1) {
        sum += arguments[i];
    }
    return sum;
};
console.log(sum(4, 8, 15, 112, 34234, 13412, 43));
console.log('-------');

var add = function (a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw {
            name: 'TypeError',
            message: 'add needs numbers'
        };
    }
    return a + b;
}

var try_it = function () {
    try {
        add("seven");
    } catch (e) {
        console.log(e.name + ":" + e.message)
    }
}

try_it();
console.log('-------');

Function.prototype.method = function (name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
    }
    return this;
};

Number.method('integer', function () {
    return Math[this < 0 ? 'ceil' : 'floor'](this);
});

// console.log((-10 / 3).integer);
console.log((-10 / 3).integer());
console.log(Math.ceil(-10 / 3));

String.method('trim', function () {
    return this.replace(/^\s+|\s+$/g, '');
});

console.log('"' + "   neat   ".trim() + '"');
console.log('-------');

var hanoi = function (disc, src, aux, dst) {
    if (disc > 0) {
        hanoi(disc - 1, src, dst, aux);
        console.log('Move disc ' + disc + ' from ' + src + ' to ' + dst);
        hanoi(disc - 1, aux, src, dst);
    }
};

hanoi(3, 'Src', 'Aux', 'Dst');
console.log('-------');

var factorial = function factorial(i, a) {
    a = a || 1;
    if (i < 2) {
        return a;
    }
    return factorial(i - 1, a * i);
}

console.log(factorial(4));
console.log('-------');

var myObject = (function () {
    var value = 0;

    return {
        increment: function (inc) {
            value += typeof inc === 'number' ? inc : 1;
        },
        getValue: function () {
            return value;
        }
    };
}());

myObject.increment(20);
console.log(myObject.getValue());
console.log('-------');

var quo = function (status) {
    return {
        get_status: function () {
            return status;
        }
    };
};

var myQuo = quo("amazed");
console.log(myQuo.get_status());
console.log('-------');

var fade = function (node) {
    var level = 1;
    var step = function () {
        var hex = level.toString(16);
        node += '#FFFF' + hex + hex;
        console.log(node);
        if (level < 15) {
            level += 1;
            step();
        }
    };
    step();
};
fade('test');
console.log('-------');

var add_the_handlers = function (nodes) {
    for (var i = 0; i < nodes.length; i += 1) {
        nodes[i].onclick = function (e) {
            console.log(i);
        };
    }
};

var add_the_handlers = function (nodes) {
    var helper = function (i) {
        return function (e) {
            console.log(i);
        };
    };
    for (var i = 0; i < nodes.length; i += 1) {
        nodes[i].onclick = helper(i);
    }
};

String.method('deentityify', function () {
    var entity = {
        quot: '"',
        lt: '<',
        gt: '>'
    };
    return function () {
        return this.replace(/&([^&;]+);/g, function (a, b) {
            console.log(a + "::" + b);
            var r = entity[b];
            return typeof r === 'string' ? r : a;
        });
    };
}());
console.log('&lt;&quot;&gt;'.deentityify());
console.log('-------');

var serial_maker = function () {
    var prefix = '';
    var seq = 0;
    return {
        set_prefix: function (p) {
            prefix = String(p);
        },
        set_seq: function (s) {
            seq = s;
        },
        gensym: function () {
            var result = prefix + seq;
            seq += 1;
            return result;
        }
    };
};

var seqer = serial_maker();
seqer.set_prefix('Q');
seqer.set_seq(10000);
var unique = seqer.gensym();
console.log(unique);
console.log('-------');

Function.method('curry', function () {
    var slice = Array.prototype.slice;
    var args = slice.apply(arguments);
    var that = this;

    return function () {
        return that.apply(null, args.concat(slice.apply(arguments)));
    };
});

var add1 = add.curry(1);
console.log(add1(6));
console.log('-------');

var fibonacci = function () {
    var memo = [0, 1];
    var fib = function (n) {
        var result = memo[n];
        if (typeof result !== 'number') {
            result = fib(n - 1) + fib(n - 2);
            memo[n] = result;
        }
        return result;
    };
    return fib;
}();
console.log(fibonacci(10));
console.log('-------');

var memorizer = function (memo, formula) {
    var recur = function (n) {
        var result = memo[n];
        if (typeof result !== 'number') {
            result = formula(recur, n);
            memo[n] = result;
        }
        return result;
    };
    return recur;
};
var fibonacci = memorizer([0, 1], function (recur, n) {
    return recur(n - 1) + recur(n - 2);
});
console.log(fibonacci(10));
console.log('-------');

var factorial = memorizer([1, 1], function (recur, n) {
    return n * recur(n - 1);
});
console.log(factorial(4));
console.log('-------');
