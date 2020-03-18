var profilePicture 			= undefined;
var imageData				= undefined;
var max_width, max_height	= undefined;
var renderCanvas			= undefined;

window.addEventListener("load", function() {
	/**
	 * 
	 */
	 
	document.getElementById("status").textContent = "Select a file to upload.";
	
	document.getElementById("fileupload").addEventListener("change", function() {
		if(this.files && this.files[0]) {
			let img = document.createElement("img");
			img.src = URL.createObjectURL(this.files[0]);
			img.onload = imageLoaded;
		}
	});
});

window.addEventListener("load", function() {
	/**
	 * 
	 */
	 
	let cvs = document.createElement("canvas");
	let img = document.getElementById("overlay");
	
	max_width 	= cvs.width 	= img.width;
	max_height 	= cvs.height 	= img.height;
	
	let ctx = cvs.getContext("2d");

	ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
	imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
	
	renderCanvas = cvs;
});

function imageLoaded() {
	/**
	 * 
	 */
	 
	document.getElementById("status").textContent = "Processing...";
	
	scale_width 	= max_width 	/ this.width;
	scale_height	= max_height	/ this.height;
	
	scale = Math.min(scale_width, scale_height);
	
	new_width 	= this.width 	* scale;
	new_height	= this.height 	* scale;
	
	this.width 	= new_width;
	this.height = new_height;
	
	offset_left	= (max_width	- new_width) 	/ 2;
	offset_top	= (max_height 	- new_height) 	/ 2;
	
	let cvs 	= document.createElement("canvas");
	
	cvs.width 	= max_width;
	cvs.height 	= max_height;
	
	let ctx 	= cvs.getContext("2d");
	
	ctx.drawImage(this, offset_left, offset_top, this.width, this.height);
	profilePicture = ctx.getImageData(0, 0, max_width, max_height);
	
	process();
}

function process() {
	/**
	 * 
	 */
	 
	// Do manipulation
	for (let i = 0; i < max_width * max_height; i += 1) {
		data = getPixel(imageData, i);
		if(data[3] == 0) {
			setPixel(imageData, i, getPixel(profilePicture, i));
		}
	}
	
	let ctx = renderCanvas.getContext("2d");
	ctx.putImageData(imageData, 0, 0);
	
	// set image url to blob
	document.getElementById("download-image").src = renderCanvas.toDataURL();
	
	document.getElementById("status").textContent = "Done. Right click image and select 'Save image'!";
}

function getPixel(imgData, index) {
	/**
	 * 
	 */
	 
	return imgData.data.slice(index * 4, index * 4 + 4);
}

function setPixel(imgData, index, pixelData) {
	/**
	 * 
	 */
	 
	imgData.data.set(pixelData, index * 4);
}
