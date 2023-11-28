//register
const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')

//REGISTER
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
//LOGIN
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

//Edit

exports.editUser = async (req,res)=>{
    const userId = req.payload
    const {username,email,password,github,linkedin,profile} = req.body
    const uploadImage = req.file?req.file.filename:profile
    try{
        const updateUSer = await users.findByIdAndUpdate({_id:userId},{
            username,email,password,github,linkedin,profile:uploadImage
        },{new:true})
        
        await updateUSer.save()
        res.status(200).json(updateUSer)
        
    }catch(err){
        res.status(401).json(err)
    }
}