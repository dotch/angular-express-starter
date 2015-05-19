module.exports = {
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'A hard to guess string',
  MONGO_URI: process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME || process.env.MONGO_URI || 'localhost',
  FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || 'Facebook App Secret',
  GOOGLE_SECRET: process.env.GOOGLE_SECRET || 'Google Client Secret',
  TWITTER_KEY: process.env.TWITTER_KEY || 'Twitter Consumer Key',
  TWITTER_SECRET: process.env.TWITTER_SECRET || 'Twitter Consumer Secret',
  TWITTER_CALLBACK: process.env.TWITTER_CALLBACK || 'Twitter Callback Url',
};