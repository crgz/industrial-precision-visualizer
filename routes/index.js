var express = require('express');
var router = express.Router();
var path = require('path');
var formidable = require('formidable'),
	http = require('http'),
	util = require('util'),
	fsExtra   = require('fs-extra');
var util = require('util'),
	stream = require('stream'),
	es = require("event-stream");
//Events
var events = require('events');
var eventEmitter = new events.EventEmitter();
var Line = require(path.join(__dirname, '..', 'libs', 'Line.js'));
var ScoresProcessor = require(path.join(__dirname, '..', 'libs', 'ScoresProcessor.js'));
 
/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'My App!!'});
});

router.post('/', function(req, res){
    console.log("Request handler 'upload' was called.");    
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        console.log("parsing done. files.data.name: "+files.data.name);
    });    
    form.on('end', function(fields, files) {
        console.log("File received.");        
        var temp_path = this.openedFiles[0].path; //Temporary location of our uploaded file        
        var file_name = this.openedFiles[0].name; //The file name of the uploaded file
        var pathname = path.join(req.app.get('uploads'),file_name) ; // Final location the uploaded file   
        fsExtra.copy(temp_path, pathname, function(err) {  
            if (! err) {
                console.log("success!");                
                var scoresProcessor = new ScoresProcessor(req.app.get('mappings'), eventEmitter);
                var s = fsExtra.createReadStream(pathname)
	                .pipe(es.split())
	                .pipe(es.mapSync(function(line){	
	                    s.pause(); //pause the readstream
						var logEntry = new Line(line);
	                    (function(){// process line here and call s.resume() when ready
	                    	scoresProcessor.process(logEntry);
	                        s.resume(); // resume the readstream
	                    })();
	                })
	                .on('error', function(){
	                    console.log('Error while reading file.');
	                })
	                .on('end', function(){
	                    console.log('Read entirefile.');
	                })
                );       
            } else {
                console.error(err);
            }
        });       
    });
    form.on('progress', function(bytesReceived, bytesExpected) {
        var percent_complete = (bytesReceived / bytesExpected) * 100;
        console.log(percent_complete.toFixed(2));
    });
    form.on('error', function(err) {
        console.error(err);
    });
});

router.get('/stream', function(req, res) {
	req.socket.setTimeout(30000); // let request last as long as possible
	res.writeHead(200, {"Content-Type":"text/event-stream", "Cache-Control":"no-cache, no-store, must-revalidate", "Connection":"keep-alive"});	
	res.write("retry: 10000\n");
	var messageCount = 0;	  
	eventEmitter.on('labels', function submitLabels(message) {
		console.log('On router message: ' + ' ' + message);
		res.write("event: labels\n");
		res.write('id: ' + messageCount + '\n');
		res.write("data: " + message + '\n\n'); // Note the extra newline
		messageCount++; // Increment our message count
	});
	eventEmitter.on('message', function submitValues(message) {
		console.log('On router message: ' + ' ' + message);
		res.write("event: message\n");
		res.write('id: ' + messageCount + '\n');
		res.write("data: " + message + '\n\n'); // Note the extra newline
		messageCount++; // Increment our message count
	});
	eventEmitter.on('close', function closeStream() {
		console.log('closeStream: ');
		res.write("event: close\n");
		res.write('id: CLOSE\n');
		res.write("data: CLOSE\n\n"); // Note the extra newline
	});
	req.on("close", function() {
		console.log('Browser closed.');
	});
});

module.exports = router;