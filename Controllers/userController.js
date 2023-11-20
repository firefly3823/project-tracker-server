//register
const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {
    console.log('Inside register controller');
    const { username, email, password } = req.body

    try {
        const existingUser = await users.findOne({ email: email })
        if (existingUser) {
            res.status(406).json("Account already exist, Please Login")
        } else {
            const newUser = new users({
                username, email, password, github: "", linkedin: "", profile: ""
            });
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch (err) {
        res.status(401).json(`Register API Failed ${err}`)
    }
}
exports.login = async (req,res)=>{
    console.log('inside login function');
    const {email,password} = req.body
    // console.log(req.body);
    try{
        const existingUser = await users.findOne({email,password})
        // console.log(existingUser);
        if(existingUser){
            const token = jwt.sign({ userId: existingUser._id, }, "superSecretKeyForLogin")
                res.status(200).json({
                    existingUser,token
                })
            } 
            else{
                res.status(404).json("Incorrect Email / password")
            }
    } catch (err) {
        res.status(401).json(`Login API Failed ${err}`)
    }
}
