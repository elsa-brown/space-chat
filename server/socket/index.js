const { scenes, socketUtils } = require('./utils');

const initializeNamespaces = (io) => {
  scenes.forEach(scene => socketUtils(scene, io))
}

module.exports = (io) => initializeNamespaces(io);
