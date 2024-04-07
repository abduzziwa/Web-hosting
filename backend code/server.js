// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// const cors = require('cors');
// const vhost = require('vhost'); // Require vhost middleware

// const app = express();
// app.use(cors());

// // Set up multer for file uploads
// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     // Extract directory path from the request
//     const directory = req.body.directory;
//     // Construct the absolute path
//     const absolutePath = path.resolve(directory);
//     // Create directory if it doesn't exist
//     if (!fs.existsSync(absolutePath)) {
//       fs.mkdirSync(absolutePath, { recursive: true });
//     }
//     // Set the destination path
//     cb(null, absolutePath);
//   },
//   filename: function(req, file, cb) {
//     // Set the file name to be the same as the original name
//     cb(null, file.originalname);
//   }
// });
// const upload = multer({ storage: storage });

// // Define route for handling file uploads
// app.post('/upload', upload.fields([
//   { name: 'htmlfile', maxCount: 1 },
//   { name: 'cssfile', maxCount: 1 },
//   { name: 'jsfile', maxCount: 1 }
// ]), (req, res) => {
//   // Prepare data for JSON
//   const jsonData = {
//     FullName: req.body.fullname,
//     Email: req.body.email,
//     PhoneNumber: req.body.phone,
//     DomainName: req.body.domain,
//     Directory: req.body.directory
//   };

//   const jsonFilePath = 'data.json';
//   let jsonDataArray = [];

//   try {
//     // Check if JSON file exists
//     if (fs.existsSync(jsonFilePath)) {
//       // File exists, read its content
//       const fileContent = fs.readFileSync(jsonFilePath, 'utf8');
//       // Parse the JSON content
//       if (fileContent.trim() !== '') {
//         jsonDataArray = JSON.parse(fileContent);
//       }
//     }
//   } catch (error) {
//     console.error('Error parsing JSON file:', error);
//   }

//   // Append new data to JSON array
//   jsonDataArray.push(jsonData);

//   // Write JSON data back to file
//   fs.writeFileSync(jsonFilePath, JSON.stringify(jsonDataArray, null, 2));

//   // Prepare data for CSV
//   const csvData = [{
//     FullName: jsonData.FullName,
//     Email: jsonData.Email,
//     PhoneNumber: jsonData.PhoneNumber,
//     DomainName: jsonData.DomainName,
//     Directory: jsonData.Directory
//   }];

//   // Check if CSV file exists
//   const csvFilePath = 'data.csv';
//   let csvFileExists = fs.existsSync(csvFilePath);

//   // Check if CSV file is empty
//   let csvFileIsEmpty = csvFileExists && fs.readFileSync(csvFilePath, 'utf8').trim() === '';

//   if (!csvFileExists || csvFileIsEmpty) {
//     // If CSV file doesn't exist or is empty, create it and write the headings
//     const csvWriter = createCsvWriter({
//       path: csvFilePath,
//       header: [
//         { id: 'FullName', title: 'Full Name' },
//         { id: 'Email', title: 'Email' },
//         { id: 'PhoneNumber', title: 'Phone Number' },
//         { id: 'DomainName', title: 'Domain Name' },
//         { id: 'Directory', title: 'Directory' }
//       ]
//     });

//     let csvWritePromise;
//     if (csvFileIsEmpty) {
//       // If CSV file is empty, write both headers and data
//       csvWritePromise = csvWriter.writeRecords([{}].concat(csvData));
//     } else {
//       // If CSV file exists but is not empty, append only data
//       csvWritePromise = csvWriter.writeRecords(csvData);
//     }

//     // Write headers or data to the CSV file
//     csvWritePromise
//       .then(() => {
//         console.log('CSV file created with headers and data');
//         csvFileExists = true;
//       })
//       .catch(error => {
//         console.error('Error writing to CSV file:', error);
//       });
//   } else {
//     // Append data to existing CSV file
//     const csvWriter = createCsvWriter({
//       path: csvFilePath,
//       header: [
//         { id: 'FullName', title: 'Full Name' },
//         { id: 'Email', title: 'Email' },
//         { id: 'PhoneNumber', title: 'Phone Number' },
//         { id: 'DomainName', title: 'Domain Name' },
//         { id: 'Directory', title: 'Directory' }
//       ],
//       append: true
//     });

//     // Append data to CSV file
//     csvWriter.writeRecords(csvData)
//       .then(() => {
//         console.log('Data appended to CSV file');
//       })
//       .catch(error => {
//         console.error('Error appending data to CSV file:', error);
//       });
//   }

//   // Generate virtual host configuration file
//   const domain = req.body.domain;
//   const subdomain = domain.split('.')[0];
//   const confFilePath = `virtual_hosts/${subdomain}.conf`;

//   const confContent = `
//     <VirtualHost *:80>
//       ServerName ${domain}
//       DocumentRoot /var/www/html/${subdomain}
//     </VirtualHost>
//   `;

//   // Ensure virtual_hosts directory exists
//   const virtualHostsDir = 'virtual_hosts';
//   if (!fs.existsSync(virtualHostsDir)) {
//     fs.mkdirSync(virtualHostsDir);
//   }

//   // Write or update the virtual host configuration file
//   fs.writeFileSync(confFilePath, confContent);

//   res.send('Files uploaded successfully and data saved to data.json and data.csv');
// });

// // Start the server
// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();
const port = 3000;

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // Extract directory path from the request
    const directory = req.body.directory;
    // Construct the absolute path
    const absolutePath = path.resolve(directory);
    // Create directory if it doesn't exist
    if (!fs.existsSync(absolutePath)) {
      fs.mkdirSync(absolutePath, { recursive: true });
    }
    // Set the destination path
    cb(null, absolutePath);
  },
  filename: function(req, file, cb) {
    // Set the file name to be the same as the original name
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// Define route for handling file uploads
app.post('/upload', upload.fields([
  { name: 'htmlfile', maxCount: 1 },
  { name: 'cssfile', maxCount: 1 },
  { name: 'jsfile', maxCount: 1 }
]), (req, res) => {
  // Prepare data for JSON
  const jsonData = {
    FullName: req.body.fullname,
    Email: req.body.email,
    PhoneNumber: req.body.phone,
    DomainName: req.body.domain,
    Directory: req.body.directory
  };

  const jsonFilePath = 'data.json';
  let jsonDataArray = [];

  try {
    // Check if JSON file exists
    if (fs.existsSync(jsonFilePath)) {
      // File exists, read its content
      const fileContent = fs.readFileSync(jsonFilePath, 'utf8');
      // Parse the JSON content
      if (fileContent.trim() !== '') {
        jsonDataArray = JSON.parse(fileContent);
      }
    }
  } catch (error) {
    console.error('Error parsing JSON file:', error);
  }

  // Append new data to JSON array
  jsonDataArray.push(jsonData);

  // Write JSON data back to file
  fs.writeFileSync(jsonFilePath, JSON.stringify(jsonDataArray, null, 2));

  // Prepare data for CSV
  const csvData = [{
    FullName: jsonData.FullName,
    Email: jsonData.Email,
    PhoneNumber: jsonData.PhoneNumber,
    DomainName: jsonData.DomainName,
    Directory: jsonData.Directory
  }];

  // Check if CSV file exists
  const csvFilePath = 'data.csv';
  let csvFileExists = fs.existsSync(csvFilePath);

  // Check if CSV file is empty
  let csvFileIsEmpty = csvFileExists && fs.readFileSync(csvFilePath, 'utf8').trim() === '';

  if (!csvFileExists || csvFileIsEmpty) {
    // If CSV file doesn't exist or is empty, create it and write the headings
    const csvWriter = createCsvWriter({
      path: csvFilePath,
      header: [
        { id: 'FullName', title: 'Full Name' },
        { id: 'Email', title: 'Email' },
        { id: 'PhoneNumber', title: 'Phone Number' },
        { id: 'DomainName', title: 'Domain Name' },
        { id: 'Directory', title: 'Directory' }
      ]
    });

    let csvWritePromise;
    if (csvFileIsEmpty) {
      // If CSV file is empty, write both headers and data
      csvWritePromise = csvWriter.writeRecords([{}].concat(csvData));
    } else {
      // If CSV file exists but is not empty, append only data
      csvWritePromise = csvWriter.writeRecords(csvData);
    }

    // Write headers or data to the CSV file
    csvWritePromise
      .then(() => {
        console.log('CSV file created with headers and data');
        csvFileExists = true;
      })
      .catch(error => {
        console.error('Error writing to CSV file:', error);
      });
  } else {
    // Append data to existing CSV file
    const csvWriter = createCsvWriter({
      path: csvFilePath,
      header: [
        { id: 'FullName', title: 'Full Name' },
        { id: 'Email', title: 'Email' },
        { id: 'PhoneNumber', title: 'Phone Number' },
        { id: 'DomainName', title: 'Domain Name' },
        { id: 'Directory', title: 'Directory' }
      ],
      append: true
    });

    // Append data to CSV file
    csvWriter.writeRecords(csvData)
      .then(() => {
        console.log('Data appended to CSV file');
      })
      .catch(error => {
        console.error('Error appending data to CSV file:', error);
      });
  }

  // Generate virtual host configuration file
  const confContent = `
<VirtualHost *:80>
    ServerAdmin webmaster@${jsonData.DomainName}
    DocumentRoot ${jsonData.Directory}
    ServerName ${jsonData.DomainName}
    ServerAlias www.${jsonData.DomainName}

    <Directory ${jsonData.Directory}>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog /var/log/httpd/${jsonData.DomainName}_error.log
    CustomLog /var/log/httpd/${jsonData.DomainName}_access.log combined
</VirtualHost>
`;

  const confFilePath = '/home/abdulz/Desktop/Web hosting/backend code/virtual_hosts/vhost.conf';

  // Append confContent to vhost.conf file
  fs.appendFileSync(confFilePath, confContent);

  // Send response based on success or failure
  const htmlFilePath = path.join(__dirname, jsonData.DomainName ? 'success.html' : 'failed.html');
  res.sendFile(htmlFilePath);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
