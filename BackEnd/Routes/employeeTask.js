const express= require('express')
const router = express.Router()

const {postdata,getdata,getcusterexcel} =require('../Controller/employeeTaskController') ;

//Get Request All and By ID

router.route('/post/Etask').post(postdata)
router.route('/getexcel/:id').get(getcusterexcel)
router.route('/get/Etask').get(getdata)



module.exports= router;