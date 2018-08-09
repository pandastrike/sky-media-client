# This combinator accepts a panda-sky client and outputs a function that's ready to accept an HTML5 File interface on an existing file that the profile owner wishes to upload.


upload = (client, credentials) ->
  {name, authorization} = credentials

  (file) ->
    {size, type} = file

    # Create the upload entity in the Sky API, get back an array of signed URLs granting you permission to upload file chunks directly to S3.
    {chunks, mediaID} = await client.uploads({name})
    .post
      authorization: authorization
      body: {size, type}

    # Upload the file to S3. Collect the ETags from each chunk.
    parts =
      for {start, end, url, PartNumber} in chunks
        chunk = file.slice start, end
        response = await window.fetch url, {method: "PUT", body: chunk}

        {PartNumber, ETag: response.headers.get "ETag"}

    # Signal to the Sky API that the upload is complete.
    await client.media({name, mediaID})
      .put
        authorization: authorization
        body: {parts}


export default upload
