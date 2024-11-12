import { useState, useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const [isOnline, setIsOnline] = useState(false);
	const [lastOnline, setLastOnline] = useState(null);

	const fetchUserStatus = async () => {
		try {
			const response = await fetch(`/api/user/status/${selectedConversation.id}`);
			const data = await response.json();
			setIsOnline(data.isOnline);
			setLastOnline(data.lastOnline);
		} catch (error) {
			console.error("Failed to fetch user status", error);
		}
	};

	useEffect(() => {
		// Cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	useEffect(() => {
		if (selectedConversation) {
			// Fetch status immediately when component mounts or selectedConversation changes
			fetchUserStatus();

			// Set up interval to refresh status every 5 seconds
			const intervalId = setInterval(fetchUserStatus, 5000);

			// Clean up interval on component unmount
			return () => clearInterval(intervalId);
		}
	}, [selectedConversation]);

	return (
		<div className="md:min-w-[450px] flex flex-col bg-white">
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className="px-4 py-2 mb-2" style={{ backgroundColor: "#f0f0f5" }}>
						<span className="label-text">To:</span>{" "}
						<span className="text-indigo-600 font-bold">{selectedConversation.fullName}</span>
						{/* Online Status part */}
						<div className="flex items-center mt-1">
							<span className={`w-2 h-2 rounded-full mr-1 ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}/>
							<span className="text-sm text-gray-600">
								{isOnline ? 'Online' : `Last online: ${lastOnline ? new Date(lastOnline).toLocaleString() : 'N/A'}`}
							</span>
						</div>
					</div>
					<Messages />
					<MessageInput />
				</>
			)}
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className="flex items-center justify-center w-full h-full">
			<div className="px-4 text-center sm:text-lg md:text-xl text-indigo-600 font-semibold flex flex-col items-center gap-2">
				<p>Welcome 👋 {authUser.fullName} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className="text-3xl md:text-6xl text-center" />
			</div>
		</div>
	);
};