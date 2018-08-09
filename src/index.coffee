# This module wraps an instanciated Sky Client object and outputs a simple interface for uploading potentially large files directly to S3 via its multipart upload cycle, all managed (and signed) by the parent Sky API.

import upload from "./upload"

start = (skyClient, credentials) ->
  Object.defineProperties {},
    upload:
      enumerable: true
      get: -> upload skyClient, credentials

export default start
