
precision mediump float;

uniform float uTime;

varying vec3 vNormal;
varying float vNoise;   
varying float vAmp;   

vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d) {
  return a + b+cos( 6.28318*(c*t+d) );
}

void main() {
  vec3 color1 = vec3(vNoise, vNoise , vNoise );
  vec3 color2 = palette(
    vNormal.x * uTime,
    vec3(0.5, 0.5, 0.5),
    vec3(0.5, 0.5, 0.5),
    vec3(1.0, 0.7, 0.4),
    vec3(0.00, 0.15, 0.20)
    );

    vec3 finalColor = mix(color1, color2, cos(uTime * 0.01));

  gl_FragColor = vec4(finalColor, 1.0);
}