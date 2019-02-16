"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var start;

start = function (fetch) {
  if ((fetch != null ? fetch : fetch = typeof window !== "undefined" && window !== null ? window.fetch : void 0) == null) {
    throw new Error("Provide fetch API, ex: fetch-h2");
  }

  return async function (file, chunks) {
    var PartNumber, end, i, len, resource, response, results; // Upload the file to S3. Collect the ETags from each chunk.

    results = [];

    for (i = 0, len = chunks.length; i < len; i++) {
      ({
        start,
        end,
        PartNumber,
        resource
      } = chunks[i]);
      response = await fetch(resource.url, {
        method: "PUT",
        headers: resource.headers,
        body: file.slice(start, end)
      });
      results.push({
        PartNumber,
        ETag: response.headers.get("ETag")
      });
    }

    return results;
  };
};

var _default = start;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9yZXBvcy9za3ktbWVkaWEtY2xpZW50L3NyYy9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBQSxLQUFBOztBQUFBLEtBQUEsR0FBUSxVQUFBLEtBQUEsRUFBQTtBQUVOLE1BQUksQ0FBQSxLQUFBLElBQUEsSUFBQSxHQUFBLEtBQUEsR0FBQSxLQUFBLEdBQUEsT0FBQSxNQUFBLEtBQUEsV0FBQSxJQUFBLE1BQUEsS0FBQSxJQUFBLEdBQUEsTUFBQSxDQUFBLEtBQUEsR0FBQSxLQUFBLENBQUEsS0FBSixJQUFBLEVBQUE7QUFDRSxVQUFNLElBQUEsS0FBQSxDQURSLGlDQUNRLENBQU47OztTQUVGLGdCQUFBLElBQUEsRUFBQSxNQUFBLEVBQUE7QUFFRSxRQUFBLFVBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxRQUFBLEVBQUEsUUFBQSxFQUFBLE9BQUEsQ0FGRixDOztBQUVFLElBQUEsT0FBQSxHQUFBLEVBQUE7O0FBQUEsU0FBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLEdBQUEsR0FBQSxNQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsR0FBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQUE7T0FBSTtBQUFBLFFBQUEsS0FBQTtBQUFBLFFBQUEsR0FBQTtBQUFBLFFBQUEsVUFBQTtBQUFBLFFBQUE7QUFBQSxVQUFBLE1BQUEsQ0FBQSxDQUFBLEM7QUFDRixNQUFBLFFBQUEsR0FBVyxNQUFNLEtBQUEsQ0FBTSxRQUFRLENBQWQsR0FBQSxFQUNmO0FBQUEsUUFBQSxNQUFBLEVBQUEsS0FBQTtBQUNBLFFBQUEsT0FBQSxFQUFTLFFBQVEsQ0FEakIsT0FBQTtBQUVBLFFBQUEsSUFBQSxFQUFNLElBQUksQ0FBSixLQUFBLENBQUEsS0FBQSxFQUFBLEdBQUE7QUFGTixPQURlLENBQWpCO21CQUtBO0FBQUEsUUFBQSxVQUFBO0FBQWEsUUFBQSxJQUFBLEVBQU0sUUFBUSxDQUFDLE9BQVQsQ0FBQSxHQUFBLENBQUEsTUFBQTtBQUFuQixPO0FBTkY7OztBQUZGLEc7QUFMTSxDQUFSOztlQWVlLEsiLCJzb3VyY2VzQ29udGVudCI6WyJzdGFydCA9IChmZXRjaCkgLT5cbiAgIyBJbiB0aGUgYnJvd3Nlciwgd2UgaGF2ZSBhY2Nlc3MgdG8gdGhlIEZldGNoIEFQSSwgYnV0IGluIE5vZGUsIHlvdSBuZWVkIHRvIHN1cHBseSB5b3VyIG93bi5cbiAgaWYgIShmZXRjaCA/PSB3aW5kb3c/LmZldGNoKT9cbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJQcm92aWRlIGZldGNoIEFQSSwgZXg6IGZldGNoLWgyXCJcblxuICAoZmlsZSwgY2h1bmtzKSAtPlxuICAgICMgVXBsb2FkIHRoZSBmaWxlIHRvIFMzLiBDb2xsZWN0IHRoZSBFVGFncyBmcm9tIGVhY2ggY2h1bmsuXG4gICAgZm9yIHtzdGFydCwgZW5kLCBQYXJ0TnVtYmVyLCByZXNvdXJjZX0gaW4gY2h1bmtzXG4gICAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoIHJlc291cmNlLnVybCxcbiAgICAgICAgbWV0aG9kOiBcIlBVVFwiXG4gICAgICAgIGhlYWRlcnM6IHJlc291cmNlLmhlYWRlcnNcbiAgICAgICAgYm9keTogZmlsZS5zbGljZSBzdGFydCwgZW5kXG5cbiAgICAgIHtQYXJ0TnVtYmVyLCBFVGFnOiByZXNwb25zZS5oZWFkZXJzLmdldCBcIkVUYWdcIn1cblxuZXhwb3J0IGRlZmF1bHQgc3RhcnRcbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=/Users/david/repos/sky-media-client/src/index.coffee