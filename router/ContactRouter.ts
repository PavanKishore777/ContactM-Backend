import {Router,Request,Response} from "express"
import * as contactController from"../Controller/ContactController"
import {body,validationResult} from "express-validator"

const ContactRouter:Router=Router();

/**
 * get all contacts
 */
ContactRouter.get("/",
    [
        body('name').not().isEmpty().withMessage("Name is required"),
        body('imageUrl').not().isEmpty().withMessage("Image is required"),
        body('email').not().isEmpty().isEmail().withMessage("Email is required"),
        body('mobile').not().isEmpty().withMessage("Mobile is required"),
        body('title').not().isEmpty().withMessage("Title is required"),
        body('company').not().isEmpty().withMessage("Company is required"),
        body('groupId').not().isEmpty().withMessage("Group Selection is required"),
    ],
async(request:Request,response:Response)=>{
    await contactController.getAllContacts(request,response);
});

/**
 * get contact
 */
ContactRouter.get("/:contactId",async(request:Request,response:Response)=>{
    await contactController.getContact(request,response);
});

/**
 * create contact
 */
ContactRouter.post("/",async(request:Request,response:Response)=>{
    await contactController.createContact(request,response);
});

/**
 * update contact
 */
ContactRouter.put("/:contactId",[
    body('name').not().isEmpty().withMessage("Name is required"),
    body('imageUrl').not().isEmpty().withMessage("Image is required"),
    body('email').not().isEmpty().isEmail().withMessage("Email is required"),
    body('mobile').not().isEmpty().withMessage("Mobile is required"),
    body('title').not().isEmpty().withMessage("Title is required"),
    body('company').not().isEmpty().withMessage("Company is required"),
    body('groupId').not().isEmpty().withMessage("Group Selection is required"),
],  async(request:Request,response:Response)=>{
    await contactController.updatecontact(request,response);
});

/**
 * Delete contact
 */
ContactRouter.delete("/:contactId",async(request:Request,response:Response)=>{
    await contactController.deleteContact(request,response);
});


export default ContactRouter;