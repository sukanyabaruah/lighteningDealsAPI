const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "secret";
const { attachCookiesToResponse } = require('../utils/jwt');
const { createTokenUser } = require('../utils/createTokenUser');

const createNewUser = async (req, res) => {

    const { userName, password: plainTextPassword } = req.body;
    if (!userName || typeof userName !== 'string') {
        return res.json({ status: 'error', error: 'Invalid username' })
    }

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Invalid password' })
    }

    if (plainTextPassword.length < 5) {
        return res.json({
            status: 'error',
            error: 'Password too small. Should be atleast 6 characters'
        })
    }

    const password = await bcrypt.hash(plainTextPassword, 10);

    //first registered user is admin
    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? 'admin' : 'user';

    try {
        const createUser = await User.create({
            userName,
            password,
            role
        });
        console.log("user created", createUser);
        res.json({ status: "ok", msg: "user created" });
    } catch (error) {
        res.status(400).json(error);
    }

}

const userLogin = async (req, res) => {
    const { userName, password } = req.body;

    if(!userName || !password){
        return res.json({ status: 'error', error:'please provide username and password' });
    }

    const user = await User.findOne({ userName });
    console.log(user);

    if (!user) {
        return res.json({ status: 'error', error: `no such user with username ${userName}` });
    }

    if (await bcrypt.compare(password, user.password)) {
        // const token = jwt.sign({
        //     id: user._id,
        //     userName: user.userName
        // }, JWT_SECRET, { expiresIn: '1d' });
        const tokenUser = createTokenUser(user);
        attachCookiesToResponse({ res, user: tokenUser });
        return res.json({ status: 'ok', data: tokenUser })
    }

    return res.json({ status: 'error', error: "invalid username/password" });
}

const changePassword = async (req, res) => {

    const { token, newpassword: plainTextPassword } = req.body;

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'invalid password' })
    }

    if (plainTextPassword.length < 6) {
        return res.json({ status: 'error', error: 'password should be more than 6 characters' })
    }

    try {
        const user = jwt.verify(token, JWT_SECRET);
        const password = await bcrypt.hash(plainTextPassword, 10)
        const _id = user.id;
        await User.updateOne(
            { _id },
            {
                $set: { password }
            }
        )
        res.json({ status: "ok" });
    } catch (error) {
        console.log(error);
        res.json({ status: "error" })
    }

}

module.exports = { createNewUser, userLogin, changePassword };