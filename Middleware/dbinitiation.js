const Firestore = require('@google-cloud/firestore');
initialisedb=()=>{
  
    const db = new Firestore({
        projectId: 'database-287006',
        keyFilename: '../Database-a678e26aadca.json',
      });
      console.log('indb',db);
      return db;
}
exports=initialisedb();