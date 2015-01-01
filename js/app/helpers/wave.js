var Glug = Glug || {};

Glug.Config = {
	drawWirefreame: false
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
		radius: 100,
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
		numberOfPoints: 0
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
			this.context.clearRect(0, 0, this.drawingArea.width, this.drawingArea.height);

			this.context.strokeStyle = "black";
			this.context.fillStyle = "#9AE2FF";

			var x = constants.startX;
			var points = [];
			
			for(var i = 0; i < constants.numberOfPoints; i++){
				var point = getPoint(constants.angle - i * 20, x);
				x += constants.distanceBetweenPoints;

				points.push(point);
			}
			
			this.context.restore();
			this.context.save();
			this.context.beginPath();
			var firstPoint = points[0];

			var bottomLeft = {
				x: firstPoint.x,
				y: constants.startY
			};
			this.context.moveTo(bottomLeft.x, bottomLeft.y);
			
			//draw the wave - connect the dots
			var oThis = this;
			points.forEach(function(point){
				oThis.context.lineTo(point.x, point.y);
			});

			var lastPoint = points[points.length - 1];
			var bottomRight = {
				x: lastPoint.x,
				y: constants.startY
			}
			this.context.lineTo(bottomRight.x, bottomRight.y);

			this.context.stroke();
			this.context.fill();

			if(Glug.Config.drawWirefreame){
				//draw the wireframe
				var wave = this;
				points.forEach(function(point){
					wave.drawPoint(this.context, point);
				});
			}

			constants.angle += 1;

		}

	}

})();
