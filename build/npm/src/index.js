"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _upload = _interopRequireDefault(require("./upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This module wraps an instanciated Sky Client object and outputs a simple interface for uploading potentially large files directly to S3 via its multipart upload cycle, all managed (and signed) by the parent Sky API.
var start;

start = function (skyClient, credentials, fetch) {
  if ((fetch != null ? fetch : fetch = typeof window !== "undefined" && window !== null ? window.fetch : void 0) == null) {
    throw new Error("Provide fetch API, ex: fetch-h2");
  }

  return Object.defineProperties({}, {
    upload: {
      enumerable: true,
      get: function () {
        return (0, _upload.default)(skyClient, credentials, fetch);
      }
    }
  });
};

var _default = start;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7Ozs7QUFGQTtBQUFBLElBQUEsS0FBQTs7QUFJQSxLQUFBLEdBQVEsVUFBQSxTQUFBLEVBQUEsV0FBQSxFQUFBLEtBQUEsRUFBQTtBQUVOLE1BQUksQ0FBQSxLQUFBLElBQUEsSUFBQSxHQUFBLEtBQUEsR0FBQSxLQUFBLEdBQUEsT0FBQSxNQUFBLEtBQUEsV0FBQSxJQUFBLE1BQUEsS0FBQSxJQUFBLEdBQUEsTUFBQSxDQUFBLEtBQUEsR0FBQSxLQUFBLENBQUEsS0FBSixJQUFBLEVBQUE7QUFDRSxVQUFNLElBQUEsS0FBQSxDQURSLGlDQUNRLENBQU47OztTQUVGLE1BQU0sQ0FBTixnQkFBQSxDQUFBLEVBQUEsRUFDRTtBQUFBLElBQUEsTUFBQSxFQUNFO0FBQUEsTUFBQSxVQUFBLEVBQUEsSUFBQTtBQUNBLE1BQUEsR0FBQSxFQUFLLFlBQUE7ZUFBRyxxQkFBQSxTQUFBLEVBQUEsV0FBQSxFQUFBLEtBQUEsQztBQUFIO0FBREw7QUFERixHQURGLEM7QUFMTSxDQUFSOztlQVVlLEsiLCJzb3VyY2VzQ29udGVudCI6WyIjIFRoaXMgbW9kdWxlIHdyYXBzIGFuIGluc3RhbmNpYXRlZCBTa3kgQ2xpZW50IG9iamVjdCBhbmQgb3V0cHV0cyBhIHNpbXBsZSBpbnRlcmZhY2UgZm9yIHVwbG9hZGluZyBwb3RlbnRpYWxseSBsYXJnZSBmaWxlcyBkaXJlY3RseSB0byBTMyB2aWEgaXRzIG11bHRpcGFydCB1cGxvYWQgY3ljbGUsIGFsbCBtYW5hZ2VkIChhbmQgc2lnbmVkKSBieSB0aGUgcGFyZW50IFNreSBBUEkuXG5cbmltcG9ydCB1cGxvYWQgZnJvbSBcIi4vdXBsb2FkXCJcblxuc3RhcnQgPSAoc2t5Q2xpZW50LCBjcmVkZW50aWFscywgZmV0Y2gpIC0+XG4gICMgSW4gdGhlIGJyb3dzZXIsIHdlIGhhdmUgYWNjZXNzIHRvIHRoZSBGZXRjaCBBUEksIGJ1dCBpbiBOb2RlLCB5b3UgbmVlZCB0byBzdXBwbHkgeW91ciBvd24uXG4gIGlmICEoZmV0Y2ggPz0gd2luZG93Py5mZXRjaCk/XG4gICAgdGhyb3cgbmV3IEVycm9yIFwiUHJvdmlkZSBmZXRjaCBBUEksIGV4OiBmZXRjaC1oMlwiXG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMge30sXG4gICAgdXBsb2FkOlxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgZ2V0OiAtPiB1cGxvYWQgc2t5Q2xpZW50LCBjcmVkZW50aWFscywgZmV0Y2hcblxuZXhwb3J0IGRlZmF1bHQgc3RhcnRcbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=index.coffee