import React, { useEffect, useRef, useState } from 'react';
import Vex, { Formatter } from 'vexflow';

export class Measure {
    VF = Vex.Flow;
    stave = null;
    context = null;
    num_beats = 0;
    beat_value = 0;
    width = 0;
    height = 0;
    /* 
        Measure will use timesignature to figure out how many beats you have to have before you need
        a new voice. 
    */
    voice1 = null;
    constructor(context, x, y, width, timeSignature = "none", clef = "none") {
        this.stave = new this.VF.Stave(x, y, width);
        this.width = width;
        this.height = this.stave.getHeight();
        this.context = context;
        console.log("Context in Measure: " + context);
        if(timeSignature != "none")
        {
            this.setTimeSignature(timeSignature);
        }
        console.log("Numbeats: " + this.num_beats);
        if(clef != "none")
        {
            this.setClef(clef);
        }
        let defaultQRest = new this.VF.StaveNote({ keys: ["d/5"], duration: "qr"});
        const notes = [
            new this.VF.StaveNote({ keys: ["b/4"], duration: "qr"}),
            new this.VF.StaveNote({ keys: ["b/4"], duration: "qr"}),
            new this.VF.StaveNote({ keys: ["b/4"], duration: "qr"}),
            new this.VF.StaveNote({ keys: ["b/4"], duration: "qr"})
        ];

        this.voice1 = new this.VF.Voice({ num_beats: this.num_beats, beat_value: this.beat_value}).addTickables(notes);
        this.stave.setContext(context).draw();
        this.renderVoices();
    }

    setTimeSignature = function(/*string*/ timeSignature) {
        this.stave.setTimeSignature(timeSignature);
        let arr = timeSignature.split("/");
        this.num_beats = parseInt(arr[0]);
        this.beat_value = parseInt(arr[1]);
    }

    setClef = function(/*string*/ clef) {
        this.stave.setClef(clef);
    }

    addNote = function(/*string[]*/keys, /*string*/ duration, /*string*/ noteId)
    {
        let VF = Vex.Flow;
        let notes = [];
        
        this.voice1.getTickables().forEach(function (staveNote){
           console.log(staveNote);
           if(staveNote.attrs.id == noteId)
           {
             // If staveNote is not a rest, then we add to the chord
             if(staveNote.noteType != 'r')
             {
                let newKeys = staveNote.getKeys();
                keys.forEach(function(key){
                    // We don't want repeat keys
                    if(!newKeys.includes(key)) newKeys.push(key);
                 });
                notes.push( new VF.StaveNote({ keys: newKeys, duration: duration}));
             }
             // If the staveNote is a rest, then we replace it
             else
             {
                // Replace since its a rest
                notes.push( new VF.StaveNote({ keys: keys, duration: duration}));
             } 
             
           }
           else
           {
             notes.push(staveNote);
           }
           let svgNote = document.getElementById('vf-'+staveNote.attrs.id);
           //console.log(staveNote.attrs.id);
           svgNote.remove();
        });
        this.voice1 = new VF.Voice({ num_beats: this.num_beats, beat_value: this.beat_value}).addTickables(notes);
        this.renderVoices();
        // When adding a note you never want to override another note
        // However, if the StaveNote you are overriding is at REST, then override
    }

    getCurrentBeats = function()
    {
        return this.num_beats;
    }

    renderVoices = function()
    {
        new this.VF.Formatter().format([this.voice1], this.width - 25);
        this.voice1.draw(this.context, this.stave);
    }

  };