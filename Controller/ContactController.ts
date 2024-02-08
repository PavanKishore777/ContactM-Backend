import {Request,Response} from "express"
import {APP_STATUS} from "../Constants/constant";
import {validationResult} from "express-validator";
import ContactTable from "../DataBase/ContactSchema";
import {IContact} from "../model/IContact";
import mongoose from "mongoose";


/**
 * get all contacts
 * Get(m)
 * no - params
 * http://localhost:9000/contacts
 */


export const getAllContacts= async (request:Request,response:Response)=>{

    try{
        let contacts:IContact[]|undefined=await ContactTable.find();//ge all contacts

        if(contacts){
            return response.status(200).json({
                status:APP_STATUS.SUCCESS,
                data:contacts,
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
 * get  contacts
 * Get(m)
 * param;Id
 * http://localhost:9000/contacts/:ContactID
 */
export const getContact= async (request:Request,response:Response)=>{
    try{
        let{contactId}=request.params;
        if(contactId){
            const mongoContactId=new mongoose.Types.ObjectId(contactId);//string id to mongo db supported id
            const contact:IContact|undefined |null =await ContactTable.findById(mongoContactId);
            if(!contact){
                return response.status(404).json({
                    status:APP_STATUS.FAILED,
                    data:null,
                    error:"NO Contact is Founded"
                });
            }else{
                return response.status(200).json({
                    status:APP_STATUS.SUCCESS,
                    data:contact,
                    msg:"SUCCESSFULLY FETCHED A SINGLE CONTACT"
                })
            }
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
 * create  contacts
 * Get(p)
 *  params-name,img,title,comp,mob,email....
 * http://localhost:9000/contacts
 */
export const createContact= async (request:Request,response:Response)=>{
    const errors=validationResult(request);
    if(!errors.isEmpty()){
        return response.status(500).json({errors:errors.array()})
    }
    try{
        /**
         * points to check
         * read data from form
         * check mobile exists
         * create a contact proceed
         */
        let{name,imageUrl,mobile,company,email,title,groupId}=request.body;

        let contact= await ContactTable.findOne({mobile:mobile});//select * from where mobile == mobile
        if(contact){
            return response.status(400).json({
                msg:"number already exist",
                status:APP_STATUS.FAILED,
                error:"Mobile is already existed"

            })
        }
        //let newContact=new ContactTable({name,imageUrl,mobile,company,email,title,groupId})
        let newContact:IContact={
            name:name,
            imageUrl:imageUrl,
            company:company,
            email:email,
            title:title,
            groupId:groupId,
            mobile:mobile
        }
        newContact= await new ContactTable(newContact).save();
        if(newContact){
            return response.status(200).json({
                status:APP_STATUS.SUCCESS,
                data:newContact,
                msg:"CONTACT IS CREATED"
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
 * update  contacts
 * Get(p)
 *  params-name,img,title,comp,mob,email....
 * http://localhost:9000/contacts/:contactId
 */
export const updatecontact= async (request:Request,response:Response)=>{
    const{contactId}=request.params;

    const errors=validationResult(request);
    if(!errors.isEmpty()){
        return response.status(500).json({errors:errors.array()})
    }
    try{
        /**
         * points to check
         * read data from form
         * check mobile exists
         * Update a contact proceed
         */
        let{name,imageUrl,mobile,company,email,title,groupId}=request.body;
        const mongoContactId=new mongoose.Types.ObjectId(contactId);

        let contact: IContact | undefined | null= await ContactTable.findById(mongoContactId);//select * from where id==id
        if(!contact){
            return response.status(404).json({
                status:APP_STATUS.FAILED,
                error:"Contact is Not Found"

            });
        }
        //let newContact=new ContactTable({name,imageUrl,mobile,company,email,title,groupId})
        let newContact:IContact | null ={
            name:name,
            imageUrl:imageUrl,
            company:company,
            email:email,
            title:title,
            groupId:groupId,
            mobile:mobile
        }
        newContact = await ContactTable.findByIdAndUpdate(mongoContactId,
            {$set:newContact},
            {new:true}
        );
        if(newContact){
            return response.status(200).json({
                status:APP_STATUS.SUCCESS,
                data:newContact,
                msg:"CONTACT IS UPDATED"
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
 * Delete contacts
 * Get(D)
 * no - params
 * http://localhost:9000/contacts/:contactId
 */

export const deleteContact= async (request:Request,response:Response)=>{

    try{
        let{contactId}=request.params;
        if(contactId){
            const mongoContactId=new mongoose.Types.ObjectId(contactId);//string id to mongo db supported id
            const contact:IContact|undefined |null =await ContactTable.findById(mongoContactId);
            if(!contact){
                return response.status(404).json({
                    status:APP_STATUS.FAILED,
                    data:null,
                    error:"NO Contact is Founded"
                });
            }
            let theContact:IContact|null|undefined=await ContactTable.findByIdAndDelete(mongoContactId);
            if(theContact){
                return response.status(200).json({
                    status:APP_STATUS.SUCCESS,
                    data:contact,
                    msg:"SUCCESSFULLY FETCHED AND DELETED CONTACT"
                })
            }


        }


    }catch(error:any){
        return response.status(500).json({
            status:APP_STATUS.FAILED,
            data:null,
            error:error.message
        });
    }
}