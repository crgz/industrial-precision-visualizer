This an experimental [end to end](https://en.wikipedia.org/wiki/End-to-end_principle) [event streamed](https://en.wikipedia.org/wiki/Event_stream_processing) [real-time data](https://en.wikipedia.org/wiki/Real-time_data) Monitoring tool that leverages on Node.js event-driven, [non-blocking asynchronous I/O](https://en.wikipedia.org/wiki/Asynchronous_I/O) model to push updates using [Server-Sent Events](https://en.wikipedia.org/wiki/Server-sent_events) [time series](https://en.wikipedia.org/wiki/Time_series) to a very simple [Single Page Application](https://en.wikipedia.org/wiki/Single-page_application).

<a href="https://commons.wikimedia.org/wiki/File:Genesis_laser_harp_beam_output.jpg">
    <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Genesis_laser_harp_beam_output.jpg" alt="By Franck Morisseau (Own work) [CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0)], via Wikimedia Commons"  align="right" width="60%" style="border:5px solid white"/>
</a>

## 💡 Synopsis

The MRSI_VISION.log file is from from an automated advanced manufacturing equipment that attaches a lens on an optical engine (a PCB with microelectronics that drives a laser).

The equipment/machine accepts a tray of optical engines to which it attaches a lens. After the attachment process, the machine takes 8 pictures of the attached lens at various areas of the assembly and compares these images to their reference images. Based on the slight variances in measurements between the actual image and reference images, the machine assigns a score (from 0 to 100). The higher the score, the closer the result is to the desired specifications.

The “human-parsed-log.xlsx” file is intended to get some sense of what pieces of information we are interested in. The events column contains the key pieces of information that the engineers in are interested in—specifically, the current image that’s being processed as well as the results of its score.

Each image file represents a unique "measurement”. So there are a set of 8 unique measurements (and thus, images) and their resulting scores. Each measurement must be plotted as part of its own series in the chart. The catch is that the set of 8 images can be updated by an engineer when a batch of work is completed. (Meaning, a given set of 8 will be in effect for a period of time than another 8 might be introduced in the log. You can distinguish this change by time increments.)

<img align="left" src="./docs/Peek 2017-10-09 18-01.gif?raw=true" width="60%" style="border:20px solid white">

Each image-set/series can simply be labelled using their image filenames but you can refer to the “filename-mappings.csv” to map them to nice names.

This solution works as follow:
* Upload a log file  onto a web service/app.
* Parse and extract the scores from the raw log file.
* Generates a visualization that plots the scores onto a time series graph.

## 💾 Installation

```bash
	npm install
```
## ⚙️ Execution

```bash
	node bin/www
```
## ▶️ Usage

* In Google Chrome open: http://localhost:3000.
* Choose test data file "MRSI_VISION.LOG" located in the doc folder.
* Click the Upload button.

## 🎁 Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## 🎓 License
This experiment is released under the [MIT License](http://www.opensource.org/licenses/MIT).
