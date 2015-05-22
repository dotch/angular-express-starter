/*
* IMPORTANT
* if you set you keys and credentials directly in this file
* instead of using environment variables:
* Remove this file from version control. (put it in .gitignore)
* Otherwise people will be able to find your keys on Github.
* */

module.exports = {

  /*
  * This will be used to encrypt json web tokens.
  * */
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'A hard to guess string',

  /*
  * The MongoDB URL
  * */
  MONGO_URI: process.env.MONGOLAB_URI || process.env.MONGO_URI || 'localhost',

  /*
  * The Facebook App Secret.
  * remember to also set the App-ID in client/app.js
  * */
  FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || 'Facebook Secret',

  /*
  * The Google App Secret.
  * Remeber to also set the App-ID in client/app.js
  * */
  GOOGLE_SECRET: process.env.GOOGLE_SECRET || 'Google Secret',

  /*
  * Sendgrid Credentials
  * */
  sendgrid: {
    user: process.env.SENDGRID_USER || 'Sendgrid Username',
    password: process.env.SENDGRID_PASSWORD || 'Sendgrid Password'
  }

};