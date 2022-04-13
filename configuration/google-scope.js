const { createConnection} = require('../configuration/google-conf.js');

const defaultScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
  ];
  
  const getConnectionUrl=(auth)=> {
    return auth.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
      scope: defaultScope
    });
  }
  
  const urlGoogle=()=> {
    const auth = createConnection(); // this is from previous step
    const url = getConnectionUrl(auth);
    return url;
  }

  function getGooglePlusApi(auth) {
    return google.plus({ version: 'v1', auth });
  }

  const getGoogleAccountFromCode=async(code) =>{
    console.log(`recibi este codigo ${code}`);
    const data = await auth.getToken(code);
    console.log(`respuesta ${data}`);
    const tokens = data.tokens;
    const auth = createConnection();
    auth.setCredentials(tokens);
    const plus = getGooglePlusApi(auth);
    const me = await plus.people.get({ userId: 'me' });
    const userGoogleId = me.data.id;
    const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
    return {
      id: userGoogleId,
      email: userGoogleEmail,
      tokens: tokens,
    };
  }

  module.exports = {
    urlGoogle,
    getGoogleAccountFromCode
  }