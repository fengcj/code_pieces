## How to write comment about method
 Do it like this:
 
    /**
 	 * @private
 	 * @param {String}       method      HTTP request type: "PUT","GET","POST" or "DELETE"
 	 * @param {String}       url         The URL of the request
 	 * @param {Function | wagerHandlerCallback | revealDetailsHandlerCallback}       successFn       Callback function in case of success
 	 * @param {Function}         errorFn         Callback function in case of error.
 	 * @param {Object|string}        body        The body to be sent in case of POST or PUT
 	 * @param {number}       retries         The number of retries in case of timeout
 	 * @returns {XMLHttpRequest}         The created request object ready to be used.
 	 */

 	function doRequest(method, url, successFn, errorFn, body, retries) {
 		var request = new XMLHttpRequest();
 		retries = retries === undefined ? initialRetries : retries;
 		request.open(method, url);
 		request.setRequestHeader('Accept', 'application/json');
 		request.setRequestHeader('Content-Type', 'application/json');
 		if (authorization) {
 			authorization.authorize(request);
 		}
 		request.onload = function() {
 			if (request.status < 300 && request.status >= 200) {
 				successFn(JSON.parse(request.responseText));
 			} else {
 				if (errorFn) errorFn(this.status, this.responseText);
 			}
 		};
 		request.onerror = function() {
 			errorFn(this.status, this.responseText);
 		};

 		if (retries > 0) {
 			request.ontimeout = function() {
 				doRequest(method, url, successFn, errorFn, body, retries - 1);
 			};
 		} else {
 			request.ontimeout = function() {
 				errorFn('timeout');
 			};
 		}
 		request.timeout = initialTimeout;
 		if (body) {
 			request.send(body);
 		} else {
 			request.send();
 		}
 	}






## Get the parameters of url

        window.location.search