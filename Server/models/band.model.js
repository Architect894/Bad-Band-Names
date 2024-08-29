const mongoose = require ('mongoose');

const BandSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true, "Band's name is required"],
        minLength: [1, "Band's name must be at least 1 character long"],
        maxLength: [40, "Band's name cannot be more than 40 characters long"]
    },
    gigRate:{
        type:Number,
        required: [true, "Band's age is required"],
        minLength: [1, "Band's gig rate must be at least 1 dollar or more"],
        maxLength: [500000, "Band's gig rate cannot be over 50,000 dollars"]
    },
    achievements:{
        type:String,
        required: [true, "Band's achievements are required"],
        minLength: [4, "Band's achievements must be described in at least 4 characters"],
    }

    // For created at and updated at
}, {timestamps:true} )

module.exports = mongoose.model('Band', BandSchema);
