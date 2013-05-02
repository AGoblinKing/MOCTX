MOCTX.js 
--------

MOCTX.js is a monad wrapper around the CanvasRenderingContext2D Object built on top of Douglas Crockford's awesome Monad library. 

The entire standards compliant interface is available and chainable. Any properties are available as setters and getters.

Quick Start
-----------

Grab moctx.js + monad.js and slap them into your head. Enjoy.

Examples
--------

Drawing a red square:

  MOCTX().setFillStyle("rgb(200,0,0)").fillRect(0, 0, 20, 20);

Passing an existing canvas 2D context and drawing a line:

  var canvas = document.getElementById("someCanvas");
  var ctx = canvas.getContext("2d");

  MOCTX(ctx)
    .setStrokeStyle("rgb(0, 0, 0)")
    .beginPath()
    .moveTo(0, 50)
    .lineTo(100, 50)
    .fill();

Lets get the canvas reference after drawing a circle:

  var canvas = MOCTX()
    .beginPath()
    .arc(75, 75, 50, 0, Math.PI*2, true)
    .getCanvas();


Oh and I added helper functions to set the width and the height of the canvas:

  MOCTX()
    .setWidth(200)
    .setHeight(400);

  MOCTX()
    .setSize(200, 400);