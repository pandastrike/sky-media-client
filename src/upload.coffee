# This combinator accepts a panda-sky client and outputs a function that's ready to accept an HTML5 File interface on an existing file that the profile owner wishes to upload.


upload = (client, credentials) ->
  {name, authorization} = credentials

  (file) ->
    {size, type} = file
    console.log "uploading file: #{type}, #{size}"
    # Create the upload entity in the Sky API, get back an array of signed URLs granting you permission to upload file chunks directly to S3.
    console.log "requesting signed URLs from sky API"
    {chunks, mediaID, UploadId} = await client.uploads({name})
    .post
      authorization: authorization
      body: {size, type}

    console.log "Key:", mediaID
    console.log "UploadId:", UploadId
    console.log "chunks:", chunks

    # Upload the file to S3. Collect the ETags from each chunk.
    console.log "uploading directly to S3"
    parts =
      for {start, end, constraints} in chunks
        url = "http://#{constraints.fields.bucket}.s3.amazonaws.com"
        formData = new FormData()

        for name, value of constraints.fields when name not in ["bucket"]
          formData.append name, value.toString()
        formData.append "Content-Length", (end - start).toString()
        console.log pair for pair in formData.entries()
        # The file field has to always go last.
        formData.append "file", file.slice start, end
        response = await window.fetch url, {method: "POST", body: formData}

        PartNumber: constraints.fields.PartNumber
        ETag: response.headers.get "ETag"

    console.log "upload complete:", parts

    # Signal to the Sky API that the upload is complete.
    console.log "singaling completion to Sky API"
    await client.media({name, mediaID})
      .put
        authorization: authorization
        body: {parts}

    console.log "upload successful.  Reference #{mediaID}"

    mediaID


export default upload
