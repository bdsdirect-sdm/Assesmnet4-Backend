import  {Sequelize} from "sequelize"
import dotenv from "dotenv"

dotenv.config();

const sequelize = new Sequelize("user" as string, "root" as string, "Password123#@!" as string, {
    host: "localhost" as string,
    dialect: "mysql"
} )

export const dbconnect = () =>{
    sequelize.sync({alter:true}).then(()=>{
        console.log("database connected and syncronized successfully")
    }).catch((err) =>{
        console.log(err);
        console.log("Problem in creating user")
    })
}

export default sequelize;