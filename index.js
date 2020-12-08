const express = require('express');
const cors = require('cors');
const fs = require('fs');

const interval = 2000;

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    let rawdata = fs.readFileSync('room.json');
    let room = JSON.parse(rawdata);
    res.json(room);
});

app.get('/update', (req, res) => {
    let name = req.params.name;
    let rawdata = fs.readFileSync('room.json');
    let room = JSON.parse(rawdata);
    res.json(room);
});

app.get('/feedSpecial', (req, res) => {
    let rawdata = fs.readFileSync('room.json');
    let room = JSON.parse(rawdata);
    room.state = "feedSpecial";
    let data = JSON.stringify(room);
    fs.writeFileSync('room.json', data);

    setTimeout(()=>{
        let rawdata2 = fs.readFileSync('room.json');
        let room2 = JSON.parse(rawdata2);
        room2.state = "none";
        let data2 = JSON.stringify(room2);
        fs.writeFileSync('room.json', data2);
    },interval);
    res.json();
});

app.listen(process.env.PORT, () => {
    console.log('server is listening on port 2020');
});