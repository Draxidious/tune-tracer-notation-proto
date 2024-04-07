import React, { useEffect, useRef, useState } from 'react';
import Vex, { Formatter } from 'vexflow';
import * as d3 from 'd3';
import {Score} from './Score.js';

const TestObjectsEditor = () => {
    const notationRef = useRef(null);
    useEffect(() => {
        const clearSVG = () => {
            if (notationRef.current) {
                notationRef.current.innerHTML = '';
            }
        }

        const renderNotation = () => {
           let score = new Score(notationRef.current, 10, 40, 200);
        }

        clearSVG();
        renderNotation();
        
    }, []);

    return <div>
        <div ref={notationRef}>
            
        </div>
        <div>
            <button>Click me</button>
        </div>
    </div>;
};

export default TestObjectsEditor;
