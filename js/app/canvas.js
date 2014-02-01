
//(function(){

require(["js/app/helpers/wave"], function(){
	
	var wave;

	function renderWave(){
		var canvas = document.querySelector("#myCanvas");
		if(!canvas.getContext)
			return;

		var context = canvas.getContext("2d");

		wave = wave || new Glug.Wave(new Glug.DrawingArea(canvas.width, canvas.height));
		//wave.test(context, left);		
		wave.run(context);		

		adjustLeft();

		//this should be checked. requestAnimationFrame has different implementations in each browser
		window.requestAnimationFrame(renderWave);
	}

	window.requestAnimationFrame(renderWave);

	function adjustLeft(){
		left += 1;
	}

	var left = 0;

});

//})();

