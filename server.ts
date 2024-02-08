import express,{Application,Request,Response} from "express";
import dotenv from "dotenv"
import {DBUtil} from "./Util/DBUtil";
import contactRouter from "./router/ContactRouter";
import groupRouter from "./router/GroupRouter";

const app:Application=express();



app.use(express.json());
/**
 *dotenv config
 */

dotenv.config({
    path:"./.env"
});




const port :string| number=process.env.PORT || 9000;
const dbUrl:string|undefined=process.env.MONGO_DB_CLOUD_URL;
const dbName:string|undefined=process.env.MONGO_DB_DATABASE;

app.get("/",(request:Request,response:Response)=>{
    response.status(200);
    response.json({
        msg:"Welcome to the node express server"
    });
});

/**
 * config the router
 */
app.use("/contacts",contactRouter);
app.use("/groups",groupRouter);




if(port){
    app.listen(Number(port),()=>{
        if(dbUrl &&dbName){
            DBUtil.connectToDB(dbUrl,dbName).then((dbResponse)=>{
                console.log(dbResponse)
            }).catch((error)=>{
                console.error(error);
                process.exit(0);//Force stop server
            })
        }
    })
    console.log(`server running on  http://:${port}`)
}
