import React, { useEffect, useRef, useState } from 'react';
import Vex from 'vexflow';
import * as d3 from 'd3';

const MusicEditor = () => {
    const notationRef = useRef(null);
    const [selectedNote, setSelectedNote] = useState(null);

    useEffect(() => {
        const clearSVG = () => {
            if (notationRef.current) {
                notationRef.current.innerHTML = '';
            }
        }

        const renderNotation = () => {
            const VF = Vex.Flow;
            const renderer = new VF.Renderer(notationRef.current, VF.Renderer.Backends.SVG);
            renderer.resize(800, 200);
            const context = renderer.getContext();

            const stave = new VF.Stave(10, 40, 400);
            stave.addClef("treble").addTimeSignature("4/4");
            stave.setContext(context).draw();

            const notes = [
                new VF.StaveNote({ keys: ["C/4"], duration: "q" }),
                new VF.StaveNote({ keys: ["D/4"], duration: "q" }),
                new VF.StaveNote({ keys: ["E/4"], duration: "q" }),
                new VF.StaveNote({ keys: ["F/4"], duration: "q" }),
            ];

            const voice = new VF.Voice({ num_beats: 4, beat_value: 4 }).addTickables(notes);
            new VF.Formatter().format([voice], 400);
            voice.draw(context, stave);
        }

        clearSVG();
        renderNotation();

        if (notationRef.current) {
            // Assign IDs or classes to notes for D3 selection
            const svg = d3.select(notationRef.current).select('svg');
            const noteHeads = svg.selectAll('.vf-notehead').nodes();
            noteHeads.forEach((noteHead, index) => {
                d3.select(noteHead).attr('data-note-id', index);
            });

            svg.selectAll('.vf-notehead')
                .on('click', function(event, d) {
                    if (selectedNote === null)
                    {
                        d3.select(this).attr('fill', 'red');
                        setSelectedNote(d3.select(this));
                    }
                    else if (d3.select(this).attr('data-note-id') !== selectedNote.attr('data-note-id'))
                    {
                        
                    }
                })
        }
    }, []);

    return <div ref={notationRef}></div>;
};

export default MusicEditor;
