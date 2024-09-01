const express= require('express')
const router = express.Router()

const {postdata,getdata,getcusterexcel} =require('../Controller/expensesController') ;

//Get Request All and By ID

router.route('/post/Eexpenses').post(postdata)
router.route('/getexcel/:id').get(getcusterexcel)
router.route('/get/Eexpenses').get(getdata)



module.exports= router;