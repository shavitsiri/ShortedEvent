import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar-edit';

export default function UploadAvatar() {
    const [src, setSrc] = useState(null);
    const [priview, setPriview] = useState(null);

    const onClose = () => {
        setPriview(null);
    }

    const onCrop = (view) => {
        setPriview(view);
    }
    
    return (
        <div>
            <Avatar 
            width={400}
            height={300}
            onCrop={onCrop}
            onClose={onClose}
            src={src}
            />
            
        </div>
    )
}
