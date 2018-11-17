"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _upload = _interopRequireDefault(require("./upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This module wraps an instanciated Sky Client object and outputs a simple interface for uploading potentially large files directly to S3 via its multipart upload cycle, all managed (and signed) by the parent Sky API.
var start;

start = function (skyClient, credentials) {
  return Object.defineProperties({}, {
    upload: {
      enumerable: true,
      get: function () {
        return (0, _upload.default)(skyClient, credentials);
      }
    }
  });
};

var _default = start;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7Ozs7QUFGQTtBQUFBLElBQUEsS0FBQTs7QUFJQSxLQUFBLEdBQVEsVUFBQSxTQUFBLEVBQUEsV0FBQSxFQUFBO1NBQ04sTUFBTSxDQUFOLGdCQUFBLENBQUEsRUFBQSxFQUNFO0FBQUEsSUFBQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLFVBQUEsRUFBQSxJQUFBO0FBQ0EsTUFBQSxHQUFBLEVBQUssWUFBQTtlQUFHLHFCQUFBLFNBQUEsRUFBQSxXQUFBLEM7QUFBSDtBQURMO0FBREYsR0FERixDO0FBRE0sQ0FBUjs7ZUFNZSxLIiwic291cmNlc0NvbnRlbnQiOlsiIyBUaGlzIG1vZHVsZSB3cmFwcyBhbiBpbnN0YW5jaWF0ZWQgU2t5IENsaWVudCBvYmplY3QgYW5kIG91dHB1dHMgYSBzaW1wbGUgaW50ZXJmYWNlIGZvciB1cGxvYWRpbmcgcG90ZW50aWFsbHkgbGFyZ2UgZmlsZXMgZGlyZWN0bHkgdG8gUzMgdmlhIGl0cyBtdWx0aXBhcnQgdXBsb2FkIGN5Y2xlLCBhbGwgbWFuYWdlZCAoYW5kIHNpZ25lZCkgYnkgdGhlIHBhcmVudCBTa3kgQVBJLlxuXG5pbXBvcnQgdXBsb2FkIGZyb20gXCIuL3VwbG9hZFwiXG5cbnN0YXJ0ID0gKHNreUNsaWVudCwgY3JlZGVudGlhbHMpIC0+XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIHt9LFxuICAgIHVwbG9hZDpcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgIGdldDogLT4gdXBsb2FkIHNreUNsaWVudCwgY3JlZGVudGlhbHNcblxuZXhwb3J0IGRlZmF1bHQgc3RhcnRcbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=index.coffee