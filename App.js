import React, { useState } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs';

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState('');

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setResult('');
  };

  const runMobileNet = async () => {
    const img = document.getElementById('input-image');
    const model = await mobilenet.load();
    const predictions = await model.classify(img);
    setResult(JSON.stringify(predictions, null, 2));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Q-ROE Mobile PWA + TensorFlow.js MobileNet</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && (
        <>
          <img id="input-image" src={image} alt="Input" width="300" />
          <button onClick={runMobileNet}>Classify Image</button>
        </>
      )}
      {result && (
        <pre style={{ background: "#eee", padding: 10 }}>{result}</pre>
      )}
    </div>
  );
}

export default App;