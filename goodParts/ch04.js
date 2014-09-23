var add = function(a, b) {
	return a + b;
};

var myObject = {
	value : 0,
	increment : function(inc) {
		print(typeof inc);
		this.value += typeof inc === 'number' ? inc : 1;
	}
};

myObject.increment();
print(myObject.value);

myObject.increment(2);
print(myObject.value);
print('-------');

myObject.double = function() {
	this.value = add(this.value, this.value);
}
myObject.double();
print(myObject.value);

myObject.double = function() {
	var that = this;

	var helper = function() {
		that.value = add(that.value, that.value);
	};

	helper();
}

myObject.double();
print(myObject.value);
print('-------');

var Quo = function(string) {
	this.status = string;
};

Quo.prototype.get_status = function() {
	return this.status;
};

var myQuo = new Quo("confused");
print(myQuo.get_status())
print('-------');

var array = [ 3, 4 ];
var sum = add.apply(null, array);
print(sum);

var statusObject = {
	status : 'A-OK'
};

// var status = Quo.prototype.get_status().apply(statusObject);
var status = Quo.prototype.get_status.apply(statusObject);
print(status);
print('-------');

var sum = function() {
	var sum = 0;
	for (var i = 0; i < arguments.length; i += 1) {
		sum += arguments[i];
	}
	return sum;
};
print(sum(4, 8, 15, 112, 34234, 13412, 43));
print('-------');

var add = function(a, b) {
	if (typeof a !== 'number' || typeof b !== 'number') {
		throw {
			name : 'TypeError',
			message : 'add needs numbers'
		};
	}
	return a + b;
}

var try_it = function() {
	try {
		add("seven");
	} catch (e) {
		print(e.name + ":" + e.message)
	}
}

try_it();
print('-------');

Function.prototype.method = function(name, func) {
	if (!this.prototype[name]) {
		this.prototype[name] = func;
	}
	return this;
};

Number.method('integer', function() {
	return Math[this < 0 ? 'ceil' : 'floor'](this);
});

// print((-10 / 3).integer);
print((-10 / 3).integer());
print(Math.ceil(-10 / 3));

String.method('trim', function() {
	return this.replace(/^\s+|\s+$/g, '');
});

print('"' + "   neat   ".trim() + '"');
print('-------');

var hanoi = function(disc, src, aux, dst) {
	if (disc > 0) {
		hanoi(disc - 1, src, dst, aux);
		print('Move disc ' + disc + ' from ' + src + ' to ' + dst);
		hanoi(disc - 1, aux, src, dst);
	}
};

hanoi(3, 'Src', 'Aux', 'Dst');
print('-------');

var factorial = function factorial(i, a) {
	a = a || 1;
	if (i < 2) {
		return a;
	}
	return factorial(i - 1, a * i);
}

print(factorial(4));
print('-------');

var myObject = (function() {
	var value = 0;

	return {
		increment : function(inc) {
			value += typeof inc === 'number' ? inc : 1;
		},
		getValue : function() {
			return value;
		}
	};
}());

myObject.increment(20);
print(myObject.getValue());
print('-------');

var quo = function(status) {
	return {
		get_status : function() {
			return status;
		}
	};
};

var myQuo = quo("amazed");
print(myQuo.get_status());
print('-------');

var fade = function(node) {
	var level = 1;
	var step = function() {
		var hex = level.toString(16);
		node += '#FFFF' + hex + hex;
		print(node);
		if (level < 15) {
			level += 1;
			step();
		}
	};
	step();
};
fade('test');
print('-------');

var add_the_handlers = function(nodes) {
	for (var i = 0; i < nodes.length; i += 1) {
		nodes[i].onclick = function(e) {
			print(i);
		};
	}
};

var add_the_handlers = function(nodes) {
	var helper = function(i) {
		return function(e) {
			print(i);
		};
	};
	for (var i = 0; i < nodes.length; i += 1) {
		nodes[i].onclick = helper(i);
	}
};

String.method('deentityify', function() {
	var entity = {
		quot : '"',
		lt : '<',
		gt : '>'
	};
	return function() {
		return this.replace(/&([^&;]+);/g, function(a, b) {
			print(a + "::" + b);
			var r = entity[b];
			return typeof r === 'string' ? r : a;
		});
	};
}());
print('&lt;&quot;&gt;'.deentityify());
print('-------');

var serial_maker = function() {
	var prefix = '';
	var seq = 0;
	return {
		set_prefix : function(p) {
			prefix = String(p);
		},
		set_seq : function(s) {
			seq = s;
		},
		gensym : function() {
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
print(unique);
print('-------');

Function.method('curry', function() {
	var slice = Array.prototype.slice;
	var args = slice.apply(arguments);
	var that = this;

	return function() {
		return that.apply(null, args.concat(slice.apply(arguments)));
	};
});

var add1 = add.curry(1);
print(add1(6));
print('-------');

var fibonacci = function() {
	var memo = [ 0, 1 ];
	var fib = function(n) {
		var result = memo[n];
		if (typeof result !== 'number') {
			result = fib(n - 1) + fib(n - 2);
			memo[n] = result;
		}
		return result;
	};
	return fib;
}();
print(fibonacci(10));
print('-------');

var memorizer = function(memo, formula) {
	var recur = function(n) {
		var result = memo[n];
		if (typeof result !== 'number') {
			result = formula(recur, n);
			memo[n] = result;
		}
		return result;
	};
	return recur;
};
var fibonacci = memorizer([ 0, 1 ], function(recur, n) {
	return recur(n - 1) + recur(n - 2);
});
print(fibonacci(10));
print('-------');

var factorial = memorizer([ 1, 1 ], function(recur, n) {
	return n * recur(n - 1);
});
print(factorial(4));
print('-------');
