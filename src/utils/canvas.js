// Grabbing all the images from apple :)
const baseUrl =
  "https://www.apple.com/105/media/us/imac-pro/2017/1b6b08f2_0224_4f63_b625_3fd0ac6861e8/hero-video/hardware-jpg/large_2x/";
const numberOfFrames = 180;
const frames = getAllImageFrames();

// Thanks, stackoverflow answer.
function padNumer(n, width, z) {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function createImage(src) {
  if (typeof window === "undefined") {
    return;
  }

  const image = new Image();
  image.src = src;
  return image;
}

function getAllImageFrames() {
  const frames = [];

  for (let i = 0; i < numberOfFrames; i++) {
    const frameNumber = padNumer(i, 3);
    const url = `${baseUrl}${frameNumber}.jpg`;

    frames.push(createImage(url));
  }

  return frames;
}

export function initializeCanvas(canvas) {
  if (!canvas || typeof window === "undefined") {
    return;
  }

  // hardcode first frame for initial render
  const firstFrame = frames[0];
  const context = canvas.getContext("2d");

  context.imageSmoothingEnabled = true;
  canvas.width = firstFrame.width;
  canvas.height = firstFrame.height;

  if (firstFrame.complete) {
    return drawDeviceImage(context, [firstFrame], 0);
  }

  firstFrame.onload = function() {
    return drawDeviceImage(context, [firstFrame], 0);
  };
}

/**
 * Finds the active frame based on percentage and then draw it
 * into the canvas.
 */
function drawDeviceImage(context, frames, percentage) {
  const activeFrame = Math.round(numberOfFrames * percentage) || 0;

  if (frames[activeFrame]) {
    const image = frames[activeFrame];
    context.drawImage(image, 0, 0, image.width, image.height);
  }
}

/**
 * On window scroll, call scrubThroughFrames to go through the Array
 * of stored images to render into the canvas.
 */
export function scrubThroughFrames(ref, percentage) {
  const canvas = ref;
  const context = canvas.getContext("2d");

  drawDeviceImage(context, frames, percentage);
}
