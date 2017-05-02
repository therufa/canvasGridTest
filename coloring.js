'use static';

var c_SENSITIVITY = 65;

(function() {
  var image = document.getElementById('img0');
  var imgCtx = document.createElement('canvas').getContext('2d');

  imgCtx.canvas.width = image.width;
  imgCtx.canvas.height = image.height;

  var tmp = document.createElement('canvas');
  var tmpCtx = tmp.getContext('2d');

  image.addEventListener('click', function( e ) {
    var x = e.offsetX;
    var y = e.offsetY;
    var imageData;

    imageData = imgCtx.getImageData(x, y, 1,1).data;

    var R = imageData[0];
    var G = imageData[1];
    var B = imageData[2];

    replaceColor( R, G, B );
  }); // eventListener::click

  function replaceColor( R, G, B ) {
    var cData = tmpCtx.getImageData( 0,0, tmp.width, tmp.height );
    var red = Math.round(Math.random()*255);
    var green = Math.round(Math.random()*255);
    var blue = Math.round(Math.random()*255);

    for( var i = 0; i < cData.data.length;) {
      var tR = cData.data[i++];
      var tG = cData.data[i++];
      var tB = cData.data[i++];
      var tA = cData.data[i++];

			var tolR = Math.abs(tR-R);
      var tolG = Math.abs(tG-G);
      var tolB = Math.abs(tB-B);

      if ( tolR <= c_SENSITIVITY && tolG <= c_SENSITIVITY && tolB <= c_SENSITIVITY ) {
        cData.data[i-4] = red;
        cData.data[i-3] = green;
        cData.data[i-2] = blue;
      }
    }

    tmpCtx.putImageData(cData,0,0);
    image.src = tmp.toDataURL();
  } // replaceColor

  function draw() {
  	tmp.width = image.width;
    tmp.height = image.height;

    tmpCtx.drawImage(image,0,0)
  } // draw

  draw();
})();
