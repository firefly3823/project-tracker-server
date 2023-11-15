const { default: mongoose } = require('mongoose')
const mangoose = require('mongoose')
const userSchema = new mangoose.Schema({
    username:{
        type:String,
        required:true,
        min:[3,'Must be at least 3 {VALUE}'],
    },
    email:{
        type:String,
        required:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email")
            }
        }
    },
    password:{
        type:String,
        required:true,
    },
    github:{
        type:String,
    },
    linkedin:{
        type:String
    },
    profile:{
        type:String
    }
})

const users = mongoose.model("users",userSchema)

module.exports = users