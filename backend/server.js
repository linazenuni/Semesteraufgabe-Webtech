const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const PORT = 3000;
const initdb = require('./initdb');

app.use('/initdb', initdb);
app.use(cors());

app.use(express.json());
app.use('/', routes);

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server started and listening on port ${PORT} ... `);
    }
});
