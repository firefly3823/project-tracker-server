//register
const users = require('../Models/userSchema')
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
    const {email,password} = req.body

    try{
        const existingUser = await users.findOne({email:email})
        if(existingUser){
            if (existingUser.password === password){
                res.status(200).json("Auth successfull")
            } 
            else{
                res.status(401).json("Unauthorised")
            }
            
        }
        else{
            res.status(404).json("no_user_found")
        }
    } catch (err) {
        res.status(401).json(`Register API Failed ${err}`)
    }
}