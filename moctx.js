// MOCTX.js
// Joshua Galvin
// 2013-05-23

// MIT License

var MOCTX = (function () {
  'use strict';

  function XMONAD(modifier) {
    var monad = MONAD(modifier);

    monad.properties = function () {
      Array.prototype.slice.call(arguments, 0).forEach(function (name) {
        var upName = name.charAt(0).toUpperCase() + name.slice(1);

        monad.lift("set" + upName, function (value, mod) {
          value[name] = mod;
          return value;
        });

        monad.lift_value("get" + upName, function (value) {
          return value[name];
        });
      });
      return this;
    };

    monad.lifts = function () {
      Array.prototype.slice.call(arguments, 0).forEach(function (name) {
        monad.lift(name, function (value) {
          if (typeof value[name] === "function") {
            value[name].apply(value, Array.prototype.slice.call(arguments, 1));
          }
          return value;
        });
      });
      return this;
    };

    monad.lift_values = function () {
      Array.prototype.slice.call(arguments, 0).forEach(function (name) {
        monad.lift_value(name, function (value) {
          if (typeof value[name] === "function") {
            return value[name].apply(value, Array.prototype.slice.call(arguments, 1));
          }
          return null;
        });
      });
      return this;
    };

    return monad;
  }

  var MOCTX = XMONAD(function (monad, value) {
    if (value === undefined) {
      var canvas = document.createElement("canvas");
      document.body.appendChild(canvas);
      return canvas.getContext("2d");
    }
    return value;
  }).lifts("arc", "arcTo", "beginPath", "bezierCurveTo", "clearRect")
    .lifts("clip", "closePath", "drawImage", "drawSystemFocusRing", "fill", "fillRect")
    .lifts("fillText", "lineTo", "moveTo", "putImageData", "quadraticCurveTo", "rect", "restore")
    .lifts("rotate", "save", "scale", "scrollPathIntoView", "setLineDash", "setTransform", "stroke")
    .lifts("strokeRect", "strokeText", "transform", "translate")
    .lift_values("createImageData", "createLinearGradient", "createPattern", "createRadialGradient")
    .lift_values("drawCustomFocusring", "getImageData", "getLineDash", "isPointInPath", "isPointInStroke")
    .lift_values("measureText")
    .properties("canvas", "fillStyle", "font", "globalAlpha", "globalCompositeOperation", "lineCap")
    .properties("lineDashOffset", "lineJoin", "lineWidth", "miterLimit", "shadowBlur", "shadowColor")
    .properties("shadowOffsetX", "shadowOffsetY", "strokeStyle", "textAlign", "textBaseLine")
    .lift("setWidth", function (ctx, width) {
      ctx.canvas.setAttribute("width", width);
      return ctx;
    })
    .lift("setHeight", function (ctx, height) {
      ctx.canvas.setAttribute("height", height);
      return ctx;
    })
    .lift("hide", function (ctx) {
      ctx.canvas.style.display = "none";
    })
    .lift("show", function (ctx) {
      ctx.canvas.style.display = "block";
    })
    .lift("toggle", function (ctx) {
      if (ctx.canvas.style.display === "none") {
        ctx.canvas.style.display = "block";
      } else {
        ctx.canvas.style.display = "none";
      }
    })
    .lift("setSize", function (ctx, width, height) {
      ctx.canvas.setAttribute("height", height);
      ctx.canvas.setAttribute("width", width);
      return ctx;
    })
    .lift_value("getHeight", function (ctx) {
      return ctx.canvas.getAttribute("height");
    })
    .lift_value("getWidth", function (ctx) {
      return ctx.canvas.getAttribute("width");
    })
    .lift_value("getSize", function (ctx) {
      return [ctx.canvas.getAttribute("height"), ctx.canvas.getAttribute("width")];
    });

  return MOCTX;
}());