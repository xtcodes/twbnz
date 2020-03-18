var profilePicture 			= undefined;
var imageData				= undefined;
var max_width, max_height	= undefined;
var renderCanvas			= undefined;

addEventListener("load", function() {
  generateElements();

});



function generateElements(){
  var mainElement = document.body;
  mainElement.innerHTML = "";

  let statusElement = document.createElement("p");
  statusElement.textContent = "Select a file to upload.";
  mainElement.appendChild(statusElement);

  let fileUploadElement = document.createElement("input");
  fileUploadElement.type = "file";
  mainElement.appendChild(fileUploadElement);

  let overlayImageElement = new Image();
  overlayImageElement.src = "assets/img/overlay.png";
  overlayImageElement.style.display = "none";
  mainElement.appendChild(overlayImageElement);


	fileUploadElement.addEventListener("change", function() {
		if(this.files && this.files[0]) {
			let img = document.createElement("img");
			img.src = URL.createObjectURL(this.files[0]);

			img.addEventListener("load", function(){
        statusElement.textContent = "Processing...";

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

        for (let i = 0; i < max_width * max_height; i += 1) {
      		data = getPixel(imageData, i);
      		if(data[3] == 0) {
      			setPixel(imageData, i, getPixel(profilePicture, i));
      		}
      	}

      	ctx = renderCanvas.getContext("2d");
      	ctx.putImageData(imageData, 0, 0);

      	// set image url to blob
        let downloadImageElement = document.createElement("img");
      	downloadImageElement.src = renderCanvas.toDataURL();
        mainElement.appendChild(downloadImageElement);

      	statusElement.textContent = "Done!";

        let downloadButtonElement = document.createElement("a");
        downloadButtonElement.innerText = "Download";
        downloadButtonElement.href = renderCanvas.toDataURL();
        downloadButtonElement.download = "image.png";
        mainElement.appendChild(downloadButtonElement);

        fileUploadElement.parentElement.removeChild(fileUploadElement);

        let renewFormElement = document.createElement("button");
        renewFormElement.innerText = "Neues Bild generieren...";
        renewFormElement.addEventListener("click", function(){
          generateElements();
        });
        mainElement.appendChild(renewFormElement);
      });

		}
	});


	let cvs = document.createElement("canvas");

  overlayImageElement.addEventListener("load", function(){
    max_width 	= cvs.width 	= overlayImageElement.width;
  	max_height 	= cvs.height 	= overlayImageElement.height;

    let ctx = cvs.getContext("2d");

  	ctx.drawImage(overlayImageElement, 0, 0, cvs.width, cvs.height);
  	imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);

  	renderCanvas = cvs;
  })

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
