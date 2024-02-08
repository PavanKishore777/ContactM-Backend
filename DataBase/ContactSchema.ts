
import mongoose from "mongoose";
import {IContact} from "../model/IContact";

const ContactSchema=new mongoose.Schema({
    name:{type:String,required:true},
    imageUrl:{type:String,required:true},
    mobile:{type:Number,required:true,unique:true},
    company:{type:String,required:true},
    email:{type:String,required:true},
    title:{type:String,required:true},
    groupId:{type:String,required:true}
},{timestamps:true});

const ContactTable=mongoose.model<IContact>('contacts',ContactSchema);
export default ContactTable;

