const express= require('express')
const router = express.Router()

const {postdata,getdata ,getcusterexcel} =require('../Controller/vehiclesController') ;

//Get Request All and By ID

router.route('/post/E-vehicles').post(postdata)
router.route('/getexcel/:id').get(getcusterexcel)
router.route('/get/E-vehicles').get(getdata)



module.exports= router;