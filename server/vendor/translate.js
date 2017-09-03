// import the Google Cloud Translate API
const Translate = require('@google-cloud/translate')
// instantiate a client
const projectId = 'space-chat-166520'
const translate = Translate({
  projectId: projectId,
  keyFilename: './servicekey.json'
})

module.exports = translate;
