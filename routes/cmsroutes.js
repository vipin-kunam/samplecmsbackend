const express=require('express');
const route=express.Router();
const cmscontrller= require('../Controllers/cmscontroller');
const isAuth=require('../Middleware/Auth')
route.get('/get',isAuth,cmscontrller.getdata);
route.get('/getsingledata:id',isAuth,cmscontrller.getsingledata);
route.post('/add',isAuth,cmscontrller.addata);
route.post('/edit',isAuth,cmscontrller.editdata);
route.delete('/delete:id',isAuth,cmscontrller.deletedata);
module.exports=route;