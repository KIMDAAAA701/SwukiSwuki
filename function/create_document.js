function create_document(title, content, callback) {
    let responseData = {'result':'ok'}
    models.document.create({
    writer: test_id,
    title: body.title_fild
    }).then(function(result){
        callback(responseData)
    }).catch(function(err){
        console.log(err)
    })
  }