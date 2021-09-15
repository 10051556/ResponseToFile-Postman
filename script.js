const { readFile } = require('fs/promises');

const express = require('express'),
    app = express(),
    fs = require('fs'),
    shell = require('shelljs'),
    $ = require('jquery')

// Modify the folder path in which responses need to be stored
path = require('path'),
    folderPath = './Responses/',
    defaultFileExtension = 'json', // Change the default file extension
    bodyParser = require('body-parser'),
    DEFAULT_MODE = 'appendFile';

// Create the folder path in case it doesn't exist
shell.mkdir('-p', folderPath);

// Change the limits according to your response size
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => res.send('Hello, I write data to file. Send them requests!'));

app.post('/write', (req, res) => {
    console.log("running")
    let extension = req.body.fileExtension || defaultFileExtension,
        fsMode = req.body.mode || DEFAULT_MODE,
        uniqueIdentifier = req.body.uniqueIdentifier ? typeof req.body.uniqueIdentifier === 'boolean' ? Date.now() : req.body.uniqueIdentifier : false,
        filename = `output`,
        // filename = `${req.body.requestName}${uniqueIdentifier || ''}`,
        filePath = `${path.join(folderPath, filename)}.${extension}`,
        options = req.body.options || undefined;

    console.log(req.body.responseCode);
    // fileData = req.responseCode;

    // fs.appendFile(filePath, fileData, (err) => {
    //     if (err) {
    //         console.log(err);
    //         res.send('Error');
    //     } else {
    //         res.send('Success');
    //     }
    // });

    $('#myTable').DataTable({
        // data: dataSet,
        fixedHeader: true,

        columns: [
            { data: responseName },
            { data: responseCode },
            // { data: "allTests.0.Validate schema" },
            // { data: "allTests.0.Response time is less than 10000ms" },
            // { data: "allTests.0.Status code is 200" },
            // { data: "allTests.0.Error is True" },
            // { data: "allTests.0.Code is Correct" },
        ]
    });
})



app.listen(3000, () => {
    console.log('ResponsesToFile App is listening now! Send them requests my way!');
    console.log(`Data is being stored at location: ${path.join(process.cwd(), folderPath)}`);
});

