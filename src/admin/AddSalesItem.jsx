import React, { useState } from 'react';
import { Plus, X, Upload, Package, DollarSign, Layers, Tag, FileText, ArrowLeft } from 'lucide-react';
import { adminService } from '../services/adminService';

const AddSalesItem = ({ onSave, onBack }) => {
  
  const [formData, setFormData] = useState({
    name: '',
    manufacturer: '',
    price: '',
    quantity: '',
    about: '',
    image: null,
    imagePreview: '',
    materials: [''], // Array for materials list
  });

  // Handle standard input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Image Upload & Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null, imagePreview: '' }));
  };

  // Handle Materials Array Dynamic Inputs
  const handleMaterialChange = (index, value) => {
    const updatedMaterials = [...formData.materials];
    updatedMaterials[index] = value;
    setFormData((prev) => ({ ...prev, materials: updatedMaterials }));
  };

  const addMaterialField = () => {
    setFormData((prev) => ({ ...prev, materials: [...prev.materials, ''] }));
  };

  const removeMaterialField = (index) => {
    if (formData.materials.length === 1) return; // Keep at least one field
    const updatedMaterials = formData.materials.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, materials: updatedMaterials }));
  };

  // Handle Form Submission
  const handleSubmit = async(e) => {

    console.log(formData.image)
    e.preventDefault();

    try{

        const item=await adminService.createSalesItem(formData)

        console.log(item)
    }
    catch(err){
        console.log(`${err}`)
    }
   
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Header Section */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
                type="button"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Add New Sales Item</h1>
              <p className="text-xs sm:text-sm text-gray-500">Fill in the item details to add it to your inventory.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Image Upload Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Item Image</label>
            {formData.imagePreview ? (
              <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden border border-gray-200 group">
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-3 right-3 p-1.5 bg-gray-900/70 hover:bg-gray-900 text-white rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm font-medium text-gray-600">Click to upload or drag & drop</p>
                  <p className="text-xs text-gray-400">PNG, JPG or WEBP (Max 5MB)</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Name & Manufacturer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Item Name</label>
              <div className="relative">
                <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Ergonomic Office Chair"
                  required
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Manufacturer</label>
              <div className="relative">
                <Package className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleChange}
                  placeholder="e.g. Acme Corporation"
                  required
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Price & Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Price ($)</label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Quantity (Pieces)</label>
              <div className="relative">
                <Layers className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  min="0"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 50"
                  required
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                />
              </div>
            </div>
          </div>

          {/* About / Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">About Item</label>
            <div className="relative">
              <FileText className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <textarea
                name="about"
                rows="3"
                value={formData.about}
                onChange={handleChange}
                placeholder="Write a brief description about the product features..."
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all resize-none"
              ></textarea>
            </div>
          </div>

          {/* Materials Used (Dynamic Array) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Materials Used</label>
              <button
                type="button"
                onClick={addMaterialField}
                className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Material
              </button>
            </div>

            <div className="space-y-2">
              {formData.materials.map((material, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={material}
                    onChange={(e) => handleMaterialChange(index, e.target.value)}
                    placeholder={`Material #${index + 1} (e.g. Aluminum, Mesh Fabric)`}
                    className="flex-1 px-4 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                  />
                  {formData.materials.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMaterialField(index)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end space-x-3">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl transition-colors shadow-sm"
            >
              Add Item
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddSalesItem;