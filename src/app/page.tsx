import * as HomeComponents from "@/components/home/index";
import {auth} from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-100 flex flex-col">
      <HomeComponents.Hero isLoggedIn={isLoggedIn} />
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

export const metadata = {
  title: {
    template: "%s | itadaki",
    default: "itadaki | Nutrition Tracking Made Easy",
  },
  description: "Track your meals effortlessly with itadaki. Get insights into your nutrition and make healthier choices.",
}