const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

//static signup method
userSchema.statics.signup = async function(username, password) {
    //validation
    if (!username || !password) {
        throw Error('All fields must be filled');
    }
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
        throw Error('Username must be 3–20 characters, letters/numbers/underscores only');
    }
    if (!validator.isStrongPassword(password, {minNumbers: 0})) {
        throw Error('Password Requires: 6-20 characters, uppercase, lowercase, and symbol');
    }
    //check if username already exists
    const exists = await this.findOne({ username });
    if (exists) {
        throw Error('username already in use');
    }
    //hash password with salt and create user
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ username, password : hash });
    return user;
};

//static login method
userSchema.statics.login = async function(username, password) {
    //validation
    if (!username || !password) {
        throw Error('All fields must be filled');
    }
    //check if username exists
    const user = await this.findOne({username});
    if (!user) {
        throw Error('Incorrect username');
    }
    //check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error('Incorrect password');
    }
    return user;
};

module.exports = mongoose.model('User', userSchema);