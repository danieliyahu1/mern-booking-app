import express, {Request, Response} from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";
import verifyToken from "../middleware/auth";
import {body} from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 5 * 1024 * 1024
    }
});
router.post("/", verifyToken, [body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("country is required"),
    body("description").notEmpty().withMessage("description is required"),
    body("type").notEmpty().withMessage("type is required"),
    body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night is required and must be a number"),
    body("facilities").notEmpty().isArray().withMessage("facilities is required"),

], upload.array("imageFiles", 6), async (req: Request, res: Response) => {
    try{
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;        

        //upload images to cloudinary
        const uploadPromises = imageFiles.map(async(image)=>{
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI = "data:" + image.mimetype + ";base64," + b64;
            const res = await cloudinary.v2.uploader.upload(dataURI);
            return res.url;
        });

        const imageUrls = await Promise.all(uploadPromises);
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;

        //save new hotel in our database
        const hotel = new Hotel(newHotel);
        await hotel.save();

        //return 201 status
        res.status(201).send(hotel);
    }
    catch(e){
        console.log("Error creating hotel: ", e);
        res.status(500).json({ message: "Somthing went wrong"});
    }
    })

    export default router;