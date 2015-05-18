// How to implement exthend in js
// Leran from createjs

createjs.extend = function(subclass,superclass){
	"use strict";
	function O(){
		this.constructor = subclass;
	}
	O.prototype = superclass.prototype;
	return (subclass.prototype = new O());
}


