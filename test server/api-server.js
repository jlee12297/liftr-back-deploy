const express = require("express");
const cors = require("cors");
const authConfig = require("../auth_config.json");
const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const routes = require('../controllers');

const app = express();

const port = process.env.API_PORT || 3001;
const appPort = process.env.SERVER_PORT || 3000;
const appOrigin = authConfig.appOrigin || `http://localhost:${appPort}`;

if (!authConfig.domain || !authConfig.audience) {
    throw new Error(
        "Please make sure that auth_config.json is in place and populated"
    );
}

const authorizeAccessToken = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
    }),
    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithms: ["RS256"]
});

// app.use(authorizeAccessToken);
app.use(routes);
app.use(cors({ origin: appOrigin }));

app.get("/api/public", (req, res) => {
    res.send({
        msg: "You called the public API!"
    });
});

app.get("/api/protected", authorizeAccessToken, (req, res) => {
    res.send({ msg: "You hit the protected endpoint." })
})

app.listen(port, () => console.log(`API Server listening on port ${port}`));





























// const express = require('express');
// const routes = require('./controllers');
// const cors = require("cors");
// const authConfig = require("./src/auth_config.json");


// const sequelize = require('./config/connection');


// const app = express();
// const PORT = process.env.PORT || 3001;
// const appPort = process.env.SERVER_PORT || 3000;
// const appOrigin = authConfig.appOrigin || `http://localhost:${appPort}`;


// if (!authConfig.domain || !authConfig.audience) {
//     throw new Error(
//         "Please make sure that auth_config.json is in place and populated"
//     );
// }

// app.use(cors({ origin: appOrigin }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(routes);


// //GMS this is the endpoint to hit for the public API that will be integrated with AUTH0.
// app.get("/api/public", (req, res) => {
//     res.send({
//         msg: "Successfully calling the public API endpoint."
//     });
// });

// // Force: is a method that resets dB information, true wipes it, false does not.
// sequelize.sync({ force: false }).then(() => {
//     app.listen(PORT, () => console.log(`Now listening on Port ${PORT}`));
// });













// //GMS server app for serving our login token

// const express = require('express');
// const cors = require('cors');
// const app = express();

// app.use(cors());

// app.use('/login', (req, res) => {
//     res.send({
//         token: 'test123'
//     });
// });

// app.listen(8080, () => console.log('TokenServer is running on http://localhost:8080/login'));