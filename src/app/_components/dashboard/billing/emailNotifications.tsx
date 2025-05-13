export default function ReceiveEmailNotifications() {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-4">
        <h2 className="text-lg font-medium">Receive Email Notifications</h2>
        <p className="text-sm text-gray-500">
          Manage email preferences for your account
        </p>
      </div>

      <div className="p-4">
        <p className="mb-4 text-sm">
          Get email notifications when important events occur related to your
          account or when your usage reaches certain thresholds.
        </p>

        <label className="mb-4 flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-black"
            defaultChecked
          />
          <span className="ml-2 text-sm">
            Billing and payment notifications
          </span>
        </label>

        <label className="mb-4 flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-black"
            defaultChecked
          />
          <span className="ml-2 text-sm">Usage threshold alerts</span>
        </label>

        <label className="mb-4 flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-black"
            defaultChecked
          />
          <span className="ml-2 text-sm">Security notifications</span>
        </label>

        <button className="inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
          Save
        </button>
      </div>
    </div>
  );
}
