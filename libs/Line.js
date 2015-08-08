var method = Line.prototype;

var scorePattern = 'Score: ';

function Line(line) {
    this._line = line;
    this.indexOfImage = -1;
    this.indexOfScore = -1;
    this.imageName = '';
    this.scoreValue = NaN;
}
method.getTime = function() {
	var d = new Date();
	d.setHours(parseInt(this._line.substring(0, 2)));
	d.setMinutes(parseInt(this._line.substring(3, 5)));
	d.setSeconds(parseInt(this._line.substring(6, 8)));
	d.setMilliseconds(parseInt(this._line.substring(9, 12)));	
	return d.getTime();
};
method.hasImageName = function() {
	var imagePattern = 'Loading VisionData';
	this.indexOfImage = this._line.indexOf(imagePattern);
    return this.indexOfImage > -1;
};
method.getImageName = function() {
	if (this.indexOfImage > -1){
		var imageOffset = this._line.lastIndexOf('\\') + 1;
		this.imageName = this._line.substring(imageOffset);
	}
    return this.imageName;
};
method.hasScore = function() {
	this.indexOfScore = this._line.indexOf(scorePattern);
    return this.indexOfScore > -1;
};
method.getScore = function() {
	if (this.indexOfScore > -1){
		var scoreOffset = this.indexOfScore + scorePattern.length;
		this.scoreValue = this._line.substring(scoreOffset, scoreOffset + 4 );	
	}
    return this.scoreValue;
};

module.exports = Line;
