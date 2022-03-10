require('dotenv').config();
const PORT = process.env.PORT;

const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const getTree = require('./getDirTree');
const uploadController = require('./uploadController');

app.use(express.json());
app.use(fileUpload());

app.get('/', (_, res) => {
  res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
});

app.get('/tree', async (_, res) => {
  try {
    const tree = await getTree(`./PUBLIC`);
    return res.json(tree);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Sever Error');
  }
});

app.post('/upload', uploadController);

app.use('/static', express.static('static'));
app.use('/PUBLIC', express.static('PUBLIC'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
