import mongoose from 'mongoose';

const sliderSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: [true, 'Heading is required'],
        unique:true,
        trim: true,
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    image_url:{
        type: [String],
    },

}, { timestamps: true });

const Slider = mongoose.model('Slider', sliderSchema);

export default Slider;