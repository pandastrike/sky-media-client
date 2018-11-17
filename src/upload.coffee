# This combinator accepts a panda-sky client and outputs a function that's ready to accept an HTML5 File interface on an existing file that the profile owner wishes to upload.

upload = (client, credentials) ->
  {name, authorization} = credentials

  (file) ->
    {size, type} = file

    # Create the upload entity in the Sky API, get back an array of signed URLs granting you permission to upload file chunks directly to S3.
    {chunks, id, UploadId} = await client.uploads({name})
    .post
      authorization: authorization
      body: {size, type}

    # Upload the file to S3. Collect the ETags from each chunk.
    parts =
      for {start, end, PartNumber, resource} in chunks
        response = await window.fetch resource.url,
          method: "PUT"
          headers: resource.headers
          body: file.slice start, end, type

        {PartNumber, ETag: response.headers.get "ETag"}

    # Signal to the Sky API that the upload is complete.
    await client.media({name, id})
      .put
        authorization: authorization
        body: {parts}

    id


export default upload
