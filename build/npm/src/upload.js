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
      var UploadId, chunks, constraints, end, formData, mediaID, pair, parts, response, size, start, type, url, value;
      ({ size, type } = file);
      console.log(`uploading file: ${type}, ${size}`);
      // Create the upload entity in the Sky API, get back an array of signed URLs granting you permission to upload file chunks directly to S3.
      console.log("requesting signed URLs from sky API");
      ({ chunks, mediaID, UploadId } = yield client.uploads({ name }).post({
        authorization: authorization,
        body: { size, type }
      }));
      console.log("Key:", mediaID);
      console.log("UploadId:", UploadId);
      console.log("chunks:", chunks);
      // Upload the file to S3. Collect the ETags from each chunk.
      console.log("uploading directly to S3");
      parts = yield _asyncToGenerator(function* () {
        var i, j, len, len1, ref, ref1, results;
        results = [];
        for (i = 0, len = chunks.length; i < len; i++) {
          ({ start, end, constraints } = chunks[i]);
          url = `http://${constraints.fields.bucket}.s3.amazonaws.com`;
          formData = new FormData();
          ref = constraints.fields;
          for (name in ref) {
            value = ref[name];
            if (name !== "bucket") {
              formData.append(name, value.toString());
            }
          }
          formData.append("Content-Length", (end - start).toString());
          ref1 = formData.entries();
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            pair = ref1[j];
            console.log(pair);
          }
          // The file field has to always go last.
          formData.append("file", file.slice(start, end));
          response = yield window.fetch(url, {
            method: "POST",
            body: formData
          });
          results.push({
            PartNumber: constraints.fields.PartNumber,
            ETag: response.headers.get("ETag")
          });
        }
        return results;
      })();
      console.log("upload complete:", parts);
      // Signal to the Sky API that the upload is complete.
      console.log("singaling completion to Sky API");
      yield client.media({ name, mediaID }).put({
        authorization: authorization,
        body: { parts }
      });
      console.log(`upload successful.  Reference ${mediaID}`);
      return mediaID;
    });

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  })();
};

exports.default = upload;