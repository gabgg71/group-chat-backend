const axios = require('axios')

const DataGit =(requestToken)=>{
  try {
    return axios({
      method: 'post',
      url: `https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID_GIT}&client_secret=${process.env.CLIENT_SECRET_GIT}&code=${requestToken}`,
      headers: {
          accept: 'application/json'
      }
    }).then((response) => {
      access_token = response.data.access_token
      if(access_token){
        return axios({
          method: 'get',
          url: `https://api.github.com/user`,
          headers: {
            Authorization: 'token ' + access_token
          }
        }).then((response2) => {
        let {login, name, email, bio, avatar_url } = response2.data
        return {
          user:login, 
          name, 
          email, 
          bio, 
          img: avatar_url
        }
        })
      }
  })
  } catch (error) {
    console.log(`hay un error ${error}}`)
  }

}

  module.exports = {
    DataGit
  }