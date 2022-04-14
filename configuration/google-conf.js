const {google} = require("googleapis");

const googleConfig = {
  clientId: process.env.CLIENT_ID, 
  clientSecret: process.env.CLIENT_SECRET, 
  redirect: process.env.REDIRECT
};


function createConnection() {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}

module.exports = {
  createConnection
}

