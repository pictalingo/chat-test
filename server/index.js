const express = require("express");
const jsonData = require("./messages.json");

const PORT = process.env.PORT || 3001;
const app = express();

app.get("/api/messages", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(jsonData));

});

app.get("/api/chat/:roomID", (req, res) => {

    let responseJson = {};

    if (req.params.roomID !== "undefined") {

        const roomMessages = jsonData.filter(function (room) {
            return room.roomId === +req.params.roomID;
        });

        const messageNumber = Math.floor(Math.random() * roomMessages[0].body.length);
        responseJson = roomMessages[0].body[messageNumber];

    }

    res.setHeader('Content-Type', 'application/json');
    res.json(responseJson);
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
