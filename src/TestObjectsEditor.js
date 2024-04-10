import React, { useEffect, useRef, useState } from 'react';
import Vex, { Formatter } from 'vexflow';
import * as d3 from 'd3';
import {Score} from './Score.js';

const TestObjectsEditor = () => {
    const notationRef = useRef(null);
    const score = useRef(null);
    const addNote = () =>
    {
        score.current.addNoteInMeasure(/*measure index*/ 0, /*keys*/["C/4","D/4"],/*duration*/"q", /*noteId*/"auto1016");
    }
    useEffect(() => {
        const clearSVG = () => {
            if (notationRef.current) {
                notationRef.current.innerHTML = '';
            }
        }

        const renderNotation = () => {
            // It seems that the measure width is separate from how
            // the formatter width works with voices. Subtracting 25 at when formatting helps the
            // notes fit better with a smaller staff. 
           score.current = new Score(notationRef.current, /*defaultx*/10, /*defaulty*/40, /*Measure Width*/325);
        }

        clearSVG();
        renderNotation();
        
    }, []);

    return <div>
        <div ref={notationRef}>
            
        </div>
        <div>
            <button onClick={addNote}>Add two notes on second beat</button>
        </div>
    </div>;
};

export default TestObjectsEditor;
