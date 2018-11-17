"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// This combinator accepts a panda-sky client and outputs a function that's ready to accept an HTML5 File interface on an existing file that the profile owner wishes to upload.
var upload;

upload = function (client, credentials) {
  var authorization, name;
  ({
    name,
    authorization
  } = credentials);
  return async function (file) {
    var PartNumber, UploadId, chunks, end, id, parts, resource, response, size, start, type;
    ({
      size,
      type
    } = file); // Create the upload entity in the Sky API, get back an array of signed URLs granting you permission to upload file chunks directly to S3.

    ({
      chunks,
      id,
      UploadId
    } = await client.uploads({
      name
    }).post({
      authorization: authorization,
      body: {
        size,
        type
      }
    })); // Upload the file to S3. Collect the ETags from each chunk.

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
        response = await window.fetch(resource.url, {
          method: "PUT",
          headers: resource.headers,
          body: file.slice(start, end, type)
        });
        results.push({
          PartNumber,
          ETag: response.headers.get("ETag")
        });
      }

      return results;
    }(); // Signal to the Sky API that the upload is complete.

    await client.media({
      name,
      id
    }).put({
      authorization: authorization,
      body: {
        parts
      }
    });
    return id;
  };
};

var _default = upload;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwbG9hZC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFBQSxJQUFBLE1BQUE7O0FBRUEsTUFBQSxHQUFTLFVBQUEsTUFBQSxFQUFBLFdBQUEsRUFBQTtBQUNQLE1BQUEsYUFBQSxFQUFBLElBQUE7QUFBQSxHQUFBO0FBQUEsSUFBQSxJQUFBO0FBQUEsSUFBQTtBQUFBLE1BQUEsV0FBQTtTQUVBLGdCQUFBLElBQUEsRUFBQTtBQUNFLFFBQUEsVUFBQSxFQUFBLFFBQUEsRUFBQSxNQUFBLEVBQUEsR0FBQSxFQUFBLEVBQUEsRUFBQSxLQUFBLEVBQUEsUUFBQSxFQUFBLFFBQUEsRUFBQSxJQUFBLEVBQUEsS0FBQSxFQUFBLElBQUE7QUFBQSxLQUFBO0FBQUEsTUFBQSxJQUFBO0FBQUEsTUFBQTtBQUFBLFFBQUEsSUFBQSxFQURGLEM7O0FBSUUsS0FBQTtBQUFBLE1BQUEsTUFBQTtBQUFBLE1BQUEsRUFBQTtBQUFBLE1BQUE7QUFBQSxRQUF5QixNQUFNLE1BQU0sQ0FBTixPQUFBLENBQWU7QUFBZixNQUFBO0FBQWUsS0FBZixFQUFBLElBQUEsQ0FFN0I7QUFBQSxNQUFBLGFBQUEsRUFBQSxhQUFBO0FBQ0EsTUFBQSxJQUFBLEVBQU07QUFBQSxRQUFBLElBQUE7QUFBQSxRQUFBO0FBQUE7QUFETixLQUY2QixDQUEvQixFQUpGLEM7O0FBVUUsSUFBQSxLQUFBLEdBQ0UsTUFBQSxrQkFBQTs7QUFBQSxNQUFBLE9BQUEsR0FBQSxFQUFBOztBQUFBLFdBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxHQUFBLEdBQUEsTUFBQSxDQUFBLE1BQUEsRUFBQSxDQUFBLEdBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxFQUFBO1NBQUk7QUFBQSxVQUFBLEtBQUE7QUFBQSxVQUFBLEdBQUE7QUFBQSxVQUFBLFVBQUE7QUFBQSxVQUFBO0FBQUEsWUFBQSxNQUFBLENBQUEsQ0FBQSxDO0FBQ0YsUUFBQSxRQUFBLEdBQVcsTUFBTSxNQUFNLENBQU4sS0FBQSxDQUFhLFFBQVEsQ0FBckIsR0FBQSxFQUNmO0FBQUEsVUFBQSxNQUFBLEVBQUEsS0FBQTtBQUNBLFVBQUEsT0FBQSxFQUFTLFFBQVEsQ0FEakIsT0FBQTtBQUVBLFVBQUEsSUFBQSxFQUFNLElBQUksQ0FBSixLQUFBLENBQUEsS0FBQSxFQUFBLEdBQUEsRUFBQSxJQUFBO0FBRk4sU0FEZSxDQUFqQjtxQkFLQTtBQUFBLFVBQUEsVUFBQTtBQUFhLFVBQUEsSUFBQSxFQUFNLFFBQVEsQ0FBQyxPQUFULENBQUEsR0FBQSxDQUFBLE1BQUE7QUFBbkIsUztBQU5GOzs7QUFWRixLQVVFLEVBREYsQ0FWRixDOztBQW9CRSxVQUFNLE1BQU0sQ0FBTixLQUFBLENBQWE7QUFBQSxNQUFBLElBQUE7QUFBYixNQUFBO0FBQWEsS0FBYixFQUFBLEdBQUEsQ0FFRjtBQUFBLE1BQUEsYUFBQSxFQUFBLGFBQUE7QUFDQSxNQUFBLElBQUEsRUFBTTtBQUFBLFFBQUE7QUFBQTtBQUROLEtBRkUsQ0FBTjtXQUtBLEU7QUF6QkYsRztBQUhPLENBQVQ7O2VBK0JlLE0iLCJzb3VyY2VzQ29udGVudCI6WyIjIFRoaXMgY29tYmluYXRvciBhY2NlcHRzIGEgcGFuZGEtc2t5IGNsaWVudCBhbmQgb3V0cHV0cyBhIGZ1bmN0aW9uIHRoYXQncyByZWFkeSB0byBhY2NlcHQgYW4gSFRNTDUgRmlsZSBpbnRlcmZhY2Ugb24gYW4gZXhpc3RpbmcgZmlsZSB0aGF0IHRoZSBwcm9maWxlIG93bmVyIHdpc2hlcyB0byB1cGxvYWQuXG5cbnVwbG9hZCA9IChjbGllbnQsIGNyZWRlbnRpYWxzKSAtPlxuICB7bmFtZSwgYXV0aG9yaXphdGlvbn0gPSBjcmVkZW50aWFsc1xuXG4gIChmaWxlKSAtPlxuICAgIHtzaXplLCB0eXBlfSA9IGZpbGVcblxuICAgICMgQ3JlYXRlIHRoZSB1cGxvYWQgZW50aXR5IGluIHRoZSBTa3kgQVBJLCBnZXQgYmFjayBhbiBhcnJheSBvZiBzaWduZWQgVVJMcyBncmFudGluZyB5b3UgcGVybWlzc2lvbiB0byB1cGxvYWQgZmlsZSBjaHVua3MgZGlyZWN0bHkgdG8gUzMuXG4gICAge2NodW5rcywgaWQsIFVwbG9hZElkfSA9IGF3YWl0IGNsaWVudC51cGxvYWRzKHtuYW1lfSlcbiAgICAucG9zdFxuICAgICAgYXV0aG9yaXphdGlvbjogYXV0aG9yaXphdGlvblxuICAgICAgYm9keToge3NpemUsIHR5cGV9XG5cbiAgICAjIFVwbG9hZCB0aGUgZmlsZSB0byBTMy4gQ29sbGVjdCB0aGUgRVRhZ3MgZnJvbSBlYWNoIGNodW5rLlxuICAgIHBhcnRzID1cbiAgICAgIGZvciB7c3RhcnQsIGVuZCwgUGFydE51bWJlciwgcmVzb3VyY2V9IGluIGNodW5rc1xuICAgICAgICByZXNwb25zZSA9IGF3YWl0IHdpbmRvdy5mZXRjaCByZXNvdXJjZS51cmwsXG4gICAgICAgICAgbWV0aG9kOiBcIlBVVFwiXG4gICAgICAgICAgaGVhZGVyczogcmVzb3VyY2UuaGVhZGVyc1xuICAgICAgICAgIGJvZHk6IGZpbGUuc2xpY2Ugc3RhcnQsIGVuZCwgdHlwZVxuXG4gICAgICAgIHtQYXJ0TnVtYmVyLCBFVGFnOiByZXNwb25zZS5oZWFkZXJzLmdldCBcIkVUYWdcIn1cblxuICAgICMgU2lnbmFsIHRvIHRoZSBTa3kgQVBJIHRoYXQgdGhlIHVwbG9hZCBpcyBjb21wbGV0ZS5cbiAgICBhd2FpdCBjbGllbnQubWVkaWEoe25hbWUsIGlkfSlcbiAgICAgIC5wdXRcbiAgICAgICAgYXV0aG9yaXphdGlvbjogYXV0aG9yaXphdGlvblxuICAgICAgICBib2R5OiB7cGFydHN9XG5cbiAgICBpZFxuXG5cbmV4cG9ydCBkZWZhdWx0IHVwbG9hZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=upload.coffee