import React from 'react';
import { useSnapshot } from 'valtio';

import state from '../store';

const Outro = () => {
    const snap = useSnapshot(state);

    function reloadPage() {
        location.reload();
    }

    return (
        <>
            {
                snap.isEnd && (
                    <div className="outro">
                        <div className="intro">
                            <h3 className="outro__text">Thanks for visiting <br /><br /> <span>SEWP WORLD HQ</span> </h3>
                            <button 
                                className="explore"
                                onClick={reloadPage}
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Outro