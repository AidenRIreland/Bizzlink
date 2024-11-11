import User from "../models/user.model.js";

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

export const getUserById = async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await User.findById(userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		res.status(200).json(user);
	} catch (error) {
		console.error("Error in getUserById:", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
