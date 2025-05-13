export default function BillingAddress() {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-4">
        <h2 className="text-lg font-medium">Billing Address</h2>
        <p className="text-sm text-gray-500">Update your billing information</p>
      </div>

      <div className="p-4">
        <p className="mb-4 text-sm">
          This address will be used on your invoices, and to calculate any
          applicable taxes.
        </p>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Country / Region
              </label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm">
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Australia</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                State / Province
              </label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm">
                <option>California</option>
                <option>New York</option>
                <option>Texas</option>
                <option>Florida</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Street Address
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
              placeholder="123 Main St."
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                placeholder="San Francisco"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Postal Code
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                placeholder="94103"
              />
            </div>
          </div>

          <button className="inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
}
