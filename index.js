import express from "express";
import cors from "cors";
import { Sequelize }  from "sequelize";


const app = express();
app.use(cors());
app.use(express.json())
const {DataTypes} = Sequelize;




const db = new Sequelize('crud_db', 'root','',{
    host: 'localhost',
    dialect: 'mysql'
});

const User = db.define('userss',{
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING
},{
    freezeTableName:true
});

(async()=>{
    await db.sync();
})();


const getUsers = async(req, res) =>{
    try {
        const response = await User.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.massage)
    }
}
const getUserById = async(req, res) =>{
    try {
        const response = await User.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.massage)
    }
}
const createUser = async(req, res) =>{
    try {
        await User.create(req.body);

        res.status(201).json({msg: "User Created"});
    } catch (error) {
        console.log(error.massage)
    }
}
const updateUser = async(req, res) =>{
    try {
        await User.update(req.body,{
            where:{
                id: req.params.id
            }
        });

        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        console.log(error.massage)
    }
}
const deleteUser = async(req, res) =>{
    try {
        await User.destroy({
            where:{
                id: req.params.id
            }
        });

        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        console.log(error.massage)
    }
}


app.use(express.Router())

app.get('/users', getUsers);

app.get('/users/:id', getUserById);

app.post('/users', createUser);
app.patch('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);





app.listen(6000, ()=> console.log('server up and running'));