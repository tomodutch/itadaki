export default function Benefits() {
    return (
        <section className="bg-white px-6 py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Why choose itadaki?
            </h2>
            <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-3">
                <div>
                    <h3 className="text-xl font-semibold">🚀 Built for speed</h3>
                    <p className="text-gray-600 mt-2">Track meals in seconds with a clean, responsive interface.</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold">🌍 Use it anywhere</h3>
                    <p className="text-gray-600 mt-2">Offline-ready and mobile-optimized. No signal? No problem.</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold">🌾 Stay mindful</h3>
                    <p className="text-gray-600 mt-2">Visual feedback helps you build better eating habits over time.</p>
                </div>
            </div>
        </section>
    )
}