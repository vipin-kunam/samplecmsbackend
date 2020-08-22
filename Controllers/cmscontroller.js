exports.getdata = (req, res, next) => {
    let arr = [];
    global.db.collection('cms').get().then((snapshot) => {
      snapshot.forEach((doc) => {
        arr.push(doc.data());
        console.log(doc.id, '=>', doc.data());
  
      });
      res.send(arr)
    });
  
  }
  exports.addata=()=>{
    const user = req.body;
    global.db.collection('cms').add(user).then((success) => {
        console.log('sucess');
        res.status(201).json({ message: 'user created'});
      }, (err) => {
        console.log('error');
      });
  }
  exports.editdata=()=>{
      
  }