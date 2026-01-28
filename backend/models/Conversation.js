const conversationSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        participants: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        lastMessage: {type: mongoose.Schema.Types.ObjectId, ref: "Message"},
        lastMessageTime: Date,

    
    },
    {
        timestamps: true,
    }
)