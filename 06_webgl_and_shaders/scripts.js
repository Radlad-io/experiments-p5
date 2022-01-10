console.clear();

let myShaders, audio, amp, fft;

function preload() {
  myShaders = loadShader("shaders/vertex.vert", "shaders/fragment.frag");
  audio = loadSound("/assets/void_in_the_night_1.mp3");
}

function setup() {
  //  The WEBGL parameter sets up 3D rendering in p5
  const canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  shader(myShaders);
  amp = new p5.Amplitude();
  fft = new p5.FFT();
  audio.setVolume(0.1);
}

function draw() {
  background(2555);
  fft.analyze();
  const volume = amp.getLevel(); // returns 0 - 1 value
  let freq = fft.getCentroid(); // returns 0 - 255 value
  freq *= 0.025;

  const mapF = map(freq, 30, 70, 0, 20);
  const mapA = map(volume, 0, 0.05, 0, 0.5);

  myShaders.setUniform("uTime", frameCount);
  myShaders.setUniform("uFrequency", mapF);
  myShaders.setUniform("uAmp", mapA);

  sphere(width / 4, 200, 200);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
  if (audio.isPlaying()) {
    audio.pause();
  } else {
    audio.play();
  }
  return;
}
