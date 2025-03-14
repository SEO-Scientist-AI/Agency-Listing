import mongoose, { Schema, Document, Types } from 'mongoose';

export interface Industry extends Document {
    industryName: string;
    slug: string;
}

const industrySchema = new Schema<Industry>({
    industryName: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
});

const IndustryModel = (mongoose.models.Industry as mongoose.Model<Industry>) || mongoose.model<Industry>('Industry', industrySchema);

export default IndustryModel;
