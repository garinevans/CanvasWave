var Glug = Glug || {};

Glug.Config = {
	drawWirefreame: false
}

Glug.DrawingArea = function (w,h){
	this.width = w;
	this.height = h;
}

Glug.Wave = function (d){
	this.drawingArea = d;
	
	this.angle = 0;

	//the height of the wave
	this.radius = 100;

	//center y position of each circle
	this.cy = 300;

	//bottom of our wave
	this.startY = this.cy + 200;
	//start x position
	this.startX = -this.radius;

	//distance between each point
	this.distanceBetweenPoints = 100;
	//calculated based on distance between points and canvas.width
	this.numberOfPoints = Math.ceil((this.drawingArea.width + this.radius * 2 + (-this.startX) - 10) / this.distanceBetweenPoints);
	var test = (this.radius);
	console.log(test);

	//get a point given an angle and distance to the left
	this.getPoint = function(angle, x){
		var radians = angle * Math.PI / 180;

		var adjacent = Math.cos(radians) * this.radius + x;
		var opposite = Math.sin(radians) * this.radius + this.cy;
		
		return {
			x: adjacent,
			y: opposite,
			cx: x,
			cy: this.cy
		}
	};

	this.drawPoint = function(context, point){
		context.beginPath();
		context.moveTo(point.cx, point.cy);

		context.lineTo(point.x, point.y);
		context.stroke();
	};

}

Glug.Wave.prototype.showSkeleton = function(context) {
	context.clearRect(0, 0, this.drawingArea.width, this.drawingArea.height);

	context.strokeStyle = "black";

	var x = 100;
	var points = [];
	for(var i = 0; i < 10; i++){
		var point = this.getPoint(this.angle - i * 20, x);
		x += 100;

		points.push(point);
	}

	var wave = this;
	//draw the wireframe
	points.forEach(function(point){
		wave.drawPoint(context, point);
	});
	
	//draw the wave - connect the dots
	context.beginPath();
	points.forEach(function(point){
		context.lineTo(point.x, point.y);
	});

	context.stroke();

	this.angle += 1;

}

Glug.Wave.prototype.run = function(context) {
	context.clearRect(0, 0, this.drawingArea.width, this.drawingArea.height);

	context.strokeStyle = "black";
	context.fillStyle = "#9AE2FF";

	var x = this.startX;
	var points = [];
	
	for(var i = 0; i < this.numberOfPoints; i++){
		var point = this.getPoint(this.angle - i * 20, x);
		x += this.distanceBetweenPoints;

		points.push(point);
	}
	
	context.beginPath();
	var firstPoint = points[0];
	context.moveTo(firstPoint.x, this.startY);
	
	//draw the wave - connect the dots
	points.forEach(function(point){
		context.lineTo(point.x, point.y);
	});

	var lastPoint = points[points.length - 1];
	context.lineTo(lastPoint.x, this.startY);

	context.stroke();
	context.fill();

	if(Glug.Config.drawWirefreame){
		//draw the wireframe
		var wave = this;
		points.forEach(function(point){
			wave.drawPoint(context, point);
		});
	}

	this.cy -= 0.1;
	this.angle += 1;

}


