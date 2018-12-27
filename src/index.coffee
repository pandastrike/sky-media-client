# This module wraps an instanciated Sky Client object and outputs a simple interface for uploading potentially large files directly to S3 via its multipart upload cycle, all managed (and signed) by the parent Sky API.

import upload from "./upload"

start = (skyClient, credentials, fetch) ->
  # In the browser, we have access to the Fetch API, but in Node, you need to supply your own.
  if !(fetch ?= window?.fetch)?
    throw new Error "Provide fetch API, ex: fetch-h2"

  Object.defineProperties {},
    upload:
      enumerable: true
      get: -> upload skyClient, credentials, fetch

export default start
