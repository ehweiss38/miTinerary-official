const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
    {
        _id:{
            type:Number,
            required:true
        },
        foundCities:{
            type:Object,
            required:false
        },
        miles:{
            type:Number,
            required:false
        },
        stops:{
            type:Number,
            required:false
        },
        end:{
            type:Object,
            required:false
        },
        startObj:{
            type:Object,
            required:false
        },
        endObj:{
            type:Object,
            required:false
        },
        distanceUse:{
            type:Float32Array,
            required:false
        },
        tripN:{
            type:Object.
            required:false
        },
        mid:{
            type:Array,
            required:false
        },
        ordered:{
            type:Array,
            required:false
        },
        ready:{
            type:Array,
            required:false
        }
    }
)

const sessionDB = mongoose.model("Session", sessionSchema);
//const stopDB=mongoose.model('Stop',stopSchema)
module.exports = sessionDB