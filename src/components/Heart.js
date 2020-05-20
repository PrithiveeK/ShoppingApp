import React from 'react';

const Heart = ({stroke, fill}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" id="svg1" viewBox="0 0 475.82 442.01" version="1.0">
            <g id="layer1" transform="translate(-134.07 -225.8)">
            <path id="path7" d="m263.42 235.15c-66.24 0-120 53.76-120 120 0 134.75 135.93 170.08 228.56 303.3 87.57-132.4 228.56-172.85 228.56-303.3 0-66.24-53.76-120-120-120-48.05 0-89.4 28.37-108.56 69.18-19.16-40.81-60.52-69.18-108.56-69.18z" 
            stroke={stroke} strokeWidth="20" fill={fill} />
            </g>
        </svg>
    );
};

export default Heart;