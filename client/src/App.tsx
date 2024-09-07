import React, { useState } from "react";
import { VideoPlayer } from "6pp";

function App() {
  const [quality, setQuality] = useState<number>(480);
  return (
    <div className="font-mono">
      <h1>Video Streaming App</h1>
      <VideoPlayer src="http://localhost:3000/video" setQuality={setQuality} />
    </div>
  );
}

export default App;
