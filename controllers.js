const Model = require('./models')

const CreateUser = async (req, res) => {

    console.log('In Create Controller')
    const NewUser = new Model({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    try {
        const existingUser = await Model.find({ email: NewUser.email })
        console.log('Existing User!', existingUser)
        if (existingUser.length) {
            res.status(400).json({
                message: 'User Already Exists',
            })
        }
        else {
            const user = await NewUser.save();
            res.status(200).json({
                message: 'User Created',
                user
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Creation Failed',
            error
        })
    }
}

const LoginUser = async (req, res) => {

    console.log('In Login Controller')
    const { email, password } = req.body
    try {
        const existingUser = await Model.find({ email: email })
        if (existingUser.length) {
            const user = existingUser[0]
            if (user.password === password) {
                res.status(200).json({
                    message: 'User Logged In',
                    user: user.name
                })
            } else {
                res.status(400).json({
                    message: 'Incorrect Credentials',
                })
            }

        }
        else {
            res.status(400).json({
                message: 'Incorrect Credentials',
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Login Failed',
            error
        })
    }
}


const UpdateUser = async (req, res) => {

    console.log('In Login Controller')
    const { email, newName, newEmail } = req.body
    try {
        const existingUser = await Model.find({ email: email })
        if (existingUser.length) {
            const newUser = await Model.findOneAndUpdate({ email: email }, { name: newName, email: newEmail }, { new: true })
            res.status(200).json({
                message: 'User Updated',
                newUser
            })
        }
        else {
            res.status(400).json({
                message: 'User Not Found',
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Update Failed',
            error
        })
    }
}



const DeleteUser = async (req, res) => {

    console.log('In Login Controller')
    const { email } = req.body
    try {
        const existingUser = await Model.find({ email: email })
        if (existingUser.length) {
            const deletedUser = await Model.findOneAndDelete({ email: email })
            res.status(200).json({
                message: 'User Deleted',
                deletedUser
            })
        }
        else {
            res.status(400).json({
                message: 'User Not Found',
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Delete Failed',
            error
        })
    }
}




module.exports = { CreateUser: CreateUser, LoginUser: LoginUser, UpdateUser: UpdateUser, DeleteUser: DeleteUser }