const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please tell us your name"],
        min: [3,'Name must be at least 3 letters'],
    },
    email:{
        type:String,
        required:[true,"Please provide your email"],
        unique:true,
        lovercase:true,
        validate:[validator.isEmail,"Its not an email"]
    },
    password:{
        type:String,
        required:[true,"Please enter a password"],
        minlength:8,
        select:false
    },
    passwordConfirm:{
        type:String,
        require:[true,"Please re-enter a password"],
        validate:{
            validator:function(el){
                return el===this.password
            },
            message:"Passwords dont match"
        }
    },
    passwordChangeAt:Date,
    passwordResetToken:String,
    passwordExpires:Date,
    active:{
        type:Boolean,
        default:true,
        select:false
    },
    accessToken:{
        type:String
    }
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    // Hash password with cost 12
    this.password=await bcrypt.hash(this.password,12);
    this.passwordConfirm=undefined;
    next();
})

userSchema.methods.correctPassword=async(candidatePassword,userPassword)=>{
    return await bcrypt.compare(candidatePassword,userPassword)
}

userSchema.methods.changedPasswordAfter=function(JWTTimestamp){
    if(this.passwordChangeAt){
        const changedTimestamp=parseInt(
            this.passwordChangeAt.getTime()/1000,10
        );
        return JWTTimestamp<changedTimestamp
    }
}

const User=mongoose.model('User',userSchema)
module.exports=User