const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, 'Please tell us your name']
      },
      email: {
         type: String,
         required: [true, 'Please provide us your email'],
         unique: true,
         lowercase: true,
         validate: [validator.isEmail, 'Please enter a valid email address']
      },
      photo: {
         type: String,
         default: 'default.jpg'
      },
      role: {
         type: String,
         enum: {
            values: ['admin', 'user', 'guide', 'lead-guide'],
            message: 'Role can be either: admin, user, guide or lead-guide'
         },
         default: 'user'
      },
      password: {
         type: String,
         required: [true, 'Please enter a password'],
         minlength: [8, 'Password must contain at least 8 characters'],
         select: false
      },
      passwordConfirm: {
         type: String,
         required: [true, 'Please confirm your password'],
         validate: {
            // This only works on CREATE and SAVE!!!
            validator: function(val) {
               return val === this.password;
            },
            message: 'Passwords do not match'
         }
      },
      passwordChangedAt: Date,
      passwordResetToken: String,
      passwordResetExpires: Date,
      active: {
         type: Boolean,
         default: true,
         select: false
      }
   },
   {
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
   }
);

userSchema.pre('save', async function(next) {
   // Return from this middleware if the password has not been changed
   if (!this.isModified('password')) return next();

   // Create the hash
   this.password = await bcrypt.hash(this.password, 12);

   // Delete the passwordConfirm field
   this.passwordConfirm = undefined;
   next();
});

userSchema.pre('save', function(next) {
   if (this.isModified('password') && !this.isNew) {
      this.passwordChangedAt = Date.now() - 1000;
   }
   next();
});

userSchema.pre(/^find/, function(next) {
   // this keyword points to the current query
   this.find({ active: { $ne: false } });
   next();
});

/* INSTANCE METHODS */
userSchema.methods.checkPassword = async function(
   candidatePassword,
   userPassword
) {
   return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
   if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
         this.passwordChangedAt.getTime() / 1000,
         10
      );
      return changedTimestamp > JWTTimestamp;
   }
   return false;
};

userSchema.methods.createPasswordResetToken = function() {
   const randomToken = crypto.randomBytes(32).toString('hex');
   this.passwordResetToken = crypto
      .createHash('sha256')
      .update(randomToken)
      .digest('hex');

   this.passwordResetExpires = Date.now() + 600000;

   return randomToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
