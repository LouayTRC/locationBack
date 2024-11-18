const Client = require('../models/Client');
const Discussion=require('../Models/Discussion');
const Message=require('../Models/Message');
const User=require('../models/User');
const Reservation=require('../models/Reservation');
const Driver = require('../models/Driver');

exports.createDiscussion = async (req, res, next) => {
    try {
        // Always populate 'role' when fetching user1 and user2
        const user1 = await User.findOne({ _id: req.params.sourceId }).populate('role');
        const user2 = await User.findOne({ _id: req.params.destinationId }).populate('role');

        // Check if a discussion already exists between user1 and user2
        const existingDiscussion = await Discussion.findOne({
            $or: [
                { user1: req.params.sourceId, user2: req.params.destinationId },
                { user1: req.params.destinationId, user2: req.params.sourceId }
            ]
        })
        .populate({
            path: 'user1',
            populate: { path: 'role' }
        })
        .populate({
            path: 'user2',
            populate: { path: 'role' }
        })
        .populate({
            path: 'messages',
            populate: {
                path: 'sender',
                populate: { path: 'role' }
            }
        })
        .lean(); // Convert the result to a plain JavaScript object

        if (!existingDiscussion) {
            // If no existing discussion, create a new one
            const discussion = new Discussion({
                user1,
                user2,
                messages: []
            });

            await discussion.save();
            res.status(201).send(discussion);
        } else {
            // If discussion already exists, return the populated discussion
            res.status(200).json(existingDiscussion);
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.sendMessage = async (req, res, next) => {
    try {
        // Create the message object
        const msg = new Message({
            sender: req.body.source,
            description: req.body.message, // Ensure it matches 'description' in the schema
        });

        // Save the message to the database
        const savedMessage = await msg.save();

        // Find the discussion and add the message _id to the messages array
        const updatedDiscussion = await Discussion.findOne({ _id: req.params.id });
        if (!updatedDiscussion) {
            return res.status(404).json({ error: 'Discussion not found' });
        }
        
        // Push the message's _id to the messages array
        updatedDiscussion.messages.push(savedMessage._id);

        // Save the updated discussion
        await updatedDiscussion.save();
        console.log("saved",savedMessage);
        
        // Fully populate the saved message object with sender and role details
        const populatedMessage = await Message.findOne({_id:savedMessage._id}).populate({
            path: 'sender',
            populate: {
                path: 'role'
            }
        })

        console.log("popul",populatedMessage);
        

        // Send the populated message as response
        res.status(201).json(populatedMessage);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



exports.getDiscussions=async (req,res,next)=>{
   try {
    const discussions = await Discussion.find({ $or: [{ user1: req.params.user_id }, { user2: req.params.user_id }] })
        .populate({
            path: 'messages',
                populate: {
                    path: 'sender',
                    populate: {
                        path: 'role'
                    }
                }
        })
        .populate({
            path: 'user1',
                populate: {
                    path: 'role'
                }
        })
        .populate({
            path: 'user2',
                populate: {
                    path: 'role'
                }
        })
        res.status(200).send(discussions)
   } catch (error) {
    res.status(400).json(error)
   }
        
    
}

exports.getDiscussionById=async (req,res,next)=>{
    try {
     const discussion = await Discussion.findOne({_id:req.params.id })
         .populate({
             path: 'messages',
                 populate: {
                     path: 'sender',
                     populate: {
                         path: 'role'
                     }
                 }
         })
         .populate({
             path: 'user1',
                 populate: {
                     path: 'role'
                 }
         })
         .populate({
             path: 'user2',
                 populate: {
                     path: 'role'
                 }
         })
         res.status(200).send(discussion)
    } catch (error) {
     res.status(400).json(error)
    }
         
     
 }

 exports.getContacts = async (req, res) => {
    try {
        console.log("qqqqqqq");
        let uniqueUsers = [];
        const userId = req.params.id; // Assuming user ID is passed in the request
        
        const user = await User.findOne({ _id: userId }).populate('role'); // Ensure 'role' is populated
        if (!user) {
            return res.status(200).json([]); // Return empty array if user is not found
        }

        if (user.role.name === "CLIENT") {
            // If the user is a client
            const client = await Client.findOne({ user: user });

            if (!client) {
                return res.status(200).json([]); // Return empty array if client not found
            }

            // Get all reservations where this client is involved
            const reservations = await Reservation.find({ client: client })
                .populate({
                    path: 'driver', // Populating driver for each reservation
                    populate: {
                        path: 'user', // Populating driver user reference
                        populate: {
                            path: 'role'
                        } // Adjust the fields as necessary
                    }
                });

            // Extract user objects from the drivers
            const driverUsers = reservations.map(reservation => reservation.driver.user);

            // Remove duplicates by creating a Set or using Map (based on _id)
            uniqueUsers = Array.from(new Map(driverUsers.map(user => [user._id, user])).values());

            return res.status(200).json(uniqueUsers); // Return unique array of User objects for drivers
        } else if (user.role.name === "DRIVER") {
            // If the user is a driver
            console.log("ddddd");
            
            const driver = await Driver.findOne({ user: user });

            if (!driver) {
                return res.status(200).json([]); // Return empty array if driver not found
            }

            // Get all reservations where this driver is involved
            const reservations = await Reservation.find({ driver: driver })
                .populate({
                    path: 'client', // Populating client for each reservation
                    populate: {
                        path: 'user', // Populating client user reference
                        populate:{
                            path:'role'
                        } // Adjust the fields as necessary
                    }
                });

            // Extract user objects from the clients
            const clientUsers = reservations.map(reservation => reservation.client.user);

            // Remove duplicates by creating a Set or using Map (based on _id)
            uniqueUsers = Array.from(new Map(clientUsers.map(user => [user._id, user])).values());

            return res.status(200).json(uniqueUsers); // Return unique array of User objects for clients
        } else {
            return res.status(200).json([]); // Return empty array if the role is neither CLIENT nor DRIVER
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the contacts.' });
    }
};



