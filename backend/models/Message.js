const messageSchema = new mongoose.schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: true },
    messageType: {
      type: String,
      emun: ["text", "image", "video", "file"],
      default: "text",
    },
    imageUrl: { type: String },
    status: {
      type: String,
      emun: ["sent", "delivered", "read"],
      default: "sent",
    },
    deliveredAt: Date,
    readAt: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Enable virtuals in JSON output
    toObject: { virtuals: true }, // Enable virtuals in Object output
  },
);
