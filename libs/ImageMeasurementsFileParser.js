var util = require('util');
var events = require('events');
var csv = require('ya-csv');

function ImageMeasurementsFileParser() {
	
	events.EventEmitter.call(this);
	
	this.process = function(filePath) {
		
		var reader = csv.createCsvFileReader(filePath);
		var map = {};
		var self = this;
		
		reader.addListener('data', function(data) {
			var imageName = data[2];
			var label = data[4];
			if (!map.hasOwnProperty(imageName) && label) {
				map[imageName] = label;
			}
		});
		
		reader.addListener('end', function() {
			self.emit('end', map);
		});
	}
}

util.inherits(ImageMeasurementsFileParser, events.EventEmitter);
module.exports = ImageMeasurementsFileParser;