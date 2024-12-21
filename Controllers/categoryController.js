import categoryModel from "../Models/categoryModel.js";
import slugify from "slugify";

//create Category Controller 
export const createCategoryPOSTController = async(req,res)=>{
    
    try {

        const {name}= req.body;
        if(!name){
            return res.status(401).send({
                message:'Name is Required',
            })
        }

        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory){
            return res.status(200).send({
                success:true,
                message:"Category Already Exists"
            })

        }        

        const newCategory = await new categoryModel({name, slug:slugify(name)}).save();
        res.status(201).send({
            success:true,
            message:'New Category Created',
            newCategory

        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in Category Controller"
        })
        
    }

}

//Update Category Controller
export const updateCategoryPUTController =async(req,res)=>{
    try {

        const {name} = req.body
        const {id} = req.params
        const category = await categoryModel.findByIdAndUpdate(id,{name, slug:slugify(name)}, {new:true})

        res.status(200).send({
            success:true,
            message:'Category updated Successfully',
            category
        })



    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Update Category Controller not working",
            error
        })
    }
}

//Get All Categories
export const getAllCategoryGETController = async(req,res)=>{
    try {
        
        const AllCategories = await categoryModel.find({});
        res.status(200).send({
            success:true,
            message:"All Categories Extracted",
            AllCategories
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in GET All Category Controller",
            error
        })
    }
}

// Get Single Category 
export const getSingleCategoryGETController = async(req,res)=>{
    try {

        const singleCategory = await categoryModel.findOne({slug:req.params.slug});
           res.status(200).send({
                success:true,
                message:'Single Category Extracted',
                singleCategory
            })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while getting Single Category"
        })
    }
}

export const deleteCategoryDELETEController = async(req,res)=>{
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
          success: true,
          message: "Categry Deleted Successfully",
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "error while deleting category",
          error,
        });
      }
}