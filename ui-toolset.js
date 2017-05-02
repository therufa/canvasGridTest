// UI toolset
'use strict';

function UICanvas( canvas ) {

	this.canvas = canvas;
	this.ctx = canvas.getContext('2d');

	if( ! this.ctx || ! this.ctx instanceof CanvasRenderingContext2D ) {
		console.warn('Missing canvas context');
	}

	this.canvasData = {};

	this.objectRegister = [];

	// register canvas actions
	var canvasEventHandler = function(e) {
		// validate against each component in the register
	};

	this.canvas.addEventListener('click', canvasEventHandler);

	this.canvas.addEventListener('mousemove', canvasEventHandler);
};

UICanvas.prototype._validateEvents = function() {};
UICanvas.prototype.append = function( drawable ) {

	if( ! drawable instanceof this.Drawable ) {
		console.warn("property 'drawable' has wrong type");
		return;
	}

	this.objectRegister.push(drawable);
}
UICanvas.prototype.render = function() {

	for( var i = 0; i < this.objectRegister.length; i++ ) {
		var nextObject = this.objectRegister[i];

		this.ctx.beginPath();
		nextObject.render( this.ctx );

		this.ctx.fill();
		this.ctx.stroke();
	}
};

// generic base class
UICanvas.prototype.Drawable = function() {

	this.posX;
	this.posY;

	this.width;
	this.height;

	this._eventRegistry = [];

	this.fillColor;
	this.strokeColor;

	this.strokeWidth;

};

UICanvas.prototype.Drawable.prototype.registerEvent = function( event, handler ) {};
UICanvas.prototype.Drawable.prototype.validateEvent = function( event, eventData ) {};
UICanvas.prototype.Drawable.prototype.triggerEvent = function( event, eventData ) {};

UICanvas.prototype.Drawable.prototype.appendToCanvas = function() {};

UICanvas.prototype.Drawable.prototype.render = function() {
	console.warn('Rendering not implemented');
};


// rectangle component
UICanvas.prototype.Rectangle = function( x, y, w, h ) {
	this.posX = x;
	this.posY = y;
	this.width = w;
	this.height = h;

};

// Inherit properties from UICanvas' Drawable
UICanvas.prototype.Rectangle.prototype = new UICanvas.prototype.Drawable;
UICanvas.prototype.Rectangle.prototype.constructor = UICanvas.prototype.Rectangle;

UICanvas.prototype.Rectangle.prototype.render = function( ctx ) {

	ctx.fillStyle = this.fillColor || 'rgba(0,0,0,0)';
	ctx.strokeStyle = this.strokeColor || 'rgba(0,0,0,0)';
	ctx.lineWidth = this.strokeWidth || 0;

	ctx.rect(this.posX, this.posY, this.width, this.height);

};
