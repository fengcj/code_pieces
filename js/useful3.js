(function(){

	"use strict";

	function printName(label){
		console.log(label + " The name is: " + this.name);
	}

	var p1 = {name: "igt"};

	printName.call(p1,"CRDC");
	// the apply method can accept an array or array-like object as parameter to pass to function to be execute
	printName.apply(p1,["CRDC"]);
	printName.apply(p1,{0:"CRDC",length:1});


	var p2 = {name: "gtech"};

	var newPrintName = printName.bind(p1);
	
	newPrintName.call(null,"CRDC");

	var p2 = {address: "China"};
	console.log(delete p2.name);  // true
	console.log(delete p2.name);  // true
	console.log(delete p2.toString);

	console.log(p2.toString);


	var p3 = {
		name: "igt",
		address: "China"
	};

	for(var property in p3){
		console.log(p3[property]);
	}

	function f1(){}
	f1.prototype.name = "igt";
	console.log(Object.keys(f1));  //  []
	console.log(f1.name);
	console.log(f1.length);
	for(var property in f1){
		console.log("---->" + f1[property]);
	}


	//  getter and setter
	var person1 = {
		_name : "igt",
		get name(){
			console.log("get name");
			return this._name;
		},
		set name(name){
			console.log("set name");
			this._name = name;
		}
	};

	console.log(person1.name);
	person1.name = "crdc";
	console.log(person1.name);
	// still can get _name
	console.log(person1._name);

	delete person1.name;
	console.log("======>>>" + person1.name);


	// define property using Object.defineProperty()
	var p4 = {
		name: "igt"
	};

	console.log("name" in p4);  // true

	console.log(p4.propertyIsEnumerable("name"));  //  true

	Object.defineProperty(p4,"name",{
		enumerable: false
	});

	console.log("name" in p4);  //  true

	for(var property in p4){
		console.log("p4 has property: " + property);
	}

	console.log(p4.propertyIsEnumerable("name"));  // false


	Object.defineProperty(p4,"name",{
		configurable: false
	});

	try{
		Object.defineProperty(p4,"name",{
			configurable: true
		});
	}catch(e){
		console.log("can not redefined a property which is nonconfigurable");
	}


	// Data Property Attributes

	var p5 = {
		name : "igt"
	};

	var p5 = {};
	Object.defineProperty(p5,"name",{
		value: "igt",
		enumerable: true,
		configurable: true,
		writable: true
	});


	// Define multiple Properties
	var p6 = {};
	Object.defineProperties(p6,{

		_name: {
			value: "igt",
			enumerable: true,
			configurable: true,
			writable: true
		},

		name:{
			get: function(){
				console.log("get the name of p6");
				return this._name;
			},
			set: function(name){
				console.log("set the name of p6");
				this._name = name
			},
			enumerable: true,
			configurable: true
		}

	});

	p6.name = "crdc";




	var p7 = {name: "igt"};
	var descriptor = Object.getOwnPropertyDescriptor(p7,"name");
	console.log(descriptor.value);  // true
	console.log(descriptor.configurable);  //  true
	console.log(descriptor.writable);  //  true
	console.log(descriptor.enumerable);  //  true



	//  prevent extension 

	// 1) using Object.preventExtensions()
	var p8 = {name: "igt"};
	console.log(Object.isExtensible(p8));  // true
	Object.preventExtensions(p8);
	console.log(Object.isExtensible(p8));  // false
	// after using Object.preventExtensions(), the property still can be modify
	p8.name = "crdc";
	console.log(p8.name);
	// but can not add new property
//	p8.age = 33;  // throw an error in strict model
	console.log("age" in p8);  // false
	// and can delete property which already existed
	delete p8.name;
	console.log("name" in p8);  // false
	console.log(p8.name);  //  undefined


	// 2) using Object.seal()
	var p9 = {name: "igt"};
	Object.seal(p9);
//	delete p9.name;  // can not delete property, throw an error in strict model
	console.log("name" in p9);  //  true
	console.log(Object.getOwnPropertyDescriptor(p9,"name").configurable);  // false
	p9.name = "crdc";  //  can change the value
	console.log(p9.name);  //  crdc

	// 3) using Object.freeze()
	var p10 = {name: "igt"};
	Object.freeze(p10);
//	p10.name = "crdc";  //  can not change the value of a property, throw an error in strict model
	console.log(p10.name);  // igt








}());



(function(){
	// new Operator
	// "use strict";
	function Student(name){
		this.name = name || "igt";
		this.setAge = function(age){
			this.age = age;
		}

		//  return {};  // when the constructor return an object, this obejct will instead of the newly created object instance
		//  return 3;  // when the constructor return an primitive value,the newly created object will be used, and the primitive will be ignore
	}

	//
	var s1 = new Student("crdc");  // `new` Operator will return the newly created object
	var s2 = new Student;  // when use `new` operator without passing parameter, we can omit the parentheses
	var s3 = Student("abcdef");  //  this expression means we call the `Student` function, 
							   //  passing its return value to p3, while in this function, there is no return value, so p3 will be `undefined`, and `this`
							   //  will pointer to global. When in strict model, call `Student` constructor without `new` opepator will cause an error, 
							   //  because in strict model, `this` will not be assigned to global object, `this` remains undefined, and an error occurs  
							   //  whenever you attempt to create a property on undefined
	console.log(s1);  //  {name: "crdc", setAge: [Function]}
	console.log(s2);  //  {name: "igt", setAge: [Function]}
	console.log(s3);  //  undefined
	console.log(name);  // abcdef


}());





(function (){
	"use strict";
	// Prototype
	for(var property in {}){
		console.log(property);
	}

	var Person = function(name){
		this.name = name || "igt";
	};
	Person.prototype.sayName = function(){
		console.log(this.name);
	}
	var p1 = new Person("crdc");
	var p2 = new Person();
	// When you create a new object using `new` operator, 
	// the constructor’s prototype property is assigned to the [[Prototype]] property of that new object.
	console.log(Object.getPrototypeOf(p1) == Person.prototype);  //  true
	console.log(Object.getPrototypeOf(p2) == Person.prototype);  //  true


	var object = {};
	var prototype = Object.getPrototypeOf(object);
	// For any generic object like `object` up, [[Prototype]] is always reference to Object.prototype
	console.log(prototype == Object.prototype);  //  true

	console.log(Object.prototype.isPrototypeOf(object));  // true

/*	Object.prototype.toString = function(){
		console.log("can be?");
		return "can be!!!";
	}
	console.log(object.toString());*/

}());

(function(){

	console.log("about constructor");
	var p1 = {};
	console.log(p1.constructor);  //  [Function: Object]
	console.log(p1.hasOwnProperty("constructor"));  //  false


	console.log(Object.prototype.isPrototypeOf(p1));  //  true
	console.log(Object.prototype.hasOwnProperty("constructor"));  // true



	function Person(name){
		this.name = name;
	}

	var p2 = new Person("igt");
	console.log(p2.constructor);  //  [Function: Person]
	console.log(p2.hasOwnProperty("constructor"));  //  false

	console.log(p2.prototype);  //  undefined
	console.log(Person.prototype.constructor);  //  [Function: Person]

	console.log(Object.prototype.isPrototypeOf(Person.prototype));  //  true

	console.log(Object.getPrototypeOf(Person));  //  [Function: Empty] ??

	p2.__proto__.toString = function(){
		return "can this work by adding method on __proto__";
	}

	Person.prototype.toString = function(){
		return "can this work by adding method on prototype?"
	}

	console.log(p2.toString()); // can this be work by adding method on prototype



}());


(function(){

	console.log("about console.log() method");

	function Person(name){
		this.name = name;
	}

	var p2 = new Person("igt");

	p2.__proto__.toString = function(){
		return "can this work by adding method on __proto__";
	}

	Person.prototype.toString = function(){
		return "can this work by adding method on prototype?"
	}

	console.log(p2);  //  {name: "igt"}, which method is called? I guess the console.log() method has its own logic to process the object passing in
	console.log(p2.toString()); // can this be work by adding method on prototype
	console.log(Object);  //  [Function: Object]
	console.log(Object.toString());  // function Object() {[native code]}
}());


(function(){

	console.log("about [[Prototype]]");

	function Person(name){
		this.name = name;
	}

/*	Person.__proto__.toString = function(){
		return "******";
	}*/

	console.log(Person.toString());
	var originToString = Function.prototype.toString;
	Function.prototype.toString = function(){
		return "&&&&&";
	}
	console.log(Person.toString());
	console.log(Object.getPrototypeOf(Person).hasOwnProperty("toString"));  //  true
	// this means when we define a function, it is an object absolutely, so it has an internal property [[Property]],
	// and [[Property]] of this function is point to Function.prototype
	console.log(Object.getPrototypeOf(Person)=== Function.prototype);  //  true

	console.log(Object.getPrototypeOf([]) === Array.prototype);  //  true

	Function.prototype.toString = originToString;
	console.log(Person.toString());

}());


(function(){
	// `exports` is the global variable in server js.
	console.log(this == exports);  //  true
	console.log(JSON.stringify(exports)); //  {}
	console.log(this);  //  {}
	console.log(typeof module);  //  object
	console.log(JSON.stringify(module));
	console.log("exports" in module);  //  true



	console.log(global);
	console.log(process);
	console.log(console);


}.call(this));


