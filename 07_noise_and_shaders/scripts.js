console.clear();

let myShaders, audio, amp, fft, _text;

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

  _text = createGraphics(window.innerWidth, window.innerHeight);
  _text.textFont("IBM Plex Mono");
  _text.textAlign(CENTER);
  _text.textSize(35);
  _text.fill(3, 7, 11);
  _text.noStroke();
}

function draw() {
  background(255);
  fft.analyze();
  const volume = amp.getLevel(); // returns 0 - 1 value
  let freq = fft.getCentroid(); // returns 0 - 255 value
  freq *= 0.025;

  const mapF = map(freq, 30, 70, 0, 20);
  const mapA = map(volume, 0, 0.05, 0, 0.5);

  myShaders.setUniform("uTime", frameCount);
  myShaders.setUniform("uFrequency", mapF);
  myShaders.setUniform("uAmp", mapA);
  myShaders.setUniform("uMouseX", mouseX);
  myShaders.setUniform("uMouseY", mouseY);

  sphere(width < 600 ? width / 3 : width / 4, 200, 200);

  push();
  noStroke();
  texture(_text);
  translate(0, height / 2 - 50, 0);
  plane(window.innerWidth, window.innerHeight);
  _text.clear();
  _text.text(
    !audio.isPlaying() ? "Click to play" : "Click to pause",
    width * 0.5,
    height * 0.5
  );
  pop();
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
