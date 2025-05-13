import { ArrowRightCircle, Clock, HeartPulse } from "lucide-react";
import Link from "next/link";
import { HydrateClient } from "~/trpc/server";

const efficiencyText = [
  {
    title: "See more in less time",
    icon: <HeartPulse size={48} />,
    description:
      "Our fully customizable platform puts you in control. See the data you want to see, how you want to see it. Get instant access to live market data — from anywhere in the world.",
  },
  {
    title: "Simplify your everyday",
    icon: <ArrowRightCircle size={48} />,
    description:
      "Our fully customizable platform puts you in control. See the data you want to see, how you want to see it. Get instant access to live market data — from anywhere in the world.",
  },
  {
    title: "Designed to be different",
    icon: <Clock size={48} />,
    description:
      "Our fully customizable platform puts you in control. See the data you want to see, how you want to see it. Get instant access to live market data — from anywhere in the world.",
  },
];

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen w-full flex-col items-center">
        <div className="flex flex-col items-center gap-y-[10vh] pt-[10vh]">
          <div className="flex h-[70vh] flex-col gap-12 border">
            <div className="flex flex-col gap-6">
              <h1 className="w-[60%] text-5xl tracking-tight sm:text-[4.25rem]">
                Make Onboarding as simple as 1,2,3
              </h1>
              <p className="w-[60%]">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Reprehenderit enim dolorem exercitationem fugit, inventore
                corporis saepe nemo. Ratione, dicta, quaerat iusto totam nisi
                amet, consectetur.
              </p>
            </div>
            <button className="h-12 w-fit rounded-md bg-black px-4 text-white">
              <Link href={"/product"}>Get Started</Link>
            </button>
          </div>
          <div className="aspect-video h-full w-[90%] rounded-lg bg-gray-300 shadow-2xl shadow-black"></div>
          <div className="container flex h-[90vh] w-full flex-col items-center justify-center gap-y-[10vh]">
            <h1 className="text-center text-[3rem] tracking-tight">
              Build for efficiency
            </h1>
            <div className="grid h-fit w-full grid-cols-3 gap-4">
              {efficiencyText.map((text, index) => (
                <div
                  key={text.title + index}
                  className="col-span-1 flex flex-col gap-8"
                >
                  <div className="flex aspect-square w-full flex-col gap-4">
                    <div>{text.icon}</div>
                    <h2 className="w-fit text-2xl font-medium">{text.title}</h2>
                    <p className="w-fit">{text.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
