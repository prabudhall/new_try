if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

router.post("/createuser", 
body("name", "Small").isLength({min: 3}),
body('email', "not email").isEmail(),
body("password", "Small").isLength({min: 5}),
async(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try {
        await User.create({
            name: req.body.name,     //"Abc",
            location: req.body.location,     //"Delhi",
            email: req.body.email,       //"abc@gmail.com",
            password: secPassword        //req.body.password     //"123456"
        }).then(res.json({success: true}))
         
    } catch (error) {
        console.log(error);
        console.log();
        res.json({success: false});
    }
});

router.post("/loginuser", 
body('email', "not email").isEmail(),
body("password", "Small").isLength({min: 5}),
async(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        var founduser = await User.findOne({
            email: req.body.email
        })
        if(!founduser) {
            return res.status(400).json({ errors: "Invalid Email id" });
        }

        const pwdCompare = await bcrypt.compare(req.body.password, founduser.password);
        if(!pwdCompare) {
            return res.status(400).json({ errors: "Invalid password" });
        }
        const data = {
            user: founduser._id
        }
        const AT = await jwt.sign(data, jwtSecret);

        return res.json({success: true, authToken: AT});
         
    } catch (error) {
        console.log(error);
        console.log();
        res.json({success: false});
    }
});

module.exports = router;