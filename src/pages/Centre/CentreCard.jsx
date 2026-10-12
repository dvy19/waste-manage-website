
const CentreCard = ({ centre }) => {
  return (
    <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {centre.name}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Owned by {centre.ownerName}
        </p>
      </div>

      <div className="space-y-3 border-t border-gray-100 pt-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Address
          </p>
          <p className="mt-1 text-sm text-gray-700">
            {centre.address}
          </p>
        </div>

        <div className="flex gap-8">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Material
            </p>
            <p className="mt-1 text-sm text-gray-700">
              {centre.material}
            </p>
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Category
            </p>
            <p className="mt-1 text-sm text-gray-700">
              {centre.category}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CentreCard;
