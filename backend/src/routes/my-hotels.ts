import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";
import { verifyToken } from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage(); // store the image in memory as a buffer

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB
  },
});

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      // upload the image to cloudinary
      const imageUrls = await uploadImages(imageFiles);

      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      // save the new hotel in our database
      const hotel = new Hotel(newHotel);
      await hotel.save();

      res.status(201).json(hotel);
    } catch (error) {
      console.log("Error Creating hotel:", error);
      res.status(500).json({ msg: "Something went Wrong!" });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching hotels" });
  }
});

async function uploadImages(imageFiles: Express.Multer.File[]) {
  // upload the image to cloudinary
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64; //Need to figure out
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });
  const imageUrls = await Promise.all(uploadPromises);

  return imageUrls;
}

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const hotel = await Hotel.findById({ _id: id, userId: req.userId });
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching hotel" });
  }
});


router.put('/:id',verifyToken,upload.array("imageFiles",6),async(req:Request,res:Response)=>{
  const id = req.params.id
  console.log(id)
try {
  // console.log(req.body)
  const imageFiles = req.files as Express.Multer.File[];
  const updatedHotel: HotelType = req.body;
  updatedHotel.lastUpdated=new Date()


  // upload the image to cloudinary
  const updateImageUrls = await uploadImages(imageFiles);


  const hotel=await Hotel.findOneAndUpdate({_id:id,userId:req.userId},updatedHotel,{new:true})

  if(!hotel){
    return res.status(404).json({msg:"Hotel not found"})
  }

  hotel.imageUrls=[...updateImageUrls,...(updatedHotel.imageUrls || [])] //again need to figure out


  await hotel.save()

  res.status(201).json(hotel)
  
} catch (error) {
  console.log(error)
}
})

export default router;
