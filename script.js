const express = require('express'),
  app = express(),
  fs = require('fs'),
  shell = require('shelljs'),

  // Modify the folder path in which responses need to be stored
  folderPath = './Responses/',
  defaultFileExtension = 'json', // Change the default file extension
  bodyParser = require('body-parser'),
  DEFAULT_MODE = 'appendFile',
  path = require('path');

// Create the folder path in case it doesn't exist
shell.mkdir('-p', folderPath);

// Change the limits according to your response size
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => res.send('Hello, I write data to file. Send them requests!'));


app.post('/write', (req, res) => {
  let extension = req.body.fileExtension || defaultFileExtension;
  let fsMode = DEFAULT_MODE;
  let uniqueIdentifier = req.body.uniqueIdentifier ? typeof req.body.niqueIdentifier === 'boolean' ? Date.now() : req.body.uniqueIdentifier : false;
  let filename = `output`;
  // filename = `${req.body.requestName}${uniqueIdentifier || ''}`;
  let dataCount = Object.values(res).length;
  console.log(dataCount);

  let fileHead = dataCount < 1 ? "[" : "";
  let fileTail = dataCount == 0 ? "]" : ",";
  let fileData = "";
  fileData += req.body.responseData;
  let filePath = `${path.join(folderPath, filename)}.${extension}`;



  fs[fsMode](filePath, fileHead + fileData + fileTail, (err) => {
    if (err) {
      console.log(err);
      res.send('Error');
    }
    else {
      res.send('Success');
    }
  });

});

app.listen(3000, () => {
  console.log('ResponsesToFile App is listening now! Send them requests my way!');
  console.log(`Data is being stored at location: ${path.join(process.cwd(), folderPath)}`);
});