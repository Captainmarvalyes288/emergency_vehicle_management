const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("node:crypto");
const { createTokenForUser } = require("../server/auth");

const userSchema = new Schema(
  {
    Fullname: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      sparse: true
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/default.png",
    },
    role: {
      enum: ["User-side", "Hospital-side"],
      type: String,
      default: "User-side",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const salt = randomBytes(16).toString('hex');
  const hashPassword = createHmac('sha256', salt)
      .update(user.password)
      .digest('hex');

  this.salt = salt;
  this.password = hashPassword;

  next();
});


userSchema.static("matchPasswordandGenToken" , async function(email, password) {
  const user = await this.findOne({ email }).exec();
  if (!user) throw new Error('Could not find user');

  const salt = user.salt;
  const hashPassword = user.password;

  const userProvidedHash = createHmac('sha256', salt)
      .update(password)
      .digest('hex');

  if (hashPassword !== userProvidedHash)
      throw new Error('Password is not valid');

  const token = createTokenForUser(user);
  return token;
});


const User = model("user", userSchema);

module.exports = User;
