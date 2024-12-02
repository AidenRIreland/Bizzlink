import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
		},
		  phone: {
			type: String,
			required: true,
		  },
		  companyName: {
			type: String,
			required: true,
		  },
		  industry: [
			{
			  type: String,
			},
		  ],
		  address: {
			type: String,
			required: true,
		  },
		  socialLinks: { type: [String] }, 
		  businessLogo: {
			type: String,
			default: "",
		  },

		gender: {
			type: String,
			required: true,
			enum: ["male", "female"],
		},
		
		profilePic: {
			type: String,
			default: "",
		},
		isOnline: {
			type: Boolean,
			default: false
		},
		lastOnline: {
			type: Date,
			default: null
		  },
		// createdAt, updatedAt => Member since <createdAt>
		//?2FA Enable and screat scemha
		twoFactorEnabled:{
			type: Boolean,
			default: false,
		},
		twoFactorSecret:{
			type:String,
			default: null,
		}
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
