(function(){


	function EventTarget(){

	}


	EventTarget.prototype =  {
		constructor: EventTarget,
		addListener : function(type,listener){

			//  create an listeners for this event
			if(!this.hasOwnProperty("listeners")){
				this._listeners = [];  //  ?? or {}
			}
			if(typeof this._listeners[type] == "undefined"){
				this._listeners[type] = [];	
			}
			this._listeners[type].push(listener);
			
		},
		fire: function(event){

			if(!event.target){
				event.target = this;
			}

			if(!event.type){
				throw new Error("event must have type");
			}

			if(this._listeners && this._listeners[event.type] instanceof Array){
				var listeners = this._listeners[event.type];
				for(var i=0;i<listeners.length;i++){
					listeners[i].call(this,event);
				}	
			}
		},
		removeListener: function(type,listener){
			if(this._listeners && this._listeners[type] instanceof Array){
				var listeners = this._listeners[type];
				for(var i=0;i<listeners.length;i++){
					if(listeners[i] === listener){
						listeners.splice(i,1);
						break;	
					}
				}	
			}
		}

	};


	var eventTarget1 = new EventTarget();
	eventTarget1.addListener("message",function(event){
		console.log("data is: " + event.data);
	});
	eventTarget1.fire({
		type: "message",
		data: "good"
	});

}());