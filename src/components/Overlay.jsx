import { useProgress } from '@react-three/drei'
import React from 'react';
import { useSnapshot } from 'valtio';

import state from '../store';

const Overlay = () => {
    const snap = useSnapshot(state);

    const loadPage = () => {
        state.play = true;
        return state.isPlaying = true;
    }

    return (
        <>
            {
                !snap.isPlaying && (
                    <div className="overlay">
                        <div className="intro">
                            <h1 className="logo">SEWP WORLD HQ</h1>
                            <button 
                                className="explore"
                                onClick={loadPage}
                            >
                                Explore
                            </button>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Overlay