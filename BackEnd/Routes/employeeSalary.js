const express= require('express')
const router = express.Router()


const {postdata,getdata,getcusterexcel} =require('../Controller/employeeSalaryController') ;

//Get Request All and By ID

router.route('/post/Esalary').post(postdata)
router.route('/getexcel/:id').get(getcusterexcel)
router.route('/get/Esalary').get(getdata)



module.exports= router;