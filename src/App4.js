import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';

function CropDemo({ src }) {
    const [crop, setCrop] = useState({ aspect: 16 / 9 });
    return <ReactCrop src={src} crop={crop} onChange={newCrop => setCrop(newCrop)} />;
}

const App4 = () => {
    const [cropDataURL, setCropDataURL] = useState(null);

    const loadImage = (evt) => {
        const file = evt.target.files[0]
        const dataURL = URL.createObjectURL(file)
        setCropDataURL(dataURL)
    }

    return (
        <div>
            <input type="file" onChange={(evt) => loadImage(evt)} />
            <CropDemo src={cropDataURL} />
        </div>
    );
}
export default App4;