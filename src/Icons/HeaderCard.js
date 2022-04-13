import React from 'react';
import Typical from 'react-typical';

export default function HeaderCard(props) {
    return (
        <div className='pageHeader'>
            <Typical
               loop = {Infinity}
               wrapper = "b"
               steps = { [ 
                   props.pageName,
                   1000
               ]}
               />
        </div>
    )
}
