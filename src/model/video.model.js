
import mongoose from "mongoose";

/*--The main usage of the plugin is you can alter the return value keys 
directly in the query itself so that you don't need any extra code for transformation------*/

import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

    const videoSchema = new Schema(
        {
            videoFile: {
                type: String, //cloudinary url
                required: true
            },
            thumbnail: {
                type: String, //cloudinary url
                required: true
            },
            title: {
                type: String, 
                required: true
            },
            description: {
                type: String, 
                required: true
            },
            duration: {
                type: Number, 
                required: true
            },
            views: {
                type: Number,
                default: 0
            },
            isPublished: {
                type: Boolean,
                default: true
            },
            owner: {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
    
        }, 
        {timestamps: true})

        videoSchema.plugin(mongooseAggregatePaginate)


 export const Video = mongoose.model("Video", videoSchema);
