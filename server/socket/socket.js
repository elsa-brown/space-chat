// vendor APIs for translation and sentiment analysis of messages
const { translate, indico } = require('../vendor');

// the languages array behaves like 'state' for our server
let languages = [];

module.exports = (namespace, io) => {
  console.log('setting up namespace', namespace)

  // create namespace at designated socket.io path
  const nsp = io.of(`/${namespace}`);

  nsp.on('connection', socket => {
    console.log(`new socket ${socket.id} connected to namespace ${nsp.name}`)

    // send current roster to the new client
    Object.keys(nsp.clients().connected).forEach(id => 
      socket.emit('roster addition', id)
    );

    /* ---- socket disconnect ---- */
    socket.on('close me', language => {
      let deleteId = socket.id
      console.log('disconnecting socket', deleteId, ' with language ', language)

      // if closing the final socket in a language channel, remove that language from state
      if (nsp.adapter.rooms[language] && nsp.adapter.rooms[language].length === 1) {
        languages = languages.filter(lang => lang !== language)
      }
      console.log('all languages on server state are: ', languages)

      // emit id of deleted socket to other connected sockets
      io.of(namespace).emit('roster deletion', deleteId)

      socket.disconnect()
    })

    /* ---- socket joins scene ---- */
    socket.on('join request', language => {
      console.log('socket ', socket.id, ' joined channel! lang: ', language)

      // add language to state if it is not already stored
      languages.includes(language) ? null : languages.push(language);
      console.log('all languages on server state are: ', languages)

      // subscribe socket to language channel
      socket.join(language)

      // emit new socket id to other connected sockets
      // ^ might need debugging (|| change to mirror ln 56, add check client-side)
      io.of(namespace).emit('roster addition', socket.id)

    })

    /* ---- socket receives message from client ---- */
    socket.on('message', ({ messageText, lang }) => {
      console.log('new spoken message! server emitting original text: ', messageText)
      let translatedBool = false
       
      // 1) emit message to all sockets in sender's language channel
      socket.to(lang).emit('got message', { translatedBool, messageText, lang })

      // 2) send message to API for translation
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

      // 3) send message to indico for analysis
      indico.analyzeText([messageText], { apis: ['personality', 'sentiment', 'emotion'] })
        .then(data => {
          // add socket id to data payload
          data.speaker = socket.id
           console.log('DATA', data)
          // io.of(namespce).emit sends to ALL sockets in namespace, INCL original sender
          io.of(namespace).emit('got sentiment', data)
        })
        .catch(console.error)
    })
  })
};
