code-challenge
==============

A simple systems integration code challenge for candidates.


TL;DR version
-------------
Parse MRSI_VISION.log and generate plot.png


Detailed Instructions
---------------------

Our engineers would like to have the ability to upload a log file (ex. MRSI_VISION.log) onto a web service/app (your solution) that generates a visualization (i.e. plots the scores onto a time series graph; see example plot, “plot.png”). The log file is from from an automated advanced manufacturing equipment that attaches a lens on an optical engine (a PCB with microelectronics that drives a laser).

The equipment/machine accepts a tray of optical engines to which it attaches a lens. After the attachment process, the machine takes 8 pictures of the attached lens at various areas of the assembly and compares these images to their reference images. Based on the slight variances in measurements between the actual image and reference images, the machine assigns a score (from 0 to 100). The higher the score, the closer the result is to the desired specifications.

Note that your solution must parse and extract the scores from the raw log file (MRSI_VISION.log). Refer to the “human-parsed-log.xlsx” file to get some sense of what pieces of information we are interested in. The events column contains the key pieces of information that the engineers in are interested in—specifically, the current image that’s being processed as well as the results of its score.

Also note that each image file represents a unique "measurement”. So there are a set of 8 unique measurements (and thus, images) and their resulting scores. Each measurement must be plotted as part of its own series in the chart. The catch is that the set of 8 images can be updated by an engineer when a batch of work is completed. (Meaning, a given set of 8 will be in effect for a period of time than another 8 might be introduced in the log. You can distinguish this change by time increments.)

Each image-set/series can simply be labelled using their image filenames but you can refer to the “filename-mappings.csv” to map them to nice names for extra credit.

Feel free to use your favorite scripting language as well as any open source frameworks to get to your solution quickly. If you feel that the solution is not doable in 4 hours or less, feel free to describe your solution approach instead.


Deliverable
-----------
The deliverable is a screencast no more than 15 minutes long walking us through your solution and highlighting areas that were especially challenging or interesting to you. Please submit your solution and screencast in English. Thanks!
