const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please tell us your firstname'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Please tell us your lastname'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowerCase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      validate: {
        validator: function (value) {
          return validator.isMobilePhone(value, 'ar-EG', {
            strictMode: true,
          });
        },
        message: 'Please provide a valid Egyptian phone number',
      },
    },
    addresses: [
      {
        address: {
          type: String,
          required: true,
        },

        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'Please provide a valid password'],
      minlength: 8,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
