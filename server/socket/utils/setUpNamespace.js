// vendor APIs for translation and sentiment analysis of messages
const { translate, indico } = require('../../vendor');

// store languages here, like 'state'
let languages = [];

module.exports = (namespace, io) => {
  console.log('setting up namespace', namespace)
  // create namespace as instance of io
  let nsp = io.of(`/${namespace}`)

  // set up socket listeners
  nsp.on('connection', socket => {
    console.log(`new socket ${socket.id} connected to namespace ${nsp.name}`)

    // send current roster to the new client
    // Object.keys(nsp.clients().connected).forEach(id => socket.emit('roster addition', id))

    socket.on('close me', language => {
      let deleteId = socket.id
      console.log('disconnecting socket with language ', language)
      // if this is the only socket left in a language channel
      if (nsp.adapter.rooms[language] && nsp.adapter.rooms[language].length === 1)
        // remove that language from state
        languages = languages.filter(lang => lang !== language)
      console.log('all languages on server state are: ', languages)
      // send out id of deleted socket to all other sockets in room
      io.of(namespace).emit('roster deletion', deleteId)
      // close socket
      socket.disconnect()
    })

    // when a socket joins room
    socket.on('join request', language => {
      console.log('socket ', socket.id, ' joined channel! lang: ', language)
      // check that language choice is not empty, and not already stored
        // ^ the first part of this check may no longer be necessary, due to the lang default bug fix
      if (language && languages.indexOf(language) === -1)
        // 1) store socket's selected language server-side
        languages.push(language)
      console.log('all languages on server state are: ', languages)
      // 2) subscribe socket to language channel
      socket.join(language)
      // send out id of new socket to all OTHER connected sockets in room
      // ^ might need debugging (|| change to mirror ln 56, add check client-side)
      io.of(namespace).emit('roster addition', socket.id)
    })

    // when a socket sends a spoken message as text
    socket.on('message', ({ messageText, lang }) => {
      console.log('new spoken message! server emitting original text: ', messageText)
      let translatedBool = false
       
      // 1) immediately send message exactly as received to all OTHER sockets in original language channel
      socket.to(lang).emit('got message', { translatedBool, messageText, lang })

      // 2) send text to API for translation
      languages.forEach(targetLang => {
        console.log('target lang in server state array: ', targetLang, 'orig lang: ', lang)
        if (targetLang !== lang ) {
          console.log('server translating message into ', targetLang)
          translate.translate(messageText, targetLang)
            .then(results => {
              // 3a) emit each translation to each language channel
              let translation = results[0]
              console.log('translation successful: ', translation)
              // server sends to all sockets in language channel
              nsp.in(targetLang).emit('got message', {
                translatedBool: true,
                messageText: translation,
                lang: targetLang })
            })
            .catch(console.error)
        }
      })

      // 3) send text to indico for analysis
      indico.analyzeText([messageText], { apis: ["personality", "sentiment", "emotion"] })
        .then(data => {
          // add socket id to data payload
          data.speaker = socket.id
           console.log("DATA", data)
          // io.of(namespce).emit sends to ALL sockets in namespace, INCL original sender
          io.of(namespace).emit('got sentiment', data)
        })
        .catch(console.error)

    })
  })
};

// const translateMessage = () =>{
//   if (targetLang !== lang ) {
//     console.log('server translating message into ', targetLang)
//     translate.translate(messageText, targetLang)
//       .then(results => {
//         // 3a) emit each translation to each language channel
//         let translation = results[0]
//         console.log('translation successful: ', translation)
//         // server sends to all sockets in language channel
//         nsp.in(targetLang).emit('got message', {
//           translatedBool: true,
//           messageText: translation,
//           lang: targetLang })
//       })
//       .catch(console.error)
//   }
// }
