const scenes =  require('./sceneNames');
const setUpNamespace = require('./setUpNamespace');

const initializeNamespaces = (io) => {
  scenes.forEach(scene => setUpNamespace(scene, io))
}

module.exports = (io) => initializeNamespaces(io);
