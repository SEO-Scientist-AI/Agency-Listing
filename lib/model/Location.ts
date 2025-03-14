import mongoose, { Schema, Document, Types } from 'mongoose';

export interface Location extends Document {
    cityName: string;
    citySlug: string;
    countryName: string;
    countrySlug: string;
}

const locationSchema = new Schema<Location>({
  cityName: {
    type: String,
    required: true,
    unique: true,
  },
  citySlug: {
    type: String,
    required: true,
    unique: true,
  },
  countryName: {
    type: String,
    required: true,
  },
  countrySlug: {
    type: String,
    required: true,
  }
});

const LocationModel = 
  (mongoose.models.Location as mongoose.Model<Location>) || 
  mongoose.model<Location>('Location', locationSchema);

export default LocationModel;
