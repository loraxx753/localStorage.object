/**
 * The HTML5 localStorage feature only saves strings. So how do you save an
 * object, with properties and methods, to localStorage so you can access it
 * between page loads?
 */

/**
 * Takes in an object and turns it into a string
 *
 * Taken from www.davidpirek.com/blog/object-to-string-how-to-deserialize-json‎
 *
 * @param  {object} The object to convert
 * @return {string} The resulting object turned into a string
 */
var objectToString = function(object){
		
		// Initialize the variables
		var array = [], propertyValue;
		
		// Loop through the object's properties
		for(var property in object){
			
			// Check if the object actually has that property
			if(object.hasOwnProperty(property)){
				
				// Get the value of the object's property
				propertyValue = object[property];

				// If the property has a value, and that value is an object
				if(propertyValue && typeof propertyValue == "object"){
					array[array.length]= '"'+property+'"' + ":{" + arguments.callee(propertyValue).join(", ") + "}";
				}
				else {

					// If the property value is a string, then call .toString() on it and wrap it in double quotes.
					if(typeof propertyValue == "string"){
						array[array.length] = [ '"'+property+'"'+ ":\"" + propertyValue.toString() + "\"" ];                 
					}
					// If it's not a string or an object, then just straight up .toString it
					else{
						array[array.length] = [ '"'+property+'"'+ ":" + propertyValue.toString()];
					}
				}
			}
		}

	// Return the parsed object's array joined with commas, and wrapped in curly braces.
	return "{" + array.join(", ") + "}";
};

var saveObject = function(objectName)
{
	// If HTML5's localStorage is available (by checking the Storage object) 
	if(typeof(Storage)!=="undefined")
	{
		// Set that variable to the desired object.
		localStorage[objectName] = objectToString(window[objectName]);
	}
};

var updateObject = function(objectName) {
	// If HTML5's localStorage is available (by checking the Storage object) 
	if(typeof(Storage)!=="undefined")
	{
		// If the localStorage's variable doesn't exist yet.
		if(localStorage[objectName])
		{
			// Since localStorage only saves strings, then add a return before self calling the function.
			var objectHolder = "return "+localStorage[objectName];

			// Set the original variable to localStorage's updated information.
			return (new Function(objectHolder))();
		}
	}
}
