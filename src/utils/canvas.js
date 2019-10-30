// Grabbing all the images from Apple :)
const baseUrl =
  "https://www.apple.com/105/media/us/imac-pro/2017/1b6b08f2_0224_4f63_b625_3fd0ac6861e8/hero-video/hardware-jpg/large_2x/";
// I did the math -- they store 180 images for this effect
const numberOfFrames = 180;

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

/**
 * In order to avoid flickering, we have to fetch all the images and store
 * them in an Array. We use this Array to scrub through and swap out the
 * active frame.
 */
function getAllImageFrames() {
  const frames = [];

  for (let i = 0; i < numberOfFrames; i++) {
    const frameNumber = padNumer(i, 3);
    const url = `${baseUrl}${frameNumber}.jpg`;

    frames.push(createImage(url));
  }

  return frames;
}

/**
 * initializeCanvas grabs the first frame of the assets and sets a loading
 * event handler. Once the image is loaded we set the canvas width, height,
 * and draw the frame into the canvas.
 */
export function initializeCanvas(canvas) {
  if (!canvas || typeof window === "undefined") {
    return;
  }

  const context = canvas.getContext("2d");
  context.imageSmoothingEnabled = true;

  // first image is #000 (padded to allow for up to 999
  const imageSrc = `${baseUrl}000.jpg`;
  const image = new Image();

  image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;
    drawDeviceImage(context, [image], 0);
  };

  image.src = imageSrc;
}

/**
 * Finds the active frame based on percentage and then draws it
 * into the canvas.
 */
function drawImageToCanvas(context, percentage) {
  const frames = getAllImageFrames();
  const activeFrame = Math.round(numberOfFrames * percentage) || 0;

  if (frames[activeFrame]) {
    const image = frames[activeFrame];
    context.drawImage(image, 0, 0, image.width, image.height);
  }
}

/**
 * On window scroll, call scrubThroughFrames() to go through the Array
 * of stored images to render into the canvas.
 */
export function scrubThroughFrames(canvas, percentage) {
  const context = canvas.getContext("2d");

  drawImageToCanvas(context, percentage);
}
