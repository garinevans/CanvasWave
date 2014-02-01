var Glug = Glug || {};

Glug.DrawingArea = function (w,h){
	this.width = w;
	this.height = h;
}

Glug.Wave = function (d){
	this.height = 100;
	this.drawingArea = d;
	
	this.angle = 0;
	this.radius = 100;

	this.cy = 300;

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

Glug.Wave.prototype.test = function(context, left) {
	//clear the canvas

	context.clearRect(0, 0, this.drawingArea.width, this.drawingArea.height);

	context.strokeStyle = "black";

	context.beginPath();
	context.moveTo(0, this.drawingArea.height);

	context.lineTo(left, this.drawingArea.height);

	//first bezier x,y, second bezier x, y, finish x, y
	context.bezierCurveTo(left, this.drawingArea.height - this.height, 200 + left, 
		this.drawingArea.height - this.height, 200 + left, this.drawingArea.height);

	//x, y of control point, x, y of finish point
	context.quadraticCurveTo(300 + left, this.drawingArea.height - this.height, 400 + left, this.drawingArea.height);

	context.lineTo(this.drawingArea.width, this.drawingArea.height);

	context.stroke();

	context.fillStyle = "blue";
	context.fill();

}

Glug.Wave.prototype.test2 = function(context) {

	var radians = this.angle * Math.PI / 180;
	var cx = 100;
	var cy = 300;
	var opposite = Math.sin(radians) * this.radius + cy;
	var adjacent = Math.cos(radians) * this.radius + cx;

	context.clearRect(0, 0, this.drawingArea.width, this.drawingArea.height);

	context.strokeStyle = "black";

	context.beginPath();
	context.moveTo(cx, cy);

	context.lineTo(adjacent, opposite);
	context.stroke();

	var points = [];

	for(var i = 0; i < 5; i++){
		context.beginPath();
		context.moveTo(cx + 100 * i, cy);

		context.lineTo(adjacent + 100 * i, opposite);

		points.push({
			x: adjacent + 100 * i,
			y: opposite
		});

		points.push({
			x: cx + 100 * i + 50,
			y: cy
		});

		context.stroke();
	}

	//draw circle
	context.beginPath();
	context.arc(cx, cy, this.radius, 0, 2 * Math.PI, false);

	context.stroke();

	//draw the wave
	context.beginPath();
	context.moveTo(cx, cy);
	points.forEach(function(point){
		context.lineTo(point.x, point.y);
	});

	context.stroke();

	this.angle += 1;

	

}


Glug.Wave.prototype.test3 = function(context) {
	context.clearRect(0, 0, this.drawingArea.width, this.drawingArea.height);

	context.strokeStyle = "black";

	var x = 100;
	var firstPoint = this.getPoint(this.angle, x);
	x += 100;
	var secondPoint = this.getPoint(this.angle - 20, x);
	x += 100;
	var thirdPoint = this.getPoint(this.angle - 40, x);
	x += 100;
	var fourthPoint = this.getPoint(this.angle - 60, x);

	this.drawPoint(context, firstPoint);
	this.drawPoint(context, secondPoint);	
	this.drawPoint(context, thirdPoint);	
	this.drawPoint(context, fourthPoint);

	context.beginPath();
	context.lineTo(firstPoint.x, firstPoint.y);
	context.lineTo(secondPoint.x, secondPoint.y);
	context.lineTo(thirdPoint.x, thirdPoint.y);
	context.lineTo(fourthPoint.x, fourthPoint.y);	

	context.stroke();

	this.angle += 1;

}

Glug.Wave.prototype.run = function(context) {
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