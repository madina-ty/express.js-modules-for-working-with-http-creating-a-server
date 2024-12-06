const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const filesDir = path.join(__dirname, 'files');

function readFile(fileName, res) {
    const filePath = path.join(filesDir, `${fileName}.txt`);
    
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.status(404).send('Извините, ваш запрос недоступен');
      } else {
        res.send(data);
      }
    });
  }

app.get('/:topic',(req, res)=> {
    const topic = req.params.topic.toLowerCase();

    if (['web', 'csharp', 'gamedev', 'database'].includes(topic)) {
        readFile(topic, res);
      } else {
        res.status(404).send('Извините, ваш запрос недоступен');
      }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });