const express=require('express');
const authcontroller=require('../controller/authcontroller');
const controller=require('../controller/contollerFun.js')
const router=express.Router();
const authVal=require('../middleware/authValidation.js')

router.post('/login',authcontroller.login);
router.post('/register',authcontroller.register);



router.get('/getProducts',authVal.Validation(['admin', 'customer']),controller.getProducts);
router.get('/getYourOrders',authVal.Validation(['admin','customer']),controller.getYourOrder);



router.post('/newOrder',authVal.Validation(['addmin','customer']),controller.orders);
router.get('/getOrderDetials/:id',authVal.Validation(['amdin','customer']),controller.orderDetailsById);
router.get('/getAllorders',authVal.Validation(['admin']),controller.viewOrder);
router.put('/upateStatus/:id',authVal.Validation(['admin']),controller.updateStatus);
router.post('/addProduct',authVal.Validation(['admin']),controller.addProduct);
router.put('/updateProduct/:id',authVal.Validation(['admin']),controller.updateProduct);
router.delete('/deleteProduct/:id',authVal.Validation(['admin']),controller.deleteProduct);


module.exports=router;