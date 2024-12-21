import PostModel from "../Models/PostModel.js";
import fs from 'fs';
import slugify from 'slugify'

export const createPostPOSTController = async(req,res)=>{

    try {

        const {postedBy,title,description,slug,category}= req.fields
        const {photo}  = req.files

        switch(true){
            case !title:
                return res.status(500).send({error:'Title is required'})
            case !description:
                return res.status(500).send({error:'Description is required'})
            case !category:
                return res.status(500).send({error:'category is required'})
            // case !price:
            //     return res.status(500).send({error:'price is required'});
            case photo && photo.size > 1000000 :              
                return res.status(500).send({error:'photo  is required'});
        }

        const newPost  = new  PostModel({...req.fields,slug:slugify(title)})

        if(photo){
            newPost.photo.data = fs.readFileSync(photo.path);
            newPost.photo.contentType = photo.type;
        }

        await newPost.save();

        res.status(201).send({
            success:true,
            message:"Post Created Successfully",
            newPost
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Creating POST",
            error
        })
    }
}

export const getAllPostGETController = async(req,res)=>{
    try {

        const allposts = await PostModel.find({}).select('-photo').populate('category').populate('postedBy').limit(12).sort({createdAt:-1})

        res.status(200).send({
            success:true,
            message:"All Post Extracted",
            totalPosts:allposts.length, 
            allposts
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in GET All POST Controller",
            error
        })
    }
}

export const getSinglePostGETController  = async(req,res)=>{
    try {
         
        const singlePost = await PostModel.findOne({_id:req.params._id}).select('-photo').populate('category').populate('postedBy')
        res.status(200).send({
            success:true,
            message:"Product GET",
            singlePost
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in GET Single POST Controller",
            error
        })
    }
}

export const getAllPostPhotoGETController = async(req,res)=>{
    try {
        const postPhoto = await PostModel.findById(req.params.pid).select('photo');

        if(postPhoto.photo.data){
            res.set('Content-type', postPhoto.photo.contentType)
            return res.status(200).send(postPhoto.photo.data)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Cannot GET All PHOTO",
            error
        })
    }
} 

export const getPostDELETEControllere = async(req,res)=>{
    try {
       const deletePost =  await PostModel.findByIdAndDelete(req.params.pid).select('-photo');
       res.status(200).send({
        success:true,
        message:"POST Deleted Successfully",
        deletePost
       })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Cannot DELETE PHOTO",
            error
        })
    }
} 

export const updatePostPUTController = async(req,res)=>{
 
    try {

        const {postedBy,title,description,slug,category,price}= req.fields
        const {photo}  = req.files

        switch(true){
            case !title:
                return res.status(500).send({error:'Title is required'})
            case !description:
                return res.status(500).send({error:'Description is required'})
            case !category:
                return res.status(500).send({error:'category is required'})
            case !price:
                return res.status(500).send({error:'price is required'});
            case photo && photo.size > 1000000 :              
                return res.status(500).send({error:'photo  is required'});
        }

        const newPost  = await PostModel.findByIdAndUpdate(req.params.pid,{
            ...req.fields,
            slug:slugify(title)
        }, {
            new:true
        })

        if(photo){
            newPost.photo.data = fs.readFileSync(photo.path);
            newPost.photo.contentType = photo.type;
        }

        await newPost.save();

        res.status(201).send({
            success:true,
            message:"Post updated Successfully",
            newPost
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Updating POST",
            error
        })
    }
}


//profile Post of indivisual Person extracter
export const getYourPostGETController  = async(req,res)=>{
    try {

        const {id} = req.params;

        const yourPost = await PostModel.find({postedBy:id});
        if(yourPost){
            res.status(200).send({
                success:true,
                message:"All Post get",
                yourPost
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Unable to Get Your All Posts"
        })
    }
}

export const  getSinglePostPhotoPOSTController =async(req,res)=>{
    try {

        const yourPostPhoto = await PostModel.findOne({_id:req.params.id});
        if(yourPostPhoto){
            res.status(200).send({
                success:true,
                message:"All Post get",
                yourPostPhoto
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Unable to Get Single  Post Photo"
        })
    }
}