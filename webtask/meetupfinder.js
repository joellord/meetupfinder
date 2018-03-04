var express    = require('express');
var Webtask    = require('webtask-tools');
var bodyParser = require('body-parser');
var axios = require("axios");

var app = express();

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendStatus(200);
});

app.get("/meetups", function (req, res) {
    var query = req.query;
    console.log("Fetching meetups for " + req.query.location);
    var url = "https://api.meetup.com/find/groups?key=" + req.webtaskContext.secrets.MEETUP_KEY + "&sign=true&photo-host=public&category=34&fields=last_event&fallback_suggestions=0";
    if (req.query.lat && req.query.lon) {
        url += "&lat=" + req.query.lat + "&lon=" + req.query.lon
    } else {
        url += "&location=" + req.query.location;
    }

    axios(url).then(function(response) {
        //Try to return empty array when no meetups are found instead of the
        // "relevant" meetups suggested by the api
        if (query.location && !query.location.match(/ott/ig) && response.data[0].city == "Ottawa") {
            res.send([]);
        } else {
            res.send(response.data);
        }
    }).catch(function(e) {
        console.log("Oh fuck", e);
    });
});

module.exports = Webtask.fromExpress(app);
