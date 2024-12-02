import User from "../models/user.model.js";
import mongoose from "mongoose";

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}

};

export const updateUser = async (req, res) => {
	try {
		const userId = req.user._id;
		const { fullName, username } = req.body;

		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ fullName, username },
			{ new: true, runValidators: true }
		);

		if (!updatedUser) {
			return res.status(404).json({ error: "User not found" });
		}

		res.status(200).json({
			_id: updatedUser._id,
			fullName: updatedUser.fullName,
			username: updatedUser.username,
			profilePic: updatedUser.profilePic,
			gender: updatedUser.gender,
		});

	} catch (error) {
		console.log("Error in updateUser controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const updatePublicProfile = async (req, res) => {
    try {
        const { id } = req.params;

		console.log("Received ID:", id);

		if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const {
            businessLogo,
            companyName,
            industry,
            address,
            email,
            phone,
            socialLinks,
        } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                businessLogo,
                companyName,
                industry,
                address,
                email,
                phone,
                socialLinks,
            },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error in updatePublicProfile controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error in getUserById: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

//*Get User status function
export const getUserStatus = async(req,res)=>{
	try{
		const{id} = req.params;
		if (!id) {
            return res.status(400).json({ error: "User ID is required" });
        }
		const user = await User.findById(id, "isOnline lastOnline")
		if(!user)
		{
			return res.status(404).json({ error: "User not found" });
		}
		res.status(200).json({ isOnline: user.isOnline, lastOnline: user.lastOnline });
	}catch(error){
		console.error("Error in getUserStatus: ", error.message);
    	res.status(500).json({ error: "Internal server error" });
	}
};