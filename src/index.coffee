start = (fetch) ->
  # In the browser, we have access to the Fetch API, but in Node, you need to supply your own.
  if !(fetch ?= window?.fetch)?
    throw new Error "Provide fetch API, ex: fetch-h2"

  (file, chunks) ->
    # Upload the file to S3. Collect the ETags from each chunk.
    for {start, end, PartNumber, resource} in chunks
      response = await fetch resource.url,
        method: "PUT"
        headers: resource.headers
        body: file.slice start, end

      {PartNumber, ETag: response.headers.get "ETag"}

export default start
