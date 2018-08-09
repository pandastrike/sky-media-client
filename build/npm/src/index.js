"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _upload = require("./upload");

var _upload2 = _interopRequireDefault(_upload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This module wraps an instanciated Sky Client object and outputs a simple interface for uploading potentially large files directly to S3 via its multipart upload cycle, all managed (and signed) by the parent Sky API.
var start;

start = function (skyClient, credentials) {
  return Object.defineProperties({}, {
    upload: {
      enumerable: true,
      get: function () {
        return (0, _upload2.default)(skyClient, credentials);
      }
    }
  });
};

exports.default = start;