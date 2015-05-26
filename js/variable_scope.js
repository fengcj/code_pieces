(function(){

	 "use strict";

	 // when in strict mode, we cann't define a variable without key word "var"
	var name = "igt";

	// name = "igt"; error

}());

(function(){

	// "use strict";

	 // this is OK
	 name = "igt";


}());



(function(){



	var myHealth = 100;

	var decrementHealth = function(){

		console.log(myHealth);  // undefined
		var myHealth = myHealth - 1;
		console.log(myHealth);  // NaN
	}


	decrementHealth();


}());

var master_branch = "master";