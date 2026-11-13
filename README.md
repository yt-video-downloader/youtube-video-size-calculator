# YouTube video size calculator

Estimate how big a YouTube video will be as an MP4 in 360p, 480p, 720p and 1080p, from its length alone. Useful before saving videos to a phone with little space left or downloading over mobile data.

**Use it in your browser:** https://yt-video-downloader.github.io/youtube-video-size-calculator/

## What it does

- Takes a length in any common form: `10`, `10:35`, `1:02:03`, `1h 20m`, `45 min`
- Shows the estimated size for each quality, with a low to high range
- Adjusts for the kind of video: calm talking videos are smaller, gaming and sports are bigger
- Tells you how many videos of that size fit in the free space you enter

## The numbers

Per minute of H.264 MP4 with AAC audio:

| Quality | Per minute | 10 minutes |
| --- | --- | --- |
| 1080p | 15 to 30 MB | 150 to 300 MB |
| 720p | 8 to 13 MB | 80 to 130 MB |
| 480p | 4 to 6 MB | 40 to 60 MB |
| 360p | 2 to 3 MB | 20 to 30 MB |

These are estimates. Every upload is encoded differently, so a real file can be a little smaller or bigger. A downloader that reads the actual streams, like [YT Video Downloader](https://yt-video-downloader.net/), shows the exact size before you download.

## Use the code

`docs/size.js` is a small dependency-free module:

```js
import { parseDuration, estimate, formatMB } from "./size.js";

const seconds = parseDuration("10:35");
for (const r of estimate(seconds, 0.5)) console.log(r.label, formatMB(r.mb));
```

## Test

```sh
npm test
```

## License

MIT
