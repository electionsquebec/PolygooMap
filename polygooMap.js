/*
*
* PolygooMap v0.1 (Alpha)
* Built by : Directeur général des élection du Québec (Équipe Web)
*
*/

function polygooMap( options ){
	
	//Variables used throughout the function
	var paths,
		isGoogleLatLng = false,
		isSinglePolyArray = false,
		isMultiPolyArray = false,
		bounds = new google.maps.LatLngBounds();
		
	//Variables for the loops
	var x,
		y,
		z;
	
	//Error messages
	var errorPoly = 'Polygon must be an array of coordinates or an array of google maps LatLng.',
		errorFunctionCall = 'Parameter must be an anonymous function.',
		errorFunctionOrObject = 'Parameter must be an object or an anonymous function.';
	
	//Default values
	var settings = $.extend({
		polygons:[
			[new google.maps.LatLng(50,-70),new google.maps.LatLng(48, -70),new google.maps.LatLng(48, -75),new google.maps.LatLng(50, -75)],
			[new google.maps.LatLng(47,-70),new google.maps.LatLng(45, -70),new google.maps.LatLng(45, -75),new google.maps.LatLng(47, -75)]
		],
		fillColor: '#C5FF5E',
		fillOpacity: 0.3,
		strokeWeight: 1,
		strokeOpacity: 0.7,
		strokeColor: '#000000',
		onClick: null,
		onMouseOver: null,
		onMouseOut: null,
		clickable: true,
		draggable: false,
		editable: false,
		visible: true,
		zIndex: 1,
		map: null
	}, options);
	
	//Check if map is set to something
	if(!settings.map){
		throw new Error('Function must have a map defined.');
	}else if(typeof settings.map != 'object'){
		throw new Error('Map must be a google map object.');
	}
	
	//Verify if polygon is an array
	if(settings.polygons instanceof Array){
		
		//Loop through array to check if the array contains google maps LatLng or actual coordinates
		for(x = 0; x < settings.polygons.length; x++){
		
			if(settings.polygons[x] instanceof Array){
				
				for(y = 0; y < settings.polygons[x].length; y++){
				
					if(settings.polygons[x][y] instanceof Array){
					
						for(z = 0; z < settings.polygons[x][y].length; z++){
							
							if(typeof settings.polygons[x][y][z] != 'number'){
								throw new Error(errorPoly);
							}else{
								isMultiPolyArray = true;
							}
							
						}
						
					}else{
					
						if(typeof settings.polygons[x][y] == 'object'){
						
							if(settings.polygons[x][y].lat() && settings.polygons[x][y].lng()){
								isGoogleLatLng = true;
							}
							
						}else{
						
							if(typeof settings.polygons[x][y] != 'number'){
								throw new Error(errorPoly);
							}else{
								isSinglePolyArray = true;
							}
							
						}
						
					}
					
				}
				
			}else{
				
				if(typeof settings.polygons[x] == 'object'){
				
					if(settings.polygons[x].lat() && settings.polygons[x].lng()){
						isGoogleLatLng = true;
					}
					
				}else{
				
					throw new Error(errorPoly);
					
				}
				
			}
			
		}
		
		if(isGoogleLatLng){
		
			paths = settings.polygons;
			
		}else{
		
			if(isSinglePolyArray){
				
				for(x = 0; x < settings.polygons.length; x++){
					settings.polygons[x] = new google.maps.LatLng(settings.polygons[x][0], settings.polygons[x][1]);
				}
				
			}else if(isMultiPolyArray){
				
				for(x = 0; x < settings.polygons.length; x++){
					for(y = 0; y < settings.polygons[x].length; y++){
						settings.polygons[x][y] = new google.maps.LatLng(settings.polygons[x][y][0], settings.polygons[x][y][1]);
					}
				}
				
			}
			
			paths = settings.polygons;
			
		}
			
	}else{
	
		throw new Error(errorPoly);
		
	}
	
	//Get bounds rectangle that includes the whole polyon
	for(x = 0; x < settings.polygons.length; x++){
		if(settings.polygons[x] instanceof Array){
			for(y = 0; y < settings.polygons[x].length; y++){
				bounds.extend(settings.polygons[x][y]);
			}
		}else{
			bounds.extend(settings.polygons[x]);
		}
	}
	
	//Create polygon
	this.polygooMap = new google.maps.Polygon({
		paths: paths,
		strokeColor: settings.strokeColor,
		strokeOpacity: settings.strokeOpacity,
		strokeWeight: settings.strokeWeight,
		fillOpacity: settings.fillOpacity,
		fillColor: settings.fillColor,
		clickable: settings.clickable,
		draggable: settings.draggable,
		editable: settings.editable,
		visible: settings.visible
	});
	
	
	//Assign it to the map
	this.polygooMap.setMap(settings.map);
	
	//Setting the onClick event
	if(settings.onClick){
	
		//Check if onClick event is a function
		if($.isFunction(settings.onClick)){
			google.maps.event.addListener(this.polygooMap, 'click', function(e){
				settings.onClick.call(this, e);
			});
		
		//Check if onClick event an object
		}else if(typeof settings.onClick == 'object'){
			
			var onClickSettings = $.extend({
				fillColor: settings.fillColor,
				fillOpacity: settings.fillOpacity,
				strokeWeight: settings.strokeWeight,
				strokeOpacity: settings.strokeOpacity,
				strokeColor: settings.strokeColor
			}, settings.onClick);
			
			google.maps.event.addListener(this.polygooMap, 'click', function(e){
				this.setOptions({
					fillColor: onClickSettings.fillColor,
					fillOpacity: onClickSettings.fillOpacity,
					strokeWeight: onClickSettings.strokeWeight,
					strokeOpacity: onClickSettings.strokeOpacity,
					strokeColor: onClickSettings.strokeColor
				});
			});
		}else{
			throw new Error(errorFunctionOrObject);
		}
	}
	
	//Setting the onMouseOver event
	if(settings.onMouseOver){
		
		//Check if onMouseOver event is a function
		if($.isFunction(settings.onMouseOver)){
			google.maps.event.addListener(this.polygooMap, 'mouseover', function(e){
				settings.onMouseOver.call(this, e);
			});
		
		//Check if onMouseOver event an object
		}else if(typeof settings.onMouseOver == 'object'){
			
			var onMouseOverSettings = $.extend({
				fillColor: settings.fillColor,
				fillOpacity: settings.fillOpacity,
				strokeWeight: settings.strokeWeight,
				strokeOpacity: settings.strokeOpacity,
				strokeColor: settings.strokeColor
			}, settings.onMouseOver);
			
			google.maps.event.addListener(this.polygooMap, 'mouseover', function(e){
				this.setOptions({
					fillColor: onMouseOverSettings.fillColor,
					fillOpacity: onMouseOverSettings.fillOpacity,
					strokeWeight: onMouseOverSettings.strokeWeight,
					strokeOpacity: onMouseOverSettings.strokeOpacity,
					strokeColor: onMouseOverSettings.strokeColor
				});
			});
		}else{
			throw new Error(errorFunctionOrObject);
		}
	}
	
	//Setting the onMouseOut event
	if(settings.onMouseOut){
	
		//Check if onMouseOut event is a function
		if($.isFunction(settings.onMouseOut)){
			google.maps.event.addListener(this.polygooMap, 'mouseout', function(e){
				settings.onMouseOut.call(this, e);
			});
			
		//Check if onMouseOut event an object
		}else if(typeof settings.onMouseOut == 'object'){
			
			var onMouseOutSettings = $.extend({
				fillColor: settings.fillColor,
				fillOpacity: settings.fillOpacity,
				strokeWeight: settings.strokeWeight,
				strokeOpacity: settings.strokeOpacity,
				strokeColor: settings.strokeColor
			}, settings.onMouseOut);
			
			google.maps.event.addListener(this.polygooMap, 'mouseout', function(e){
				this.setOptions({
					fillColor: onMouseOutSettings.fillColor,
					fillOpacity: onMouseOutSettings.fillOpacity,
					strokeWeight: onMouseOutSettings.strokeWeight,
					strokeOpacity: onMouseOutSettings.strokeOpacity,
					strokeColor: onMouseOutSettings.strokeColor
				});
			});
		}else{
			throw new Error(errorFunctionOrObject);
		}
	}
	
	//Callable click object that changes the onclick event
	this.onClick = function(e){
		if($.isFunction(e)){
			google.maps.event.clearListeners(this.polygooMap, 'click');
			google.maps.event.addListener(this.polygooMap, 'click', function(g){
				e.call(this, g);
			});
		}else{
			throw new Error(errorFunctionCall);
		}
	};
	
	//Callable mouseOver object that changes the onMouseOver event
	this.onMouseOver = function(e){
		if($.isFunction(e)){
			google.maps.event.clearListeners(this.polygooMap, 'mouseover');
			google.maps.event.addListener(this.polygooMap, 'mouseover', function(g){
				e.call(this, g);
			});
		}else{
			throw new Error(errorFunctionCall);
		}
	};
	
	//Callable mouseOut object that changes the onMouseOut event
	this.onMouseOut = function(e){
		if($.isFunction(e)){
			google.maps.event.clearListeners(this.polygooMap, 'mouseout');
			google.maps.event.addListener(this.polygooMap, 'mouseout', function(g){
				e.call(this, g);
			});
		}else{
			throw new Error(errorFunctionCall);
		}
	};
	
	//Shows the polygon if hidden
	this.show = function(){
		this.polygooMap.setVisible(true);
	};
	
	//Hides the polygon if shown
	this.hide = function(){
		this.polygooMap.setVisible(false);
	};
	
	//Checks if polygon is hidden/shown
	this.isVisible = function(){
		return this.polygooMap.getVisible();
	};
	
	//Allows direct access to google polygon object
	this.getRawPoly = function(){
		return this.polygooMap;
	};
	
	//Allows changes to the polygons' color
	this.setFillColor = function(options){
		
		var colorSettings = $.extend({
			color: settings.fillColor,
			opacity: settings.fillOpacity
		}, options);
		
		this.polygooMap.setOptions({
			fillColor: colorSettings.color,
			fillOpacity: colorSettings.opacity
		});
	};
	
	//Allows changes to the polygons' borders
	this.setStroke = function(options){
		
		var colorSettings = $.extend({
			weight: settings.strokeWeight,
			color: settings.strokeColor,
			opacity: settings.strokeOpacity
		}, options);
		
		this.polygooMap.setOptions({
			strokeWeight: colorSettings.weight,
			strokeColor: colorSettings.color,
			strokeOpacity: colorSettings.opacity
		});
		
	};
	
	//Returns min/max bounds of the polygon
	this.getMaxBounds = function(){
		return bounds;
	};
	
	//Returns the center of the polygon
	this.getCenter = function(){
		return bounds.getCenter();
	};
	
	return this;
	
}
 
