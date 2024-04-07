//Top Level object for now, but Composition will be above this
import { render } from '@testing-library/react';
import React, { useEffect, useRef, useState } from 'react';
import Vex, { Formatter } from 'vexflow';
import {Measure} from './Measure.js';

export class Score {
    VF = Vex.Flow;

    measures = [];
    constructor(notationRef, x, y, measureWidth, timeSignature = "4/4") {
        let renderer = new this.VF.Renderer(notationRef, this.VF.Renderer.Backends.SVG);
        renderer.resize(800, 200);
        let context = renderer.getContext();
        console.log("This is our context: " + context.getFont());
        let firstMeasure = new Measure(context, x, y, measureWidth, timeSignature, "treble");
        this.measures.push(firstMeasure);
    }

  };
  