import {APP_STATUS} from "../Constants/constant";
import {Request,Response} from "express"
import {validationResult} from "express-validator";
import GroupsTable from "../DataBase/GroupSchema";
import {IGroup} from "../model/IGroup";
import mongoose from "mongoose";

/**
 * get  groups
 * Get(m)
 * param-no
 * http://localhost:9000/contacts/:ContactID
 */
export const getAllGroups= async (request:Request,response:Response)=>{
    try{
        let groups:IGroup[]|undefined=await GroupsTable.find();
       if(groups){
           return response.status(200).json({
               status:APP_STATUS.SUCCESS,
               data:groups,
               msg:"Fetched Successfully"
           })
       }
    }catch(error:any){
        return response.status(500).json({
            status:APP_STATUS.FAILED,
            data:null,
            error:error.message
        });
    }
}

/**
 * get  group
 * Get(m)
 * param-Id
 * http://localhost:9000/contacts/:ContactID
 */
export const getGroup= async (request:Request,response:Response)=>{
    try{
        let{groupId}=request.params;
        const mongoGroupId=new mongoose.Types.ObjectId(groupId);
        let theGroup:IGroup|undefined|null=await GroupsTable.findById(mongoGroupId);
        if(!theGroup){
            return response.status(404).json({
                status:APP_STATUS.FAILED,
                data:null,
                error:"NO Group Found"
            })
        }
        return response.status(200).json({
            status:APP_STATUS.SUCCESS,
            data:theGroup,
            msg:"Fetched Successfully"
        })
    }catch(error:any){
        return response.status(500).json({
            status:APP_STATUS.FAILED,
            data:null,
            error:error.message
        });
    }
}

/**
 * create  group
 * Get(m)
 * param-Id
 * http://localhost:9000/contacts/:ContactID
 */
export const creategroup= async (request:Request,response:Response)=>{
    const errors=validationResult(request);
    if(!errors.isEmpty()){
        return response.status(500).json({errors:errors.array()})
    }
    try{
        const {name}=request.body;
        //check if namae already exists
        let group:IGroup|undefined|null=await GroupsTable.findOne({name:name});
        if(group){
            return response.status(400).json({
                status:APP_STATUS.FAILED,
                data:null,
                error:"Name is already exists"
            })
        }


        let theGroup:IGroup|undefined|null= await new GroupsTable({name:name}).save();
        if(theGroup){
            return response.status(200).json({
                status:APP_STATUS.SUCCESS,
                data:theGroup,
                mag:"Group is created"
            })
        }
    }catch(error:any){
        return response.status(500).json({
            status:APP_STATUS.FAILED,
            data:null,
            error:error.message
        });
    }
}