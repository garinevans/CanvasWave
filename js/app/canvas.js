

require(["js/app/helpers/wave"], function(){
	
	var wave;

	var canvas = document.querySelector("#myCanvas");
	var parent = canvas.parentNode;
	canvas.width = parent.offsetWidth;
	window.addEventListener("resize", function(){
		canvas.width = parent.offsetWidth;
		//TODO: update and slow down the wave here
	});

	var context = canvas.getContext("2d");
	if(!canvas.getContext) return;
	Glug.Wave.context = context;

	Glug.Wave.setDrawingArea(new Glug.DrawingArea(canvas.width, canvas.height));

	function renderWave(){
			
		Glug.Wave.run();

		//this should be checked. requestAnimationFrame has different implementations in each browser
		window.requestAnimationFrame(renderWave);
	}

	window.requestAnimationFrame(renderWave);

});
