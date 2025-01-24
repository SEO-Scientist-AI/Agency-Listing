import mongoose from 'mongoose';

const AgencySchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  tagline: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  founded_year: { type: Number, required: true },
  team_size: { type: String, required: true },
  starting_price: { type: String, required: true },
  min_budget: { type: Number, required: true },
  max_budget: { type: Number, required: true },
  budget_ranges: { type: mongoose.Schema.Types.Mixed, required: true },
  services: { type: mongoose.Schema.Types.Mixed, required: true },
  industries: { type: mongoose.Schema.Types.Mixed, required: true },
  client_sizes: { type: mongoose.Schema.Types.Mixed, required: true },
  project_durations: { type: mongoose.Schema.Types.Mixed, required: true },
  locations: { type: mongoose.Schema.Types.Mixed, required: true },
  languages: { type: mongoose.Schema.Types.Mixed, required: true },
  google_rating: { type: Number, required: true },
  google_review_count: { type: Number, required: true },
  expertise: { type: mongoose.Schema.Types.Mixed, required: true },
  created_at: { type: Date, default: Date.now }
}, {
  timestamps: true
});

AgencySchema.index({ slug: 1 });
AgencySchema.index({ location: 1 });

export default mongoose.models.Agency || mongoose.model('Agency', AgencySchema);
