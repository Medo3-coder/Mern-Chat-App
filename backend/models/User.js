const userSchema = new mongoose.schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    profileImage: { type: String },
    provider: { type: String, default: "local" }, // 'local', 'google', etc.
    // provider: String (local, google, github),
    providerId: String, // ID from the OAuth provider
    emailVerified: { type: Boolean, default: false },
    verificationToken: String,
    tokenExpiry: Date,
    status: {
      type: String,
      enum: ["active", "inactive", "banned"],
      default: "active",
    },
    lastSeen: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.virtuals("fullName").get(function (){
    return `${this.firstName} ${this.lastName}`;
})
