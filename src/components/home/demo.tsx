export default function Demo() {
    return (
        <section className="bg-white px-6 py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                See it in action
            </h2>
            <div className="max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden shadow-lg">
                <iframe
                    src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                    title="itadaki demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                ></iframe>
            </div>
        </section>
    )
}