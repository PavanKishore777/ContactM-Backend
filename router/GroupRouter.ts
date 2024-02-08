import {Router,Request,Response} from "express";
import * as groupRouter from "../Controller/GroupController";
import {body} from "express-validator";
import {creategroup} from "../Controller/GroupController";

const GroupRouter:Router=Router();

GroupRouter.get("/",async(request:Request,response:Response)=>{
    await groupRouter.getAllGroups(request,response);
});

GroupRouter.get("/:groupId",async(request:Request,response:Response)=>{
    await groupRouter.getGroup(request,response);
})
/**
 * CREATE GROUP FIRST ONE TO DO
 */
GroupRouter.post("/",[
    body('name').not().isEmpty().withMessage("Name is required")
],async(request:Request,response:Response)=>{
    await groupRouter.creategroup(request,response);
});

export default GroupRouter;