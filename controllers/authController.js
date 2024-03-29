const {promisify}=require('util');
const User=require('./../models/userModel');
const jwt=require('jsonwebtoken');

const signToken=(id)=>{
    return jwt.sign({id:id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
};

exports.signup=async(req,res)=>{
    try{
        const newUser=await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            passwordConfirm:req.body.passwordConfirm
        });
        const token=signToken(newUser._id);
        res.status(201).json({
            status:'Success',
            data:newUser,
            token
        });
    }catch(err){
        res.status(400).json({
            status:'Failed',
            message:err.message
        });
    }
};

exports.login=async(req,res)=>{
    try{
        const{email,password}=req.body
        // 1.Check email and password
        if(!email||!password){
            throw new Error('Please provide email and pasword')
        }
        // 2.Check if user exist
        const user=await User.findOne({email}).select('+password')
        if(!user||!(await user.correctPassword(password,user.password))){
            throw new Error('Incorrect email or password')
        }
        const token=signToken(user.id)
        // 3.If ok send token to client
        res.status(201).json({
            data:{
                id:user.id,
                name:user.name,
                email:user.email
            },
            token
        })
    }catch(err){
        res.status(400).json({
            status:'Failed',
            message:err.message
        })
    }
}

exports.protect=async(req,res,next)=>{
    // 1.Getting token
    let token;
    try{
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token=req.headers.authorization.split(' ')[1]
        }
        if(!token){
            throw new Error('User no authentificated')
        }
        // 2.Varification token
        const decoded=await promisify(jwt.verify)(token,process.env.JWT_SECRET);
        console.log('decoded',decoded)
        // 3.Check if user exists
        const currentUser=await User.findById(decoded.id);
        if(!currentUser){
            throw new Error('User not exist');
        }
        // 4.Check user change password after token was issued
        if(currentUser.changedPasswordAfter(decoded.iat)){
            throw new Error('User changed password')
        }
        // Grant access
        req.user=currentUser;
        next()
    }catch(err){
        res.status(400).json({
            status:'Failed',
            error:err.message
        })
    }
}

exports.logout=async(req,res)=>{
	try{
		await User.findOneAndUpdate({_id:req.user._id},{accessToken:null})
		res.status(200).json({
			status:'Success'
		})
	}catch(err){
		res.status(400).json({
			status:'Failed',
			message:err.message,
		})
	}
}