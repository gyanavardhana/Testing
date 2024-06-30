var Conversation = require("../Models/Conversation");
var Message = require("../Models/Message");
const jwt = require("jsonwebtoken");
var socketFunctions = require("../socket/socket.js");
const Members = require("../Models/MemberModel");
var getReceiverSocketId = socketFunctions.getReceiverSocketId;
var io = socketFunctions.io;

const sendMessage = async function(req, res) {

	try {
		var message = req.body.message;
		var receiverId = req.params.id;
		var token = req.cookies.jwt;
		var senderId = jwt.verify(token, process.env.TOKEN).id;

		var conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] }
		});

		if (!conversation) {
			conversation = new Conversation({
				participants: [senderId, receiverId]
			});
		}

		var newMessage = new Message({
			senderId: senderId,
			receiverId: receiverId,
			message: message
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		await Promise.all([conversation.save(), newMessage.save()]);

		var receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("chatMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

const getMessages = async function(req, res) {
	try {
		var userToChatId = req.params.id;
		var token = req.cookies.jwt;
		var senderId = jwt.verify(token, process.env.TOKEN).id;

		var conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] }
		}).populate("messages");

		if (!conversation) return res.status(200).json([]);

		var messages = conversation.messages;
		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

const getAllSenderIds = async (req, res) => {
    try {
        const jwt1 = require("jsonwebtoken");
        const token = req.cookies.jwt;
        const decoded = jwt1.verify(token, process.env.TOKEN);
        const senderId = decoded.id;
        
        const messages = await Message.find({ receiverId: senderId });
        

        // Collect unique sender IDs using a Set
        const uniqueSenderIdsSet = new Set(messages.map(message => String(message.senderId)));
        
        // Log the unique sender IDs to see if they are indeed unique
        console.log("Unique sender IDs:", Array.from(uniqueSenderIdsSet));
        
        // Convert the Set back to an array
        const uniqueSenderIds = Array.from(uniqueSenderIdsSet);
        
        res.status(200).json(uniqueSenderIds);
    } catch (error) {
        console.log("Error in getAllSenderIds function: ", error.message);
        res.status(500).json({ error: "Failed to fetch sender IDs" });
    }
};




const getOrgId=async function(req,res){
	try{
		console.log('hi');
		const token=req.cookies.jwt;
		const decoded=jwt.verify(token,process.env.TOKEN);
		res.status(200).json({userId:decoded.id});
	}
	catch(error){
		console.log("Error in getOrgId controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
}


module.exports = {
    sendMessage,
    getMessages,
	getOrgId,
	getAllSenderIds
}