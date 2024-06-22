// components/SubwaySurfersVideo.js
import React from 'react';

const InteractiveVideo = ({videoId, shouldSetRight}) => {
    return (
        <div style={{ display:"flex", justifyContent:"center", marginTop:"2rem", position:'absolute', top:0, ...(shouldSetRight===true? { right: 0 } : {}) }}>
            <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
                allowFullScreen
                title="Subway Surfers Gameplay"
                style={{  height: '90vh' }}
            />
        </div>
    );
  };
  

export default InteractiveVideo;
