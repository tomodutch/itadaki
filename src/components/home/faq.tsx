export default function FAQ() {
    return (
              <section className="bg-slate-100 px-6 py-20 text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">FAQ</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h3 className="font-semibold text-lg">❓ Do I need an account?</h3>
            <p className="text-gray-600">Nope. You can try the app as a guest with no commitment.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">📱 Does it work on any device?</h3>
            <p className="text-gray-600">Yes. itadaki is a PWA that runs great on mobile and desktop.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">📶 Can I use it offline?</h3>
            <p className="text-gray-600">Yes. Your data is available offline thanks to smart caching.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">👀 Where do you get food data?</h3>
            <p className="text-gray-600">We use OpenFoodFacts, a global, open food database.</p>
          </div>
        </div>
      </section>
    );
}