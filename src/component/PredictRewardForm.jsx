
import { useState } from "react";
import axios from "axios";

const PredictReward = () => {
  const [formData, setFormData] = useState({
    category: "Furniture",
    material: "Iron",
    weight_kg: 9.1,
    age_years: 3,
  });

  const [reward, setReward] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "weight_kg" || name === "age_years"
          ? value
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setReward(null);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/reward/predict",
        {
          ...formData,
          weight_kg: Number(formData.weight_kg),
          age_years: Number(formData.age_years),
        }
      );

      setReward(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to predict reward. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-2">
        Predict Waste Reward
      </h2>

      <p className="text-gray-500 mb-6">
        Enter waste details to estimate the reward points.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">
            Waste Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          >
            <option value="Furniture">Furniture</option>
            <option value="Plastic">Plastic</option>
            <option value="Paper">Paper</option>
            <option value="Metal">Metal</option>
            <option value="Electronic">Electronic</option>
            <option value="Glass">Glass</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Material
          </label>
          <select
            name="material"
            value={formData.material}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          >
            <option value="Iron">Iron</option>
            <option value="Steel">Steel</option>
            <option value="Plastic">Plastic</option>
            <option value="Wood">Wood</option>
            <option value="Paper">Paper</option>
            <option value="Aluminium">Aluminium</option>
            <option value="Glass">Glass</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Weight (kg)
          </label>
          <input
            type="number"
            name="weight_kg"
            value={formData.weight_kg}
            onChange={handleChange}
            min="0.1"
            step="0.1"
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Age (years)
          </label>
          <input
            type="number"
            name="age_years"
            value={formData.age_years}
            onChange={handleChange}
            min="0"
            step="1"
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Predicting..." : "Predict Reward"}
        </button>
      </form>

      {error && (
        <p className="mt-4 text-red-600">{error}</p>
      )}

      {reward !== null && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800">
            Prediction Result
          </h3>

          <pre className="mt-2 whitespace-pre-wrap break-words text-sm">
            {JSON.stringify(reward, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default PredictReward;

