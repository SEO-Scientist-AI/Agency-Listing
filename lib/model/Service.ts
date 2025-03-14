import mongoose,{Schema,Document,Types} from 'mongoose';
export interface Service extends Document {
    serviceName:string;
    slug:string;
}
const serviceSchema = new Schema<Service>({
  serviceName: {
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

const ServiceModel = (mongoose.models.Service as mongoose.Model<Service>) || mongoose.model<Service>('Service', serviceSchema);

export default ServiceModel;