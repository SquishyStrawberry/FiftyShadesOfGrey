/* jshint esnext: true, browser: true */

document.addEventListener("DOMContentLoaded", function() {
  "use strict";

  const SHADES_OF_GREY = 50;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const createGrayscaleHex = (color) => {
    let hexValue = Math.floor(color).toString(16);
    if (color < 0x10) hexValue = "0" + hexValue;
    return "#" + hexValue + hexValue + hexValue;
  };

  const drawBlocks = () => {
    let x = 0;
    const blockWidth = canvas.width / SHADES_OF_GREY;
    for (let i = 0; i < 256; i += 255 / SHADES_OF_GREY) {
      context.fillStyle = context.strokeStyle = createGrayscaleHex(i);
      context.fillRect(x, 0, blockWidth, canvas.height);
      /* XXX Why does subtracting one from blockWidth
      * remove the weird color columns? */
      x += blockWidth - 1;
    }
    context.fill();
  };

  const resizeAndDrawBlocks = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawBlocks();
  };

  canvas.classList.add("fullscreen");
  document.body.appendChild(canvas);
  window.addEventListener("resize", resizeAndDrawBlocks);
  resizeAndDrawBlocks();
});
