'use client';

export default function HowItWorks() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">How It Works</h1>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">1. Create an Account</h2>
          <p className="text-gray-600">
            Sign up for a free account to start trading. Verify your identity to unlock all features.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">2. Browse Trades</h2>
          <p className="text-gray-600">
            Find the best offers from verified traders. Filter by payment method, currency, and more.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">3. Start Trading</h2>
          <p className="text-gray-600">
            Choose an offer and start trading. Your funds are protected by our escrow service.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">4. Make Payment</h2>
          <p className="text-gray-600">
            Send payment using the agreed method. Mark the payment as completed once done.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">5. Receive Crypto</h2>
          <p className="text-gray-600">
            Once payment is confirmed, the crypto will be released from escrow to your wallet.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">6. Leave Feedback</h2>
          <p className="text-gray-600">
            Rate your trading partner and help build a trusted community.
          </p>
        </div>
      </div>

      <div className="mt-12 p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Safety Tips</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Only trade with verified users</li>
          <li>Always use our escrow service</li>
          <li>Never share sensitive information</li>
          <li>Keep communication within the platform</li>
          <li>Contact support if you need help</li>
        </ul>
      </div>
    </main>
  );
}
