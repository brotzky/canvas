const baseUrl =
  "https://www.apple.com/105/media/us/imac-pro/2017/1b6b08f2_0224_4f63_b625_3fd0ac6861e8/hero-video/hardware-jpg/large_2x/";
const numberOfFrames = 180;
const frames = getAllImageFrames();

export function initializeCanvas(ref) {
  const firstFrame = frames[0];
  const canvas = ref;
  const context = canvas.getContext("2d");

  context.imageSmoothingEnabled = true;
  canvas.width = firstFrame.width;
  canvas.height = firstFrame.height;

  drawDeviceImage(context, [firstFrame], 0);
}

function drawDeviceImage(context, frames, percentage) {
  const activeFrame = Math.round(numberOfFrames * percentage) || 0;

  const image = frames[activeFrame];
  context.drawImage(image, 0, 0, image.width, image.height);
}

export function scrubThroughFrames(ref, percentage) {
  const canvas = ref;
  const context = canvas.getContext("2d");

  drawDeviceImage(context, frames, percentage);
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

function createImage(src) {
  const image = new Image();
  image.src = src;
  return image;
}

function padNumer(n, width, z) {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
