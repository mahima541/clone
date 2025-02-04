import { asyncHandler } from "../util/asyncHandler.js";
import {ApiError} from "../util/ApiError.js";
import { User} from "../model/user.model.js";
import {uploadOnCloudinary} from "../util/cloudinary.js";
import { ApiResponse } from "../util/ApiResponse.js";





const registerUser = asyncHandler( async (req, res) => {

    // return res.status(200).json({
    //     message: "ok"

    const {fullName, email, username, password } = req.body
 
    //------- when you left some some field empty , throw errror----------------------//
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    //----- if user name or mail allready exists------//

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    //------getting the localpath -----------//
    const avatarLocalPath = req.files?.avatar[0]?.path;
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    //------uploading to cloudinary -----------//
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    //------ creating data in db-----------///

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email, 
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    console.log(createdUser);

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }


    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    ) 

})


export {registerUser};