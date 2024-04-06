import React, { useEffect, useRef, useState } from 'react';
import Vex from 'vexflow';

const MusicEditorClick = () => {
    const notationRef = useRef(null);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const renderNotation = () => {
            const VF = Vex.Flow;
            const renderer = new VF.Renderer(notationRef.current, VF.Renderer.Backends.SVG);
            renderer.resize(800, 200);
            const context = renderer.getContext();

            const stave = new VF.Stave(10, 40, 400);
            stave.addClef("treble").addTimeSignature("4/4");
            stave.setContext(context).draw();

            const newNotes = [
                new VF.StaveNote({ keys: ["C/4"], duration: "q" }),
                new VF.StaveNote({ keys: ["D/4"], duration: "q" }),
                new VF.StaveNote({ keys: ["E/4"], duration: "q" }),
                new VF.StaveNote({ keys: ["F/4"], duration: "q" }),
            ];

            let voice = new VF.Voice({ num_beats: 4, beat_value: 4 }).addTickables(newNotes);
            new VF.Formatter().format([voice], 400);
            voice.draw(context, stave);

            // Store the notes in state
            setNotes(newNotes);
            newNotes[0] = new VF.StaveNote({ keys: ["E/4"], duration: "q" })
            voice = new VF.Voice({ num_beats: 4, beat_value: 4 }).addTickables(newNotes);
            new VF.Formatter().format([voice], 400);
            voice.draw(context, stave);
        }

        renderNotation();
    }, []);

    const handleClick = (note) => {
        console.log('Clicked note:', note);
    };

    return (
        <div>
            <div ref={notationRef}></div>
            <div>
                <h2>Notes</h2>
                <ul>
                    {notes.map((note, index) => (
                        <li key={index} onClick={() => handleClick(note)}>
                            {note.keys.join(', ')} - {note.duration}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MusicEditorClick;
