Function.prototype.method = function(name, func) {
	if (!this.prototype[name]) {
		this.prototype[name] = func;
	}
	return this;
};

Function.method('new', function() {
	// 创建一个新对象，继承自构造器函数的原型对象
	var that = Object.call(this.prototype);

	// 调用构造器函数，绑定-this-到新对象上
	var other = this.apply(that, arguments);

	// 如果它的返回值不是一个对象，就返回新对象
	return (typeof other === 'object' && other) || that;
});

var Mammal = function(name) {
	this.name = name;
};
Mammal.prototype.get_name = function() {
	return this.name;
};
Mammal.prototype.says = function() {
	return this.saying || '';
};

var myMammal = new Mammal('Herb the Mammal');
var name = myMammal.get_name();
print(name);
print('----------------------');

var Cat = function(name) {
	this.name = name;
	this.saying = 'meow';
};
Cat.prototype = new Mammal();
Cat.prototype.purr = function(n) {
	var s = '';
	for (var i = 0; i < n; i += 1) {
		if (s) {
			s += '-';
		}
		s += 'r';
	}
	return s;
};
Cat.prototype.get_name = function() {
	return this.says() + ' ' + this.name + ' ' + this.says();
};

var myCat = new Cat('Henrietta');
var says = myCat.says(); // meow
var purr = myCat.purr(5);
var name = myCat.get_name();
print('says:' + says + ',purr:' + purr + ',name:' + name);
print('----------------------');

Function.method('inherits', function(Parent) {
	this.prototype = new Parent();
	return this;
});

var Cat = function(name) {
	this.name = name;
	this.saying = 'meow';
}.inherits(Mammal).method('purr', function(n) {
	var s = '';
	for (var i = 0; i < n; i += 1) {
		if (s) {
			s += '-';
		}
		s += 'r';
	}
	return s;
}).method('get_name', function() {
	return this.says() + ' ' + this.name + ' ' + this.says();
});
var myCat = new Cat('Henrietta');
var says = myCat.says(); // meow
var purr = myCat.purr(5);
var name = myCat.get_name();
print('says:' + says + ',purr:' + purr + ',name:' + name);
print('----------------------');

Object.create = function(o) {
	var F = function() {
	};
	F.prototype = o;
	return new F();
};

var myMammal = {
	name : 'Herb the Mammal',
	get_name : function() {
		return this.name;
	},
	says : function() {
		return this.saying;
	}
};

var myCat = Object.create(myMammal);
myCat.name = 'Henrietta';
myCat.saying = 'meow';
myCat.purr = function(n) {
	var s = '';
	for (var i = 0; i < n; i += 1) {
		if (s) {
			s += '-';
		}
		s += 'r';
	}
	return s;
};
myCat.get_name = function() {
	return this.says() + ' ' + this.name + ' ' + this.says();
};
print('says:' + myCat.says() + ',purr:' + myCat.purr(4) + ',name:'
		+ myCat.get_name());
print('----------------------');

var mammal = function(spec) {
	var that = {};

	that.get_name = function() {
		return spec.name;
	};

	that.says = function() {
		return spec.saying || '';
	};
	return that;
};

var myMammal = mammal({
	name : 'Herb'
});
print(myMammal.get_name());

var cat = function(spec) {
	spec.saying = spec.saying || 'meow';
	var that = mammal(spec);
	that.purr = function(n) {
		var s = '';
		for (var i = 0; i < n; i += 1) {
			if (s) {
				s += '-';
			}
			s += 'r';
		}
		return s;
	};
	that.get_name = function() {
		return this.says() + ' ' + spec.name + ' ' + this.says();
	};
	return that;
};
var myCat = cat({
	name : "Henrietta"
});
print('purr:' + myCat.purr(4) + ',name:' + myCat.get_name());
print('----------------------');

Object.method('superior', function(name) {
	var that = this;
	var method = that[name];
	return function() {
		return method.apply(that, arguments);
	};
});

var coolcat = function(spec) {
	var that = cat(spec);
	var super_get_name = that.superior('get_name');
	that.get_name = function(n) {
		return 'like ' + super_get_name() + ' baby';
	};
	return that;
};
var myCoolCat = coolcat({
	name : 'Bix'
});
var name = myCoolCat.get_name();
print('name:' + name);

var eventually = function(that) {
	var registry = {};

	// 在一个对象上触发一个事件，该事件可以是一个包含事件名称的字符串
	// 或者是一个扔有包含事件名的type属性的对象
	// 通过'on'方法注册的事件处理程序中匹配事件名称的函数将被调用
	that.fire = function(event) {
		var array, func, handler, i;
		var type = typeof event === 'string' ? event : event.type;

		if (registry.hasOwnProperty(type)) {
			array = registry[type];
			for (i = 0; i < array.length; i++) {
				handler = array[i];

				func = handler.method;
				if (typeof func === 'string') {
					func = this[func];
				}

				func.apply(this, ahndler.parameters || [ event ]);
			}
		}
		return this;
	};

	that.on = function(type, method, parameters) {
		var handler = {
			method : method,
			parameters : parameters
		};
		if (registry.hasOwnProperty(type)) {
			registry[type].push(handler);
		} else {
			registry[type] = [ handler ];
		}
		return this;
	};
	return that;
};
