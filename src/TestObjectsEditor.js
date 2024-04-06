import React, { useEffect, useRef, useState } from 'react';
import Vex, { Formatter } from 'vexflow';
import * as d3 from 'd3';

const TestObjectsEditor = () => {
    const notationRef = useRef(null);
    const [selectedNote, setSelectedNote] = useState(null);
    const stave1 = useRef(null);
    const context = useRef(null);
    const VF = Vex.Flow;
    const voicesStave1 = [];
    
    
    const renderNotation2 = () => {    
        const notes = [
            new VF.StaveNote({ keys: ["D/4"], duration: "q" }),
            new VF.StaveNote({ keys: ["F/4"], duration: "q" }),
            new VF.StaveNote({ keys: ["G/4"], duration: "q" }),
            new VF.StaveNote({ keys: ["F/4"], duration: "q" }),
        ];

        const voice = new VF.Voice({ num_beats: 4}).addTickables(notes);
        voicesStave1.push(voice);
        renderVoices(stave1.current);
    }


    const renderVoices = (stave) => {
        new Formatter().joinVoices(voicesStave1).format(voicesStave1, 400);
        voicesStave1.forEach(function (v)
        {
            v.draw(context.current, stave)
        });
    }

    useEffect(() => {
        const clearSVG = () => {
            if (notationRef.current) {
                notationRef.current.innerHTML = '';
            }
        }

        const renderNotation = () => {
            const renderer = new VF.Renderer(notationRef.current, VF.Renderer.Backends.SVG);
            renderer.resize(800, 200);
            context.current = renderer.getContext();

            stave1.current = new VF.Stave(10, 40, 400);
            stave1.current.addClef("treble").addTimeSignature("4/4");
            stave1.current.setContext(context.current).draw();

            const notes = [
                new VF.StaveNote({ keys: ["C/4"], duration: "q" }),
                new VF.StaveNote({ keys: ["D/4"], duration: "q" }),
                new VF.StaveNote({ keys: ["E/4"], duration: "q" }),
                new VF.StaveNote({ keys: ["F/4"], duration: "q" })
            ];

            const voice = new VF.Voice({ num_beats: 4}).addTickables(notes);
            console.log(voice.getTickables());
            voicesStave1.push(voice);
            renderVoices(stave1.current);
            voice.getTickables()[0].keys = ["F/4"];
            console.log("keys: " + voice.getTickables()[0].keys)
            renderVoices(stave1.current);
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

    return <div>
        <div ref={notationRef}>
            
        </div>
        <div>
            <button onClick={renderNotation2}>Click me</button>
        </div>
    </div>;
};

export default TestObjectsEditor;
