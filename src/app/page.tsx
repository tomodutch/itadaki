import * as HomeComponents from "@/components/home/index";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-100 flex flex-col">
      <HomeComponents.Hero />
      <HomeComponents.HowItWorks />
      <HomeComponents.Demo />
      <HomeComponents.Benefits />
      <HomeComponents.FAQ />
      <footer className="text-center text-sm text-gray-500 py-10">
        &copy; {new Date().getFullYear()} itadaki. All rights reserved.
      </footer>
    </main>
  );
}
