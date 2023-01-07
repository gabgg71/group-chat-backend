const {google} = require("googleapis");
const { createConnection} = require('../configuration/google-conf.js');

const defaultScope = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ];
  
  const getConnectionUrl=(auth)=> {
    return auth.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent', 
      scope: defaultScope
    });
  }

  
  const urlGoogle=()=> {
    const auth = createConnection(); 
    const url = getConnectionUrl(auth);
    return url;
  }

  function getGooglePeopleApi(auth) {
    return google.people({ version: 'v1', auth });
  }

  const getGoogleAccountFromCode=async(code) =>{
    try {
      const auth = createConnection();
      const data = await auth.getToken(code);
      const tokens = data.tokens;
      auth.setCredentials(tokens);
      const people = getGooglePeopleApi(auth);
      const me = await people.people.get({ resourceName: 'people/me', personFields: 'names,emailAddresses,photos' });
      let info = me.data;
      return {
        id: info.resourceName.split('/')[1],
        email: info.emailAddresses[0].value,
        name: info.names[0].displayName,
        img: info.photos ? info.photos[0].url: null,
        tokens: tokens,
      };
      
    } catch (error) {
      console.log(`error ${error}`)
      
    }
  }

  module.exports = {
    urlGoogle,
    getGoogleAccountFromCode
  }