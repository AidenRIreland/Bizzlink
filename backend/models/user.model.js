import mongoose from "mongoose";
//TODO: Add email to userschema
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
<<<<<<< HEAD
		isOnline: {
			type: Boolean,
			default: false
		  },
		  lastOnline: {
			type: Date,
			default: null
		  }
=======


>>>>>>> feature/registration-update
		// createdAt, updatedAt => Member since <createdAt>
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
