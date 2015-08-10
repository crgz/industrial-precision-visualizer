var method = ScoresProcessor.prototype;

function ScoresProcessor(mappings, eventEmitter) {
	this._mappings = mappings;
	this._eventEmitter = eventEmitter;
    this.imageName = '';
    this.sortedLabels = [];
    this.meassures = {};
}
method.process = function(logEntry) {
	if (logEntry.hasImageName()){
		this.imageName = logEntry.getImageName();
	}
	if (logEntry.hasScore()){
		var meassure = this._mappings[this.imageName];
		if( meassure in this.meassures ){		
			console.log('New image-set/series detected');
			var keys = []; // Prepare labels
			for(var key in this.meassures) {
				if(this.meassures.hasOwnProperty(key)) keys.push(key);
			}
			this.sortedLabels = keys.sort();
			this._eventEmitter.emit('labels', this.sortedLabels);							                
			for (var serie = 0; serie < this.sortedLabels.length; ++serie) {//Send Series Message
				var label = this.sortedLabels[serie];
			    console.log(label);
		    	var serieTime = this.meassures[label][0];
		    	var serieScore = this.meassures[label][1];
		    	var serieMessage = [serieTime, serie + 1, serieScore].join();
				this._eventEmitter.emit('message', serieMessage);
			}
		    this.meassures = {};
		} else {
			this.meassures[meassure] = [logEntry.getTime(), logEntry.getScore()];
			console.log('Storing meassure: \''+ meassure + '\' Data: ' +this.meassures[meassure]);
		}	
	}

};

module.exports = ScoresProcessor;
