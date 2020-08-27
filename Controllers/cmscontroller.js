exports.getdata = (req, res, next) => {
  console.log('in getdata');
    let arr = [];
    let userid=req.userid;
    global.db.collection('cms').where('userid', '==', userid).get().then((snapshot) => {
      snapshot.forEach((doc) => {
        let temp={...doc.data(),id:doc.id}
        arr.push(temp);
        console.log(doc.id, '=>', doc.data());
  
      });
      res.send(arr)
    },(err)=>{
      next(err);
    });
  
  }
  exports.deletedata=async(req,res,next)=>{
    console.log('in delete');
    const id=req.params['id'];
    const docid=await global.db.collection('cms').doc(id).delete();
    console.log('docid',docid);
    if(docid)
   return res.status(201).json({ message: 'user deleted'});
   else
   return res.send('error');
  }
  let checkuser=async(email)=>{
    const usersRef = global.db.collection('cms');
    let snapshot = await usersRef.where('email', '==', email).get();
    return snapshot;
    }
  exports.addata=async(req, res, next)=>{
    const user = req.body;
    let snapshot =await checkuser(user.email);
    if (!snapshot.empty) {
      console.log('user exist');
      res.status(409).json({ message: 'user already exist'});
      return;
    }  
    const userid=req.userid;
    const userpayload={...user,userid:userid}
    global.db.collection('cms').add(userpayload).then((success) => {
        console.log('sucess');
        res.status(201).json({ message: 'user created'});
      }, (err) => {
        next(err);
      });
  }
  exports.editdata=async(req, res, next)=>{
    const user = req.body;
    const userid=req.userid;
    const userdata={fname:user.fname,lname:user.lname,email:user.email,userid:userid};
    const docid=await global.db.collection('cms').doc(user.id).set(userdata);
    console.log('docid',docid);
    if(docid)
   return res.status(201).json({ message: 'user updated'});
   else
   return res.send('error');
  }
  exports.getsingledata=(req,res,next)=>{
//console.log('param',req.params);
const id=req.params['id'];
global.db.collection('cms').doc(id).get().then((doc)=>{
console.log('snap',doc.data());
let user={...doc.data(),id:doc.id};
res.send(user);
return;
},(err)=>{
next(err);
return;
})


  }