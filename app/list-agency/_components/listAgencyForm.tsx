// "use client"

// import React, { useState } from 'react';

// const ListAgencyForm = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         tagline: '',
//         description: '',
//         location: '',
//         additionalLocations: '', // comma separated
//         founded: '',
//         teamSize: '',
//         services: '', // comma separated
//         industries: '', // comma separated
//         clientSize: '', // comma separated
//         budgetRange: '', // comma separated
//         projectDuration: '', // comma separated
//         geographicFocus: '', // comma separated
//         languages: '', // comma separated
//         startingPrice: '',
//         googleReview: { rating: '', count: '' },
//         expertise: { seo: '', marketing: '', development: '' },
//         phone: '',
//         email: '',
//         website: '',
//         address: '',
//     });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             // Convert comma separated strings to arrays
//             const updatedData = {
//                 ...formData,
//                 additionalLocations: formData.additionalLocations.split(',').map(loc => loc.trim()),
//                 services: formData.services.split(',').map(serv => serv.trim()),
//                 industries: formData.industries.split(',').map(ind => ind.trim()),
//                 clientSize: formData.clientSize.split(',').map(size => size.trim()),
//                 budgetRange: formData.budgetRange.split(',').map(range => range.trim()),
//                 projectDuration: formData.projectDuration.split(',').map(duration => duration.trim()),
//                 geographicFocus: formData.geographicFocus.split(',').map(geo => geo.trim()),
//                 languages: formData.languages.split(',').map(lang => lang.trim()),
//                 expertise: {
//                     seo: formData.expertise.seo.split(',').map(exp => exp.trim()),
//                     marketing: formData.expertise.marketing.split(',').map(exp => exp.trim()),
//                     development: formData.expertise.development.split(',').map(exp => exp.trim()),
//                 },
//                 phone: formData.phone,
//                 email: formData.email,
//                 website: formData.website,
//                 address: formData.address,
//             };
//             await addAgency(updatedData);
//             // Clear form or show success message
//         } catch (error) {
//             console.error('Error adding agency:', error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Agency Name" required />
//             <input type="text" name="tagline" value={formData.tagline} onChange={handleChange} placeholder="Tagline" />
//             <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required></textarea>
//             <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
//             <input type="text" name="additionalLocations" value={formData.additionalLocations} onChange={handleChange} placeholder="Additional Locations (comma separated)" />
//             <input type="number" name="founded" value={formData.founded} onChange={handleChange} placeholder="Founded Year" />
//             <input type="text" name="teamSize" value={formData.teamSize} onChange={handleChange} placeholder="Team Size" />
//             <input type="text" name="services" value={formData.services} onChange={handleChange} placeholder="Services (comma separated)" />
//             <input type="text" name="industries" value={formData.industries} onChange={handleChange} placeholder="Industries (comma separated)" />
//             <input type="text" name="clientSize" value={formData.clientSize} onChange={handleChange} placeholder="Client Size (comma separated)" />
//             <input type="text" name="budgetRange" value={formData.budgetRange} onChange={handleChange} placeholder="Budget Range (comma separated)" />
//             <input type="text" name="projectDuration" value={formData.projectDuration} onChange={handleChange} placeholder="Project Duration (comma separated)" />
//             <input type="text" name="geographicFocus" value={formData.geographicFocus} onChange={handleChange} placeholder="Geographic Focus (comma separated)" />
//             <input type="text" name="languages" value={formData.languages} onChange={handleChange} placeholder="Languages (comma separated)" />
//             <input type="text" name="startingPrice" value={formData.startingPrice} onChange={handleChange} placeholder="Starting Price" />
//             <input type="number" name="googleReview.rating" value={formData.googleReview.rating} onChange={handleChange} placeholder="Google Review Rating" />
//             <input type="number" name="googleReview.count" value={formData.googleReview.count} onChange={handleChange} placeholder="Google Review Count" />
//             <input type="text" name="expertise.seo" value={formData.expertise.seo} onChange={handleChange} placeholder="SEO Expertise (comma separated)" />
//             <input type="text" name="expertise.marketing" value={formData.expertise.marketing} onChange={handleChange} placeholder="Marketing Expertise (comma separated)" />
//             <input type="text" name="expertise.development" value={formData.expertise.development} onChange={handleChange} placeholder="Development Expertise (comma separated)" />
//             <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
//             <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
//             <input type="url" name="website" value={formData.website} onChange={handleChange} placeholder="Website" />
//             <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
//             <button type="submit">Add Agency</button>
//         </form>
//     );
// };

// export default ListAgencyForm;