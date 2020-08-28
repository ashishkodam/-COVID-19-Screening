const mongoose = require('mongoose')
const schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const userSchema = new schema({
    firstName: String,
    lastName: String,
    userName: { type: String, unique: true, required: true },
    password: String,
    score: {
        type: String,
        default: null,
    },
    userRole: {
        type: String,
        default: "guest",
    },
    email: String,
    phone: String,
    location: {
        lat: {
            type: String,
            default: null,
        },
        long: {
            type: String,
            default: null,
        }
    },
    covidTest: [{
        testResult: {
            type: String,
            default: null,
        },
        testDate: {
            type: Date,
            default: null
        },
        stage: {
            type: String,
            default: "0"
        },
        score: String

    }],
    googleId: {
        type: String,
        default: uuidv4()
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    updatedOn: {
        type: Date,
        default: Date.now()
    }
});

const User = mongoose.model('user', userSchema);
module.exports = User;