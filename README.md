This an [end to end](https://en.wikipedia.org/wiki/End-to-end_principle) [streamed](https://en.wikipedia.org/wiki/Event_stream_processing)
 [Single Page Application](https://en.wikipedia.org/wiki/Single-page_application)  that minimize processing time using [non-blocking asynchronous I/O](https://en.wikipedia.org/wiki/Asynchronous_I/O) and visualization time by  [pushing](https://en.wikipedia.org/wiki/Server-sent_events)  [real-time](https://en.wikipedia.org/wiki/Real-time_data) events to a [time series](https://en.wikipedia.org/wiki/Time_series) chart.

<a href="https://commons.wikimedia.org/wiki/File:Genesis_laser_harp_beam_output.jpg">
    <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Genesis_laser_harp_beam_output.jpg" alt="By Franck Morisseau (Own work) [CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0)], via Wikimedia Commons"  align="right" width="60%" style="border:5px solid white"/>
</a>

## 💡 Synopsis

An automated advanced manufacturing equipment attaches a lens on an optical engine (a PCB with microelectronics that drives a laser).

The equipment accepts a tray of optical engines with attached lens. The machine takes 8 pictures of the attached lens at various angles and compares them against a reference after the process. The machine assigns a score (from 0 to 100) based on the slight variances in measurements between the actual image and reference. The higher the score, the closer the result is to the desired specifications. The MRSI_VISION.log file stores these results.

The events column of the "human-parsed-log.xlsx" contains the image and the results of its score. Each image file name represents a unique "measurement". So 8 unique measurements (images) and their resulting scores. Each series in the chart plot its own measurement. The catch is that, an engineer can update the set of 8 images when a batch is done. (Meaning, a given set of 8 will be in effect for a period of time than another 8 might be introduced in the log. You can distinguish this change by time increments).

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
