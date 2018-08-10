"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// This combinator accepts a panda-sky client and outputs a function that's ready to accept an HTML5 File interface on an existing file that the profile owner wishes to upload.
var upload;

upload = function (client, credentials) {
  var authorization, name;
  ({ name, authorization } = credentials);
  return (() => {
    var _ref = _asyncToGenerator(function* (file) {
      var PartNumber, UploadId, chunks, end, mediaID, parts, resource, response, size, start, type;
      ({ size, type } = file);
      // Create the upload entity in the Sky API, get back an array of signed URLs granting you permission to upload file chunks directly to S3.
      ({ chunks, mediaID, UploadId } = yield client.uploads({ name }).post({
        authorization: authorization,
        body: { size, type }
      }));
      // Upload the file to S3. Collect the ETags from each chunk.
      parts = yield _asyncToGenerator(function* () {
        var i, len, results;
        results = [];
        for (i = 0, len = chunks.length; i < len; i++) {
          ({ start, end, PartNumber, resource } = chunks[i]);
          response = yield window.fetch(resource.url, {
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
      })();
      // Signal to the Sky API that the upload is complete.
      yield client.media({ name, mediaID }).put({
        authorization: authorization,
        body: { parts }
      });
      return mediaID;
    });

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  })();
};

exports.default = upload;