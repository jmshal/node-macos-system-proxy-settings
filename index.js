var child_process = require('child_process');
var exec = child_process.exec;
var execSync = child_process.execSync;
var parseSettings = require('./parse-settings');

var command = 'scutil --proxy';

function getSettings(callback) {
  exec(command, function(err, output) {
    if (err) {
      callback(err, null);
    } else {
      try {
        var settings = parseSettings(output);
        callback(null, settings);
      } catch (err) {
        callback(err, null);
      }
    }
  });
}

function getSettingsSync() {
  var output = execSync(command);
  var settings = parseSettings(output);
  return settings;
}

function getSettingsAsync() {
  return new Promise(function(resolve, reject) {
    getSettings(function(err, settings) {
      if (err) {
        reject(err);
      } else {
        resolve(settings);
      }
    });
  });
}

module.exports = {
  getSettings: getSettings,
  getSettingsSync: getSettingsSync,
  getSettingsAsync: getSettingsAsync,
};
