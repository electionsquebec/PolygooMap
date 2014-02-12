PolygooMap
=========

PolygooMap lets you easely create interactive Google Maps with multiple polygons. Developped as a tool to help broadcast general election results for the province of Québec, the library is now available for everyone to use and hopefully improve.

Keep in mind that the library is still and will always be in developpement.

**Website:** [Soon to come](http://www.google.com)

Requirement
---------

* jQuery v1.10 or higher ([available here](https://developers.google.com/speed/libraries/devguide#jquery))
  * The library was developped using version 1.10.2. Although, it may work with earlier versions.
* Google Maps Javascript API v3 ([available here](https://developers.google.com/maps/documentation/javascript/))

Simple example
---------

```javascript
new polygooMap({
	map: map,
	onClick: function(e){
		console.log("onClick event Fired!");
		console.log(e.latLng.lat());
		console.log(e.latLng.lng());
	},
	onMouseOut:{
		fillColor: "#2F3CCE",
		fillOpacity: 0.3,
		strokeWeight: 2,
		strokeOpacity: 1,
		strokeColor: "black"
	},
	onMouseOver:function(e){
		console.log("onMouseOver event Fired!");
		this.setOptions({
			fillColor: "purple",
			fillOpacity: 0.3,
			strokeWeight: 1,
			strokeOpacity: 0.5,
			strokeColor: "red"
		});
	}
});
```

#### For more examples and details on how to use the library head to our [website](http://www.google.com)