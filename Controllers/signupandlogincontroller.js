var jwt = require('jsonwebtoken');
let checkuser=async(email)=>{
const usersRef = global.db.collection('users');
let snapshot = await usersRef.where('email', '==', email).get();
return snapshot;
}
exports.signup = async(req, res, next) => {
  console.log('psted output', req.body);
  const user = req.body;
  //check wherther user exist already
  let snapshot =await checkuser(user.email)
  if (!snapshot.empty) {
    console.log('user exist');
    res.status(409).json({ message: 'user already exist'});
    return;
  }  
  global.db.collection('users').add(user).then((success) => {
    console.log('sucess');
    res.status(201).json({ message: 'user created'});
  }, (err) => {
    console.log('error');
  });

  //next() 
}
exports.login = async(req, res, next) => {
  console.log('headerin login',req.get('userid'));
  let userfromdb=[];
  const user=req.body;
  console.log('login',user);
//check user
let snapshot =await checkuser(user.email);
if (snapshot.empty) {
  //res.send('please signup')
  res.status(401).json({ message: 'Please signup'});
  return;
}
snapshot.forEach(doc => {
  console.log(doc.id, '=>', doc.data());
  userfromdb.push(doc.data());
});
if(userfromdb[0].pass==user.pass){
  //send session info like email and jsonwebtoken; 
  //res.send('logined');
 let token=jwt.sign({email:user.email},
    'validate',{expiresIn:'1h'});
  res.status(200).json({ token:token,userid:user.email});
  return;
}
res.status(401).json({ message: 'password dont match'});
//res.send('password dont match');
  return;
 
}
exports.getdata = (req, res, next) => {
  let arr = [];
  global.db.collection('users').get().then((snapshot) => {
    snapshot.forEach((doc) => {
      arr.push(doc.data());
      console.log(doc.id, '=>', doc.data());

    });
    res.send(arr)
  });

}
