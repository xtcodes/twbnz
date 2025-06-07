class Generator {
	
	static defaults = {
		width: 200,
		height: 200,
		backgroundColor: '#ffffff',
		offset: {
			top: 0,
			left: 0
		},
		scale: 1
	};
	
	constructor(options) {
		// create canvas
		this.renderCanvas = document.createElement('canvas');
		this.renderCanvas.width = options.width ? options.width : Generator.defaults.width;
		this.renderCanvas.height = options.height ? options.height : Generator.defaults.height;
		
		this.renderContext = this.renderCanvas.getContext('2d');
		
		// fill canvas with background color
		this.renderContext.beginPath();
		this.renderContext.rect(0, 0, this.renderCanvas.width, this.renderCanvas.height);
		this.renderContext.fillStyle = options.backgroundColor ? options.backgroundColor : Generator.defaults.backgroundColor;
		this.renderContext.fill();
	}

addLayer(image, options = {}) {
  const canvasWidth = this.renderCanvas.width;
  const canvasHeight = this.renderCanvas.height;

  // Hitung rasio skala untuk menjaga aspect ratio
  const ratio = Math.min(canvasWidth / image.width, canvasHeight / image.height);
  const newWidth = image.width * ratio;
  const newHeight = image.height * ratio;

  // Pusatkan gambar
  const x = (canvasWidth - newWidth) / 2;
  const y = (canvasHeight - newHeight) / 2;

  this.renderContext.drawImage(image, x, y, newWidth, newHeight);
}
