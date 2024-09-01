const express= require('express')
const router = express.Router()

const {postdata,getdata,getcusterexcel} =require('../Controller/pendingController') ;

//Get Request All and By ID

router.route('/post/E-pending').post(postdata)
router.route('/getexcel/:id').get(getcusterexcel)
router.route('/get/E-pending').get(getdata)



module.exports= router;