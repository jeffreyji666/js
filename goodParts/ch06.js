var is_array = function(value) {
	return Object.prototype.toString().apply(value) === '[object Array]';
};

Function.prototype.method = function(name, func) {
	if (!this.prototype[name]) {
		this.prototype[name] = func;
	}
	return this;
};

Array.method('reduce', function(f, value) {
	for (var i = 0; i < this.length; i++) {
		value = f(this[i], value);
	}
	return value;
});

var data = [ 4, 8, 15, 16, 23, 42 ];

var add = function(a, b) {
	return a + b;
}

var mult = function(a, b) {
	return a * b;
}

var sum = data.reduce(add, 0);
console.log(sum);

var product = data.reduce(mult, 1);
console.log(product);

data.total = function() {
	return this.reduce(add, 0);
}
console.log(data.total());

Array.dim = function(dimension, initial) {
	var a = [], i;
	for (i = 0; i < dimension; i++) {
		a[i] = initial;
	}
	return a;
};

var myArray = Array.dim(10, 0);
console.log(myArray);

Array.matrix = function(m, n, initial) {
	var a, i, j, mat = [];

	for (i = 0; i < m; i++) {
		a = [];
		for (j = 0; j < n; j++) {
			a[j] = initial;
		}
		mat[i] = a;
	}
	return mat;
};

var myMatrix = Array.matrix(4, 4, 2);
console.log(myMatrix[3][3]);

Array.identity = function(n) {
	var i, mat = Array.matrix(n, n, 0);
	for (i = 0; i < n; i++) {
		mat[i][i] = 1;
	}
	return mat;
};

myMatrix = Array.identity(4);
console.log(myMatrix[3][3]);
