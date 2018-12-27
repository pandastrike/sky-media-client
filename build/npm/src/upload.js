"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// This combinator accepts a panda-sky client and outputs a function that's ready to accept an HTML5 File interface on an existing file that the profile owner wishes to upload.
var upload;

upload = function (client, credentials, fetch) {
  var authorization, nickname;
  ({
    nickname,
    authorization
  } = credentials);
  return async function (file) {
    var PartNumber, UploadId, chunks, end, id, parts, resource, response, size, start, type;
    ({
      size,
      type
    } = file); // Create the upload entity in the Sky API, get back an array of signed URLs granting you permission to upload file chunks directly to S3.

    response = await client.uploads({
      nickname
    }).post({
      authorization: authorization,
      body: {
        size,
        type
      }
    });
    ({
      chunks,
      id,
      UploadId
    } = await response.json()); // Upload the file to S3. Collect the ETags from each chunk.

    parts = await async function () {
      var i, len, results;
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
    }(); // Signal to the Sky API that the upload is complete.

    response = await client.media({
      nickname,
      id
    }).post({
      authorization: authorization,
      body: {
        parts
      }
    });
    return response.headers.get("location");
  };
};

var _default = upload;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwbG9hZC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFBQSxJQUFBLE1BQUE7O0FBRUEsTUFBQSxHQUFTLFVBQUEsTUFBQSxFQUFBLFdBQUEsRUFBQSxLQUFBLEVBQUE7QUFDUCxNQUFBLGFBQUEsRUFBQSxRQUFBO0FBQUEsR0FBQTtBQUFBLElBQUEsUUFBQTtBQUFBLElBQUE7QUFBQSxNQUFBLFdBQUE7U0FFQSxnQkFBQSxJQUFBLEVBQUE7QUFDRSxRQUFBLFVBQUEsRUFBQSxRQUFBLEVBQUEsTUFBQSxFQUFBLEdBQUEsRUFBQSxFQUFBLEVBQUEsS0FBQSxFQUFBLFFBQUEsRUFBQSxRQUFBLEVBQUEsSUFBQSxFQUFBLEtBQUEsRUFBQSxJQUFBO0FBQUEsS0FBQTtBQUFBLE1BQUEsSUFBQTtBQUFBLE1BQUE7QUFBQSxRQUFBLElBQUEsRUFERixDOztBQUlFLElBQUEsUUFBQSxHQUFXLE1BQU0sTUFBTSxDQUFOLE9BQUEsQ0FBZTtBQUFmLE1BQUE7QUFBZSxLQUFmLEVBQUEsSUFBQSxDQUVmO0FBQUEsTUFBQSxhQUFBLEVBQUEsYUFBQTtBQUNBLE1BQUEsSUFBQSxFQUFNO0FBQUEsUUFBQSxJQUFBO0FBQUEsUUFBQTtBQUFBO0FBRE4sS0FGZSxDQUFqQjtBQUtBLEtBQUE7QUFBQSxNQUFBLE1BQUE7QUFBQSxNQUFBLEVBQUE7QUFBQSxNQUFBO0FBQUEsUUFBeUIsTUFBTSxRQUFRLENBUnZDLElBUStCLEVBQS9CLEVBVEYsQzs7QUFZRSxJQUFBLEtBQUEsR0FDRSxNQUFBLGtCQUFBOztBQUFBLE1BQUEsT0FBQSxHQUFBLEVBQUE7O0FBQUEsV0FBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLEdBQUEsR0FBQSxNQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsR0FBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQUE7U0FBSTtBQUFBLFVBQUEsS0FBQTtBQUFBLFVBQUEsR0FBQTtBQUFBLFVBQUEsVUFBQTtBQUFBLFVBQUE7QUFBQSxZQUFBLE1BQUEsQ0FBQSxDQUFBLEM7QUFDRixRQUFBLFFBQUEsR0FBVyxNQUFNLEtBQUEsQ0FBTSxRQUFRLENBQWQsR0FBQSxFQUNmO0FBQUEsVUFBQSxNQUFBLEVBQUEsS0FBQTtBQUNBLFVBQUEsT0FBQSxFQUFTLFFBQVEsQ0FEakIsT0FBQTtBQUVBLFVBQUEsSUFBQSxFQUFNLElBQUksQ0FBSixLQUFBLENBQUEsS0FBQSxFQUFBLEdBQUE7QUFGTixTQURlLENBQWpCO3FCQUtBO0FBQUEsVUFBQSxVQUFBO0FBQWEsVUFBQSxJQUFBLEVBQU0sUUFBUSxDQUFDLE9BQVQsQ0FBQSxHQUFBLENBQUEsTUFBQTtBQUFuQixTO0FBTkY7OztBQVpGLEtBWUUsRUFERixDQVpGLEM7O0FBc0JFLElBQUEsUUFBQSxHQUFXLE1BQU0sTUFBTSxDQUFOLEtBQUEsQ0FBYTtBQUFBLE1BQUEsUUFBQTtBQUFiLE1BQUE7QUFBYSxLQUFiLEVBQUEsSUFBQSxDQUViO0FBQUEsTUFBQSxhQUFBLEVBQUEsYUFBQTtBQUNBLE1BQUEsSUFBQSxFQUFNO0FBQUEsUUFBQTtBQUFBO0FBRE4sS0FGYSxDQUFqQjtXQUtBLFFBQVEsQ0FBQyxPQUFULENBQUEsR0FBQSxDQUFBLFVBQUEsQztBQTNCRixHO0FBSE8sQ0FBVDs7ZUFpQ2UsTSIsInNvdXJjZXNDb250ZW50IjpbIiMgVGhpcyBjb21iaW5hdG9yIGFjY2VwdHMgYSBwYW5kYS1za3kgY2xpZW50IGFuZCBvdXRwdXRzIGEgZnVuY3Rpb24gdGhhdCdzIHJlYWR5IHRvIGFjY2VwdCBhbiBIVE1MNSBGaWxlIGludGVyZmFjZSBvbiBhbiBleGlzdGluZyBmaWxlIHRoYXQgdGhlIHByb2ZpbGUgb3duZXIgd2lzaGVzIHRvIHVwbG9hZC5cblxudXBsb2FkID0gKGNsaWVudCwgY3JlZGVudGlhbHMsIGZldGNoKSAtPlxuICB7bmlja25hbWUsIGF1dGhvcml6YXRpb259ID0gY3JlZGVudGlhbHNcblxuICAoZmlsZSkgLT5cbiAgICB7c2l6ZSwgdHlwZX0gPSBmaWxlXG5cbiAgICAjIENyZWF0ZSB0aGUgdXBsb2FkIGVudGl0eSBpbiB0aGUgU2t5IEFQSSwgZ2V0IGJhY2sgYW4gYXJyYXkgb2Ygc2lnbmVkIFVSTHMgZ3JhbnRpbmcgeW91IHBlcm1pc3Npb24gdG8gdXBsb2FkIGZpbGUgY2h1bmtzIGRpcmVjdGx5IHRvIFMzLlxuICAgIHJlc3BvbnNlID0gYXdhaXQgY2xpZW50LnVwbG9hZHMoe25pY2tuYW1lfSlcbiAgICAucG9zdFxuICAgICAgYXV0aG9yaXphdGlvbjogYXV0aG9yaXphdGlvblxuICAgICAgYm9keToge3NpemUsIHR5cGV9XG5cbiAgICB7Y2h1bmtzLCBpZCwgVXBsb2FkSWR9ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG5cbiAgICAjIFVwbG9hZCB0aGUgZmlsZSB0byBTMy4gQ29sbGVjdCB0aGUgRVRhZ3MgZnJvbSBlYWNoIGNodW5rLlxuICAgIHBhcnRzID1cbiAgICAgIGZvciB7c3RhcnQsIGVuZCwgUGFydE51bWJlciwgcmVzb3VyY2V9IGluIGNodW5rcyAgICAgIFxuICAgICAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoIHJlc291cmNlLnVybCxcbiAgICAgICAgICBtZXRob2Q6IFwiUFVUXCJcbiAgICAgICAgICBoZWFkZXJzOiByZXNvdXJjZS5oZWFkZXJzXG4gICAgICAgICAgYm9keTogZmlsZS5zbGljZSBzdGFydCwgZW5kXG5cbiAgICAgICAge1BhcnROdW1iZXIsIEVUYWc6IHJlc3BvbnNlLmhlYWRlcnMuZ2V0IFwiRVRhZ1wifVxuXG4gICAgIyBTaWduYWwgdG8gdGhlIFNreSBBUEkgdGhhdCB0aGUgdXBsb2FkIGlzIGNvbXBsZXRlLlxuICAgIHJlc3BvbnNlID0gYXdhaXQgY2xpZW50Lm1lZGlhKHtuaWNrbmFtZSwgaWR9KVxuICAgICAgLnBvc3RcbiAgICAgICAgYXV0aG9yaXphdGlvbjogYXV0aG9yaXphdGlvblxuICAgICAgICBib2R5OiB7cGFydHN9XG5cbiAgICByZXNwb25zZS5oZWFkZXJzLmdldCBcImxvY2F0aW9uXCJcblxuXG5leHBvcnQgZGVmYXVsdCB1cGxvYWRcbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=upload.coffee