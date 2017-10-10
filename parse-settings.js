var matchLine = /^\s*((\w+) : )?(<\w+>)?\s?(.*)$/;
var matchNumeric = /\d+(\.\d*)?/;

// This technique of parsing is fairly naive, but it works pretty well, so eh.
function parseSettings(str) {
  var lines = String(str).split('\n');
  var stack = [];
  var root;

  lines.forEach(function (line) {
    var key, type, value;

    var values = line.match(matchLine);
    if (!values) {
      return;
    }

    var parent = stack[stack.length - 1] || {};

    key = values[2];
    type = values[3];
    value = values[4];

    if (parent.length) {
      key = parseInt(key, 10);
    }

    if (value === '}') {
      if (stack.length === 1) {
        root = stack[0];
      }
      stack.pop();
    }

    else if (type === '<array>') {
      stack.push(parent[key] = []);
    }

    else if (type === '<dictionary>') {
      stack.push(parent[key] = {});
    }

    else {
      if (value.match(matchNumeric)) {
        value = parseFloat(value);
      }
      parent[key] = value;
    }
  });

  return root;
}

module.exports = parseSettings;
