const express = require("express");
const jsonData = require("./messages.json");

const PORT = process.env.PORT || 3001;
const app = express();

app.get("/api/messages", (req, res) => {
    let jsonData = require('./messages.json');
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(jsonData));

});

app.get("/api/chat/:roomID", (req, res) => {
    let jsonData = require('./messages.json');
    const roomMessages = jsonData.filter(function (room) {
        return room.roomId === +req.params.roomID;
    })
    res.setHeader('Content-Type', 'application/json');
    res.json(roomMessages);
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
