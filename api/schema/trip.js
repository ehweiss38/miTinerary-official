const mongoose = require("mongoose");
const tripSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        length: {
            type:Number,
            required: true,
        },
        trip: {
            type: Array,
            required:true,
        },
        userId:{
            type:mongoose.Types.ObjectId,
            required:true
        }
        //pull and then manually set to pair
    }
);
/*
const stopSchema=new mongoose.Schema(
    {
        code:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        },
        distanceNext:{
            type:Float32Array,
            required:true
        },
        distStops:{
            type: Number,
            required:true
        },
        _id:{
            type:Number,
            required:true
        },
        latitude:{
            type:Float32Array,
            required:true
        },
        longitude:{
            type:Float32Array,
            required:true
        },
        name

    }
)
*/
const tripDB = mongoose.model("Trip", tripSchema);
//const stopDB=mongoose.model('Stop',stopSchema)
module.exports = tripDB