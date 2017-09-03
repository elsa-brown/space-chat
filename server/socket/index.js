const { scenes, setUpNamespace } = require('./utils');

const initializeNamespaces = (io) => {
  scenes.forEach(scene => setUpNamespace(scene, io))
}

module.exports = (io) => initializeNamespaces(io);
