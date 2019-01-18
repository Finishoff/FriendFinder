var path = require("path");
var fs = require("fs");
var friends = require("../data/friends.js");

module.exports = (app) => {
    app.get("/api/friends", (req, res) => {
        res.json(friends);
    });

    app.post("/api/friends", (req, res) => {
        var newUser = req.body;

        var newFriend = {};
        var closeness = 50;

        for(var i = 0; i < friends.length; i++) {
            var totalDifference = 0;

            for(var j = 0; j < newUser.scores.length; j++) totalDifference += Math.abs(parseInt(newUser.scores[j]) - parseInt(friends[i].scores[j]));

            if(totalDifference < closeness) {
                closeness = totalDifference;
                newFriend = friends[i];
            }
        }

        friends.push(newUser);

        fs.writeFileSync(path.join(__dirname, "../data/friends.js"), "module.exports = " + JSON.stringify(friends, null, 4));
        res.json(newFriend);
    });
}