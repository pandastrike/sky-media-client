# This combinator accepts a panda-sky client and outputs a function that's ready to accept an HTML5 File interface on an existing file that the profile owner wishes to upload.

upload = (client, credentials, fetch) ->
  {nickname, authorization} = credentials

  (file) ->
    {size, type} = file

    # Create the upload entity in the Sky API, get back an array of signed URLs granting you permission to upload file chunks directly to S3.
    response = await client.uploads({nickname})
    .post
      authorization: authorization
      body: {size, type}

    {chunks, id, UploadId} = await response.json()

    # Upload the file to S3. Collect the ETags from each chunk.
    parts =
      for {start, end, PartNumber, resource} in chunks      
        response = await fetch resource.url,
          method: "PUT"
          headers: resource.headers
          body: file.slice start, end

        {PartNumber, ETag: response.headers.get "ETag"}

    # Signal to the Sky API that the upload is complete.
    response = await client.media({nickname, id})
      .post
        authorization: authorization
        body: {parts}

    response.headers.get "location"


export default upload
