var Glug = Glug || {};

Glug.Config = {
	drawWireframe: false
};

Glug.DrawingArea = function (w,h){
	this.width = w;
	this.height = h;
};

Glug.Wave = (function(){

	var constants = {
		//angle of first rotation
		angle: 0,
		//the height of the wave
		radius: 80,
		//center y position of each circle
		cy: 300,
		//bottom of our wave
		startY: 500,
		//start x position
		startX: -100,
		//distance between each point
		distanceBetweenPoints: 100,
		//right most position
		right: 0,
		//calculated based on distance between points and canvas.width
		numberOfPoints: 0,
		//the stroke colour
		strokeColour: "black",
		//the fill Colour
		fillColour: "#9AE2FF",
		//the amount to increment each points angle - effectively the speed of the wave
		angleIncrement: 1,
		//the swell - the lower the number is the larger the swell
		swell: 20
	};

	//private methods
	function getPoint(angle, x){
		var radians = angle * Math.PI / 180;

		var adjacent = Math.cos(radians) * constants.radius + x;
		var opposite = Math.sin(radians) * constants.radius + constants.cy;
		
		return {
			x: adjacent,
			y: opposite,
			cx: x,
			cy: this.cy
		}
	}

	function drawPoint(context, point){
		context.beginPath();
		context.moveTo(point.cx, point.cy);

		context.lineTo(point.x, point.y);
		context.stroke();
	}

	return {

		drawingArea: null,

		//set the drawing area
		setDrawingArea: function(d){
			this.drawingArea = d;

			constants.right = this.drawingArea.width + constants.radius * 2 + (-constants.startX) - 10;

			//calculated based on distance between points and canvas.width
			constants.numberOfPoints = Math.ceil(constants.right / constants.distanceBetweenPoints);
		},
		
		//the drawing context
		context: null,

		run: function(context) {
			var thisWave = this;

			thisWave.context.clearRect(0, 0, thisWave.drawingArea.width, thisWave.drawingArea.height);

			thisWave.context.strokeStyle = constants.strokeColour;
			thisWave.context.fillStyle = constants.fillColour;

			var x = constants.startX;
			var points = [];
			
			for(var i = 0; i < constants.numberOfPoints; i++){
				var point = getPoint(constants.angle - i * constants.swell, x);
				x += constants.distanceBetweenPoints;

				points.push(point);
			}
			
			thisWave.context.restore();
			thisWave.context.save();
			thisWave.context.beginPath();
			var firstPoint = points[0];

			var bottomLeft = {
				x: firstPoint.x,
				y: constants.startY
			};
			thisWave.context.moveTo(bottomLeft.x, bottomLeft.y);
			
			//draw the wave - connect the dots
			points.forEach(function(point){
				thisWave.context.lineTo(point.x, point.y);
			});

			var lastPoint = points[points.length - 1];
			var bottomRight = {
				x: lastPoint.x,
				y: constants.startY
			}
			thisWave.context.lineTo(bottomRight.x, bottomRight.y);

			thisWave.context.stroke();
			thisWave.context.fill();

			constants.angle += constants.angleIncrement;

		}

	}

})();
