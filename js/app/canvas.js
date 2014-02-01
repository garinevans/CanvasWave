
//(function(){

require(["js/app/helpers/wave"], function(){
	
	var wave;

	var canvas = document.querySelector("#myCanvas");
	var parent = canvas.parentNode;
	canvas.width = parent.offsetWidth;
	window.addEventListener("resize", function(){
		canvas.width = parent.offsetWidth;
		//TODO: update and slow down the wave here
	});

	function renderWave(){
		
		if(!canvas.getContext)
			return;

		var context = canvas.getContext("2d");

		wave = wave || new Glug.Wave(new Glug.DrawingArea(canvas.width, canvas.height));
		//wave.test(context, left);		
		wave.run(context);		

		//this should be checked. requestAnimationFrame has different implementations in each browser
		window.requestAnimationFrame(renderWave);
	}

	window.requestAnimationFrame(renderWave);

});

//})();

