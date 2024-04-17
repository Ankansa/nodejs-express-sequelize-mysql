const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const db = require("./API/models");
const app = express();
const {projectPort} = require('./API/load_env')

var corsOptions = {
    origin: "http://localhost:8081"
};

var indexRouter = require("./API/routes/index");
// Parse JSON bodies
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use("/", indexRouter);
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
// app.use("/api", (req, res) => {
//     res.json({ message: "Welcome to CRUD Application." });
// });


// Check for command-line arguments
const args = process.argv.slice(2); // Extract command line arguments excluding node and script name

// Determine the action based on command-line argument
if (args.includes("dsd")) {
    // Drop and re-sync db
    db.sequelize.sync({ force: true }).then(() => {
        console.log("Drop and re-sync db.");
        startServer();
    });
} else if (args.includes("sd")) {
    // Sync db
    db.sequelize.sync()
        .then(() => {
            console.log("Synced db.");
            startServer();
        })
        .catch((err) => {
            console.log("Failed to sync db: " + err.message);
        });
} else {
    // No valid command-line argument provided
    console.log("Invalid command-line argument. Use 'dsd' for Drop and re-sync db or 'sd' for Synced db.");
}

function startServer() {
    // set port, listen for requests
    const PORT = projectPort || 8080;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.visit http://localhost:8080/`);
    });
}
