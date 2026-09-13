import React, { useState } from 'react';
import { 
  FiPackage, 
  FiHash, 
  FiMaximize2, 
  FiFolder, 
  FiUploadCloud, 
  FiPlusCircle, 
  FiArrowLeft,
  FiX 
} from 'react-icons/fi';

import SuccessModal from '../component/SuccessModal';

import Navbar from '../component/Navbar';
export default function AddItem({ onAddItem, onCancel }) {
  // Individual state variables
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState(0);
  const [category, setCategory] = useState('dry');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userPoints, setUserPoints] = useState(150); // Current user points state

  // Category enum array matching your schema
  const categories = [
    'dry',
    'wet',
    'food',
    'garden',
    'electrical',
    'plastic',
    'paper',
    'metal',
    'other',
  ];

  // Handle image upload & preview setup
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Clear selected image
  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItemData = {
      name,
      quantity: Number(quantity),
      weight: Number(weight),
      category,
      image,
    };

    setIsModalOpen(true)

    console.log('Submitted Item Data:', newItemData);

    if (onAddItem) {
      onAddItem(newItemData);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Navigate user to home or reset form here
  };

  return (

    <>

    <Navbar></Navbar>

    <SuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        points={100}
        onViewHome={handleCloseModal}
      />

    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-5">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <FiPlusCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Add New Item</h2>
              <p className="text-xs text-gray-500">Fill in the details to register a new item</p>
            </div>
          </div>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
            >
              <FiArrowLeft className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Item Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
              Item Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <FiPackage className="w-5 h-5" />
              </div>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Plastic Bottles, Cardboard Boxes"
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400 text-sm"
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1.5">
              Category
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <FiFolder className="w-5 h-5" />
              </div>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 text-sm bg-white capitalize appearance-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quantity and Weight Numeric Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Quantity Input */}
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1.5">
                Quantity
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <FiHash className="w-5 h-5" />
                </div>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  step="1"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  placeholder="1"
                  className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400 text-sm"
                />
              </div>
            </div>

            {/* Weight Input */}
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1.5">
                Weight (kg)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <FiMaximize2 className="w-5 h-5" />
                </div>
                <input
                  id="weight"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  placeholder="0.00"
                  className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Image Upload Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Item Image
            </label>
            
            {imagePreview ? (
              <div className="relative w-full h-48 rounded-xl overflow-hidden border border-gray-200">
                <img 
                  src={imagePreview} 
                  alt="Item Preview" 
                  className="w-full h-full object-cover" 
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-3 right-3 p-1.5 bg-gray-900/70 hover:bg-gray-900 text-white rounded-full transition"
                  title="Remove image"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-blue-500 transition">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500">
                  <FiUploadCloud className="w-8 h-8 mb-2 text-blue-500" />
                  <p className="mb-1 text-sm font-semibold text-gray-700">Click to upload image</p>
                  <p className="text-xs text-gray-400">PNG, JPG or WEBP (MAX. 5MB)</p>
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

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-4">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="w-1/3 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition cursor-pointer"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="flex-1 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition cursor-pointer"
            >
              Add Item
            </button>
          </div>

        </form>
      </div>
    </div>
    </>
    
  );
}