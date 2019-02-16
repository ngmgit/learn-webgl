// Credits: https://github.com/CodingTrain

/* eslint-disable no-param-reassign */
import P5 from 'p5';

import { MakeFrequencyBands } from './utils';

let analyser = null;

function drawEq(p5) {
  if (!analyser) {
    return;
  }

  p5.background('#696969');
  p5.noStroke();

  // beginShape();
  const spectrum = MakeFrequencyBands(analyser.getFrequencyData());
  for (let i = 0; i < spectrum.length; i++) {
    const amp = spectrum[i];
    const y = p5.map(amp, 0, 5000, 1000, 0);
    p5.fill(i, 255, 255);
    p5.rect(i * 200, y, 18, 1000 - y);
  }

  p5.stroke(255);
  p5.fill(40);
}

// eslint-disable-next-line no-new
export function SetupP5Eq(data) {
  ({ analyser } = data);

  // eslint-disable-next-line no-new
  new P5((p5) => {
    p5.setup = () => {
      p5.createCanvas(1800, 1000);
    };

    p5.draw = () => {
      drawEq(p5);
    };
  }, 'equ');
}
