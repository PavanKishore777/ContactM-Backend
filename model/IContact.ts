

export interface IContact{
    _id?:string;
    name: string;
    company: string;
    email: string;
    title: string;
    mobile: string;
    imageUrl: string;
    groupId: string;
    createdAt?:Date;
    updatedAt?:Date
}