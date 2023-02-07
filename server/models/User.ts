import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please add a first name'],
      trim: true,
      text: true,
    },
    lastName: {
      type: String,
      required: [true, 'Please add a last name'],
      trim: true,
      text: true,
    },
    userName: {
      type: String,
      required: [true, 'Please add a username'],
      trim: true,
      text: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      trim: true,
      text: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    picture: {
      type: String,
      trim: true,
      default: 'default.jpg', //TODO: change this link
    },
    cover: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
    },
    dob: {
      bDate: {
        type: Number,
        required: [true, 'Birth date is required'],
        trim: true,
      },
      bMonth: {
        type: Number,
        required: [true, 'Birth month is required'],
        trim: true,
      },
      bYear: {
        type: Number,
        required: [true, 'Birth year is required'],
        trim: true,
      },
    },
    verified: {
      type: Boolean,
      default: false,
    },
    friends: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    requests: {
      type: Array,
      default: [],
    },
    search: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
    details: {
      bio: {
        type: String,
      },
      otherNames: {
        type: String,
      },
      job: {
        type: String,
      },
      workPlace: {
        type: String,
      },
      highSchool: {
        type: String,
      },
      collage: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      homeTown: {
        type: String,
      },
      relationship: {
        type: String,
        enum: [
          'Single',
          'Married',
          'Engaged',
          'In a relationship',
          "It's complicated",
          'Divorce',
        ],
      },
      instagram: {
        type: String,
      },
    },
    savedPosts: [
      {
        post: {
          type: Schema.Types.ObjectId,
          ref: 'Post',
        },
        savedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);
export default User;
