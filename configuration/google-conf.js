const {google} = require("googleapis");

const googleConfig = {
  clientId: "", 
  clientSecret: "", 
  redirect: ''
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

