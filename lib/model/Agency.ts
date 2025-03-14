import mongoose, { Schema, Document, Types } from "mongoose";



export interface Agency extends Document {
  _id: string;
  name: string;
  agencySlug:string;
  description: string;
  location: string;
  additionalLocations: string[];
  tagline: string;
  rating: number;
  reviewCount: number;
  budgetRange: string;
  services: string[];
  industries: string[];
  websiteUrl: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  imageUrl: string;
  founded: string;
  teamSize: string;
  hourlyRate: string;
  socialLinks:{
      facebook:string;
      linkedin:string;
      instagram:string;
      youtube:string;
  }
  slug:string[];
  slugLocation:string[];
  combinedSlug:string[];
  email:string;
  gmbLink:string;
  projectDuration?: string;


}

// Mongoose schema with type definitions
const agencySchema = new Schema<Agency>({
name: {type:String, required: true,unique:true},
agencySlug:{type:String,required:true,unique:true},
description: { type: String,  },
location: { type: String, },
tagline: { type: String },
rating: { type: Number },
reviewCount: { type: Number },
budgetRange: { type: String},
services: { type: [String],  },
industries: { type: [String], },
websiteUrl: { type: String,  },
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date, default: Date.now },
imageUrl: { type: String,  },
founded: { type: String },
hourlyRate: { type: String },
socialLinks:{
  facebook:{type:String},
  linkedin:{type:String},
  instagram:{type:String},
  youtube:{type:String},
},

slug: { type: [String], required: true },
slugLocation: { type: [String], },
combinedSlug: { type: [String], },
email: { type: String , unique:true},
gmbLink: { type: String, },
projectDuration: { type: String },
teamSize: { type: String, },
  
});

// Create the Mongoose model
const AgencyModel =
  (mongoose.models.Agency as mongoose.Model<Agency>) ||
  mongoose.model<Agency>("Agency", agencySchema);

export default AgencyModel;
