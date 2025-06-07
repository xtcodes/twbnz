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
  const canvasSize = Math.min(this.renderCanvas.width, this.renderCanvas.height);
  
  // Ambil offset kalau ada
  const x = options.offset?.left || 0;
  const y = options.offset?.top || 0;

  this.renderContext.drawImage(image, x, y, canvasSize, canvasSize);
}
}
