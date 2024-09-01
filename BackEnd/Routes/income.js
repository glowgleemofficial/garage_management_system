const express= require('express')
const router = express.Router()

const {postdata,getdata,getcusterexcel} =require('../Controller/incomeController') ;

//Get Request All and By ID

router.route('/post/E-income').post(postdata)
router.route('/getexcel/:id').get(getcusterexcel)
router.route('/get/E-income').get(getdata)



module.exports= router;