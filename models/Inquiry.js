import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    type: {
        type: String,
        enum: ['contact', 'quote'],
        required: true
    },
    projectType: {
        type: String
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Inquiry = mongoose.model('Inquiry', InquirySchema);
export default Inquiry;
