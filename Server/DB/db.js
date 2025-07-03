const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
    email:String,
    password:String,
    name:String
})

const UserModel = mongoose.model('Users', User);

module.exports = {
    UserModel: UserModel
}