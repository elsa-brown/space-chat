const scenes = require('./constants');
const socket = require('./socket');

const initializeNamespaces = (io) => {
  scenes.forEach(scene => socket(scene, io))
}

module.exports = (io) => initializeNamespaces(io);
