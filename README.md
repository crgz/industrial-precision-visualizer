The MRSI_VISION.log file is from from an automated advanced manufacturing equipment that attaches a lens on an optical engine (a PCB with microelectronics that drives a laser).

The equipment/machine accepts a tray of optical engines to which it attaches a lens. After the attachment process, the machine takes 8 pictures of the attached lens at various areas of the assembly and compares these images to their reference images. Based on the slight variances in measurements between the actual image and reference images, the machine assigns a score (from 0 to 100). The higher the score, the closer the result is to the desired specifications.

The “human-parsed-log.xlsx” file is intended to get some sense of what pieces of information we are interested in. The events column contains the key pieces of information that the engineers in are interested in—specifically, the current image that’s being processed as well as the results of its score.

Each image file represents a unique "measurement”. So there are a set of 8 unique measurements (and thus, images) and their resulting scores. Each measurement must be plotted as part of its own series in the chart. The catch is that the set of 8 images can be updated by an engineer when a batch of work is completed. (Meaning, a given set of 8 will be in effect for a period of time than another 8 might be introduced in the log. You can distinguish this change by time increments.)

Each image-set/series can simply be labelled using their image filenames but you can refer to the “filename-mappings.csv” to map them to nice names.

This solution works as follow:
* Upload a log file  onto a web service/app. 
* Parse and extract the scores from the raw log file.
* Generates a visualization that plots the scores onto a time series graph. 

Installation
----------
Running:

	npm install

from inside your app directory (i.e. where package.json is located) will install the dependencies for your app. These will be placed in ./node_modules relative to your package.json file.
