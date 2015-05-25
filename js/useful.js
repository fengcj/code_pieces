// How to implement exthend in js
// Leran from createjs
var createjs = {};
 /* @method extend
 * @param {Function} subclass The subclass.
 * @param {Function} superclass The superclass to extend.
 * @return {Function} Returns the subclass's new prototype.
 */
createjs.extend = function(subclass, superclass) {
	"use strict";

	function O() {
		this.constructor = subclass;
	}
	O.prototype = superclass.prototype;
	return (subclass.prototype = new O());  // return the prototype of subclass
};


// define private method by adding underscore before the method name

function Person(age, name) {
	this.age = age;
	this.name = name;

	// private, but it is just a sign, still can be get from outside
	this._isAdult = function () {
		console.log(this.age);
		return this.age > 18 ? true : false;
	}

	this.addCommont = function() {
		if (this._isAdult()) {
			this.name += " can drink";
		}
	};
}

var p1 = new Person(15, "tom");
var p2 = new Person(45, "tony");
p1.addCommont();
p2.addCommont();
console.log(p1.name);
console.log(p2.name);



// find a method is exist,then use it
if(Object.getPrototypeOf && Object.getPrototypeOf(Person)){
	console.log(Person.prototype);
	console.log(Object.getPrototypeOf(Person));
}


// set the value of object
function Obj(){};
var p = Obj.prototype;
p.set = function(values){
	for(key in values){
		this[key] = values[key]
	}
}
var obj1 = new Obj();
obj1.set({x:3,y:55,getX:function(){
	return this.x;
}});

console.log(obj1.x);
console.log(obj1.getX());

/*var obj2 = {};
var p2 = Object.getPrototypeOf(obj2);
console.log(obj2);
console.log(p2);*/


 /* @method promote
 * @param {Function} subclass The class to promote super class methods on.
 * @param {String} prefix The prefix to add to the promoted method names. Usually the name of the superclass.
 * @return {Function} Returns the subclass.
 */
createjs.promote = function(subclass, prefix) {
	"use strict";

	var subP = subclass.prototype, supP = (Object.getPrototypeOf&&Object.getPrototypeOf(subP))||subP.__proto__;
	if (supP) {
		subP[(prefix+="_") + "constructor"] = supP.constructor; // constructor is not always innumerable
		for (var n in supP) {
			if (subP.hasOwnProperty(n) && (typeof supP[n] == "function")) { subP[prefix + n] = supP[n]; }
		}
	}
	return subclass;
};

