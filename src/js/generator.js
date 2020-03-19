addEventListener('load', generateElements);

function generateElements() {
	// Create DOM structure
	
	var mainElement = document.getElementById('generator');
	mainElement.innerHTML = "";
	
	let statusElement = document.createElement('p');
	statusElement.textContent = "Select a file to upload.";
	mainElement.appendChild(statusElement);

	let fileUploadElement = document.createElement('input');
	fileUploadElement.type = 'file';
	mainElement.appendChild(fileUploadElement);
	
	let overlayImageElement = new Image();
	overlayImageElement.src = "assets/img/overlay.png";
	overlayImageElement.style.display = 'none';
	mainElement.appendChild(overlayImageElement);
	
	fileUploadElement.addEventListener('change', function() {
		statusElement.textContent = "Uploading file...";
		
		if(this.files && this.files[0]) {
			let uploadedImage = document.createElement("img");
			uploadedImage.src = URL.createObjectURL(this.files[0]);
			
			uploadedImage.addEventListener('load', function() {
				statusElement.textContent = "Processing...";
				
				// prepare canvas
				let renderCanvas 		= document.createElement('canvas');
				renderCanvas.width 	= overlayImageElement.width;
				renderCanvas.height	= overlayImageElement.height;
		
				let ctx = renderCanvas.getContext('2d');
				
				// fill canvas with background color
				ctx.beginPath();
				ctx.rect(0, 0, renderCanvas.width, renderCanvas.height);
				ctx.fillStyle = "#becdbf";
				ctx.fill();
				
				// scale uploaded image
				scale_width 	= renderCanvas.width 	/ uploadedImage.width;
      	scale_height	= renderCanvas.height	/ uploadedImage.height;
      	
      	scale = Math.min(scale_width, scale_height);

      	newWidth 	= uploadedImage.width 	* scale;
      	newHeight	= uploadedImage.height	* scale;
      	
      	console.log(renderCanvas.width, renderCanvas.height, newWidth, newHeight, uploadedImage.width, uploadedImage.height);

      	uploadedImage.width 	= newWidth;
      	uploadedImage.height 	= newHeight;
				offsetLeft	= (renderCanvas.width		- newWidth) 	/ 2;
				offsetTop		= (renderCanvas.height 	- newHeight) 	/ 2;
				
				console.log(offsetLeft, offsetTop);
				
				// render uploadedImage and overlay
				ctx.drawImage(uploadedImage, offsetLeft, offsetTop, newWidth, newHeight);
				ctx.drawImage(overlayImageElement, 0, 0);
				
				// set image url to blob
        let downloadImageElement = document.createElement("img");
      	downloadImageElement.src = renderCanvas.toDataURL();
        mainElement.appendChild(downloadImageElement);

      	statusElement.textContent = "Done!";

				// create downloadlink
        let downloadButtonElement = document.createElement("a");
        downloadButtonElement.innerText = "Download";
        downloadButtonElement.href = renderCanvas.toDataURL();
        downloadButtonElement.download = "image.png";
        mainElement.appendChild(downloadButtonElement);
        
        // create recreate button and remove filechooser
        mainElement.removeChild(fileUploadElement);

        let renewFormElement = document.createElement("button");
        renewFormElement.innerText = "Neues Bild generieren...";
        renewFormElement.addEventListener("click", function(){
          generateElements();
        });
        mainElement.appendChild(renewFormElement);
			});
		}
	}); 
}
