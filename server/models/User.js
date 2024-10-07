const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// Pre-save hook to hash the password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is modified or new

  try {
    const salt = await bcrypt.genSalt(10); // Generate a salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next(); // Proceed to save the user
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password); // Compare candidate password with stored hash
};

module.exports = mongoose.model("User", UserSchema);
