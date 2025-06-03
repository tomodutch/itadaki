import Image from "next/image";

const features = [
    {
        title: "📋 Daily Log",
        description:
            "Quickly log your meals using search, scanning, or your saved foods. Stay mindful of what you eat without slowing down your day.",
        image: "https://placecats.com/millie/720/480",
    },
    {
        title: "🎯 Goals & Insights",
        description:
            "Set daily targets for calories, protein, carbs, and fat. Track progress over time with simple, visual summaries.",
        image: "https://placecats.com/millie/720/480",
    },
    {
        title: "🍳 Create Custom Recipes",
        description:
            "Save your favorite meals, homemade dishes, or ingredient combos with full nutritional info that fits your lifestyle.",
        image: "https://placecats.com/millie/720/480",
    },
];

export default function HowItWorks() {
    return (
        <section className="bg-slate-50 px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                How it works
            </h2>
            <div className="max-w-6xl mx-auto grid gap-16 md:grid-cols-3">
                {features.map((feature, i) => (
                    <div key={i} className="flex flex-col items-center text-center">
                        <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden shadow-lg">
                            <Image
                                src={feature.image}
                                alt={feature.title}
                                fill
                                priority
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYa"
                                placeholder="blur"
                                className="object-cover object-top"
                            />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-600 text-base">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}