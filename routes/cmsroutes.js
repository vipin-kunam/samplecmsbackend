const express=require('express');
const route=express.Router();
const cmscontrller= require('../Controllers/cmscontroller');
route.get('/get',cmscontrller.getdata);
route.post('/get',cmscontrller.addata);
module.exports=route;