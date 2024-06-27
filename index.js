const express = require("express");
const Stream = require("node-rtsp-stream");
const cors = require("cors");

const app = express();
const port = 3002;
let stream = null;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/stream", (req, res) => {
  const newRtspStreamUrl =
    "rtsp://CraneOCRUser:Admin@123@20.20.20.77/onvif-media/media.amp?profile=profile_1_h264&sessiontimeout=60&streamtype=unicast";
  let currentRtspStreamUrl = "";

  // Create the WebSocket stream only if it doesn't exist or the RTSP URL has changed
  if (!stream || currentRtspStreamUrl !== newRtspStreamUrl) {
    if (stream || newRtspStreamUrl === "stop") {
      stream.stop();
    }
    stream = new Stream({
      name: "Camera Stream",
      streamUrl: newRtspStreamUrl,
      wsPort: 9999,
      ffmpegOptions: {
        // options ffmpeg flags
        "-stats": "", // an option with no neccessary value uses a blank string
        "-r": 30, // options with required values specify the value after the key
        "-vf": "scale=-2:480"
      },
    });
    currentRtspStreamUrl = newRtspStreamUrl;
  }

  res.send(200).json({ url: `ws://127.0.0.1:9999` });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
