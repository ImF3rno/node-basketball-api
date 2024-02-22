const mongoose=require('mongoose')
const alphabetRegex=/^[a-zA-Z\s]+$/
const alphaNumericRegex=/^[a-zA-Z0-9\s]+$/

const participantSchema=new mongoose.Schema({
	name:{
		type:String,
		required:[true,'Participant must have a name'],
		min:[2,'A name should have atleast 2 letters'],
		validate:{
			validator:function(el){
				return alphabetRegex.test(el)
			},
			message:"A name can only contain letters and spaces",
		},
	},
	surname:{
		type:String,
		required:[true,'Participant must have a surname'],
		min:[2,'Surname must have atleast 2 letters'],
		validate:{
			validator:function(el){
				return alphabetRegex.test(el)
			},
			message:"Surname can only contain letters and spaces",
		},
	},
	age:{
		type:Number,
		min:[18,'Age must be 18 or above'],
		max:[40,'Age must be 40 or below'],
		required:[true,'Participant must have an age'],
	},
	team_name:{
		type:String,
		required:[true,'Participant must be in a team'],
		validate:{
			validator:function(el){
				return alphaNumericRegex.test(el)
			},
			message:"Team name can only contain letters, numbers and spaces",
		},
	},
	rating:{
		type:Number,
		required:[true, 'Participant must have a rating'],
	},
	createdAt:{
		type:Date,
		default:Date.now(),
		select:false,
	}
})

const Participant=mongoose.model('Participant',participantSchema)
module.exports=Participant