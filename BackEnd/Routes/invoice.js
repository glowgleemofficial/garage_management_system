const express= require('express')
const router = express.Router()

const {postdata,getdata,getcusterexcel} =require('../Controller/invoiceController') ;

//Get Request All and By ID

router.route('/post/E-invoice').post(postdata)
router.route('/getexcel/:id').get(getcusterexcel)
router.route('/get/E-invoice').get(getdata)



module.exports= router;