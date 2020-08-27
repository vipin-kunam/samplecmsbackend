var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let checkuser = async (email) => {
  const usersRef = global.db.collection('users');
  let snapshot = await usersRef.where('email', '==', email).get();
  return snapshot;
}
exports.signup = async (req, res, next) => {
  console.log('psted output', req.body);
  const user = req.body;
  //check wherther user exist already
  let snapshot = await checkuser(user.email)
  if (!snapshot.empty) {
    console.log('user exist');
    res.status(409).json({ message: 'user already exist' });
    return;
  }
  bcrypt
    .hash(user.pass, 12).then((password) => {
      let userdoc = {
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        pass: password
      }
      global.db.collection('users').add(userdoc).then((success) => {
        console.log('sucess');
        res.status(201).json({ message: 'user created' });
      }, (err) => {
        next(err);
      });

    })


  //next() 
}
exports.login = async (req, res, next) => {

  let userfromdb = [];
  const user = req.body;
  console.log('login', user);
  //check user
  let snapshot = await checkuser(user.email);
  if (snapshot.empty) {
    //res.send('please signup')
    res.status(401).json({ message: 'Please signup' });
    return;
  }
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
    userfromdb.push(doc.data());
  });
  bcrypt.compare(user.pass,userfromdb[0].pass).then((isequal) => {
    if (isequal) {
      //send session info jsonwebtoken signed with usermail; 
      //res.send('logined');
      let token = jwt.sign({ userid: user.email },
        'validate', { expiresIn: '1h' });
      res.status(200).json({ token: token });
      return;
    }
    else {
      res.status(401).json({ message: 'password dont match' });
      //res.send('password dont match');
      return;
    }
  });
}
exports.getdata = (req, res, next) => {
  let arr = [];
  global.db.collection('users').get().then((snapshot) => {
    snapshot.forEach((doc) => {
      arr.push(doc.data());
      console.log(doc.id, '=>', doc.data());

    });
    res.send(arr)
  },(err)=>{
    next(err);
  });

}
