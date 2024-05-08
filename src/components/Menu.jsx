import React from 'react';
import { useSnapshot } from 'valtio';

import state from '../store';

const menuLink = (cta) => {

    const ctaList = [
        {
            name: 'Training & Events'
        },
        {
            name: 'Storefront & Aquisition Tools'
        },
        {
            name: 'Contract Holders & Industry Providers'
        },
        {
            name: 'About SEWP'
        },
        {
            name: 'Procurement Policy & Regulation'
        },
        
    ]

    return (
        <li>
            <span></span>
            <button>{cta}</button>
        </li>
    )
}

const Menu = () => {
    const snap = useSnapshot(state);

  return (
    <>
        {
            !snap.isPlaying && (
                <div className='menu'>
                    <ul>
                        <li>
                            <span></span>
                            <button>Training & Events</button>
                        </li>
                        <li>
                            <span></span>
                            <button>Marketplace & Aquisition Tools</button>
                        </li>
                        <li>
                            <span></span>
                            <button>Contract Holders & Industry Providers</button>
                        </li>
                        <li>
                            <span></span>
                            <button>About SEWP</button>
                        </li>
                        <li>
                            <span></span>
                            <button>Procurement Policy & Regulation</button>
                        </li>
                    </ul>
                </div>
            )
        }
    </>
   
  )
}

export default Menu