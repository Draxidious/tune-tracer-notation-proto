import React, { useEffect, useRef, useState } from 'react';
import Vex, { Formatter } from 'vexflow';

const Measure = {
    VF: Vex.Flow,
    stave: null,
    num_total_beats: 0,
    num_beats: 0,
    beat_value: 0,
    /* 
        Measure will use timesignature to figure out how many beats you have to have before you need
        a new voice. 
    */
    
    voices: [],
    constructor(x, y, width) {
        stave = new VF.Stave(x, y, width);
       
    },
    setTimeSignature: function(/*string*/ timeSignature) {
        stave.setTimeSignature(timeSignature);
        let arr = timeSignature.split("/");
        this.num_total_beats = parseInt(arr[0]);
        this.beat_value = parseInt(arr[1]);
    },
    setClef: function(/*string*/ clef) {
        stave.setClef(clef);
    },
    addNote: function(/*string[]*/keys, /*string*/ duration, /*int*/ beat)
    {
        // When adding a note you never want to override another note
        // However, if the StaveNote you are overriding is a REST, then override
    },
    getCurrentBeats: function()
    {
        return num_beats;
    },
    addDefaultRest: function()
    {
        defaultWholeRest = new VF.StaveNote({ keys: ["d/5"], duration: "wr"});
        const notes = [
            defaultWholeRest.setXShift(width/4)
        ];

        const voice = new VF.Voice({ num_beats: this.num_beats, beat_value: this.beat_value}).addTickables(notes);
        voicesStave1.push(voice);
        renderVoices(stave1.current);
    }

  };
  
  export default Measure;