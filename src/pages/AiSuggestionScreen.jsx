import React, { useState } from 'react';
import { 
  UploadCloud, Sparkles, ArrowLeft, RefreshCw, 
  Recycle, Wrench, CheckCircle2, ChevronDown, 
  ChevronUp, Layers, Tag, Image as ImageIcon 
} from 'lucide-react';
import { itemService } from '../services/itemService';


// Mock response matching your exact JSON schema
const MOCK_AI_RESPONSE = {
  item: "Plastic Soda Bottle (2 Liter)",
  material: "PET Plastic (#1)",
  condition: "Usable / Slightly dented",
  reuseIdeas: [
    {
      title: "Self-Watering Plant Pot",
      description: "Cut the bottle in half to create a sub-irrigated planter perfect for kitchen herbs.",
      difficulty: "Easy",
      materials: ["2L Bottle", "Cotton String", "Potting Soil", "Herb Seeds", "Craft Scissors"],
      steps: [
        "Cut the plastic bottle in half horizontally.",
        "Poke a small hole in the bottle cap and thread the cotton string through it.",
        "Invert the top half into the bottom half like a funnel.",
        "Fill the bottom half with water and the top half with soil and seeds."
      ]
    },
    {
      title: "Vertical Hanging Garden Tier",
      description: "Create a space-saving outdoor planter by linking cut bottle sections vertically.",
      difficulty: "Medium",
      materials: ["Multiple 2L Bottles", "Sturdy Twine/Rope", "Soil", "Small Plants", "Hole Punch"],
      steps: [
        "Cut a rectangular window out of the side of each bottle.",
        "Punch drain holes on the bottom and hanging holes on both ends.",
        "Thread twine through the bottles, securing each level with knots.",
        "Fill with soil, plant greens, and hang in a sunny spot."
      ]
    }
  ],
  recyclingAdvice: "Rinse thoroughly and crush to save space. Check local curbside recycling programs as PET (#1) plastic is universally accepted in standard recycling bins."
};

export default function AiSuggestionScreen({ onBack }) {
  const [image, setImage] = useState(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [openStepIndex, setOpenStepIndex] = useState(0);

  
const idea = async (file) => {
  console.log(file);

  try {
    const result = await itemService.getAiSuggestion(file);

    console.log(result);

    setAnalysisResult(result);
  } catch (err) {
    console.log(err);
  }
};

const handleImageUpload = (e) => {
  const file = e.target.files?.[0];

  if (file) {
    const imageUrl = URL.createObjectURL(file);

    setImage(imageUrl);

    // Send actual File to backend
    idea(file);
  }
};
  

  const handleReset = () => {
    setImagePreview(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  const getDifficultyBadge = (level) => {
    switch (level.toLowerCase()) {
      case 'easy':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'medium':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'hard':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 md:p-8 flex flex-col items-center">
      {/* Top Header */}
      <header className="w-full max-w-3xl flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <h1 className="font-bold text-lg text-white">AI Material Analyzer</h1>
        </div>
      </header>

      <main className="w-full max-w-3xl space-y-6">
        {/* Step 1: Image Upload State */}
        {!image && (
          <div className="border-2 border-dashed border-slate-800 hover:border-emerald-500/50 bg-slate-900/50 rounded-3xl p-8 sm:p-12 text-center transition-all">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="material-upload"
              className="hidden"
            />
            <label
              htmlFor="material-upload"
              className="cursor-pointer flex flex-col items-center justify-center space-y-4"
            >
              <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                <UploadCloud className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Upload or Snap Material Photo</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Take a picture of household waste, fabric, wood, plastic, or glass
                </p>
              </div>
              <span className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20">
                Choose Image
              </span>
            </label>
          </div>
        )}

        {/* Image Preview & Actions */}
        {image && (
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 flex flex-col sm:flex-row items-center gap-4 p-4">
            <img
              src={image}
              alt="Uploaded scrap material"
              className="w-full sm:w-32 h-32 object-cover rounded-xl border border-slate-700"
            />
            <div className="flex-1 w-full text-center sm:text-left">
              <p className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-1">Uploaded Image</p>
              <h2 className="text-sm font-medium text-slate-300 truncate">Scrap material image ready</h2>
              <p className="text-xs text-slate-500 mt-1">Analyzing textures, material composition, and durability</p>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {isAnalyzing && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center flex flex-col items-center justify-center space-y-3">
            <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
            <p className="text-sm font-medium text-slate-300">Scanning material with Vision AI...</p>
            <p className="text-xs text-slate-500">Identifying material type and generating upcycle ideas</p>
          </div>
        )}

        {/* Output Display */}
        {analysisResult && (
          <div className="space-y-6">
            {/* Overview Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> AI Material Diagnostics
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <Tag className="w-3.5 h-3.5 text-emerald-400" /> Item Identified
                  </div>
                  <p className="font-semibold text-white text-sm">{analysisResult.item}</p>
                </div>

                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <Layers className="w-3.5 h-3.5 text-teal-400" /> Material
                  </div>
                  <p className="font-semibold text-white text-sm">{analysisResult.material}</p>
                </div>

                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" /> Condition
                  </div>
                  <p className="font-semibold text-white text-sm">{analysisResult.condition}</p>
                </div>
              </div>
            </div>

            {/* Reuse & Craft Ideas */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Wrench className="w-4 h-4 text-emerald-400" /> DIY & Reuse Ideas ({analysisResult.reuseIdeas.length})
              </h3>

              {analysisResult.reuseIdeas.map((idea, index) => {
                const isOpen = openStepIndex === index;
                return (
                  <div 
                    key={index}
                    className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all"
                  >
                    <div 
                      onClick={() => setOpenStepIndex(isOpen ? null : index)}
                      className="p-5 flex items-start justify-between cursor-pointer hover:bg-slate-800/40 transition-colors"
                    >
                      <div className="space-y-1 pr-4">
                        <div className="flex items-center gap-2.5">
                          <h4 className="font-bold text-base text-white">{idea.title}</h4>
                          <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${getDifficultyBadge(idea.difficulty)}`}>
                            {idea.difficulty}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{idea.description}</p>
                      </div>
                      <button className="text-slate-400 hover:text-white pt-1">
                        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>

                    {/* Expandable Details */}
                    {isOpen && (
                      <div className="px-5 pb-5 pt-2 border-t border-slate-800/60 bg-slate-950/40 space-y-4">
                        {/* Required Materials */}
                        <div>
                          <p className="text-xs font-semibold text-slate-300 mb-2">Required Tools & Materials:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {idea.materials.map((mat, mIdx) => (
                              <span key={mIdx} className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700/50">
                                {mat}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Step-by-Step Instructions */}
                        <div>
                          <p className="text-xs font-semibold text-slate-300 mb-2">Steps to Create:</p>
                          <ol className="space-y-2">
                            {idea.steps.map((step, sIdx) => (
                              <li key={sIdx} className="flex gap-3 text-xs text-slate-300">
                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold flex items-center justify-center text-[10px]">
                                  {sIdx + 1}
                                </span>
                                <span className="pt-0.5 leading-relaxed">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Recycling Advice */}
            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 flex items-start gap-3 text-emerald-200">
              <Recycle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm text-emerald-300 mb-1">Recycling & Disposal Advice</h4>
                <p className="text-xs leading-relaxed text-emerald-200/80">{analysisResult.recyclingAdvice}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}