'use client'

import { cn } from "@/lib/utils";
import { loglib } from "@loglib/tracker";
import Link from "next/link";

const CodeInstallation = () => {
  return (
    <div className="mx-auto">
      <h2 className="text-right font-heading max-w-3xl text-3xl font-bold sm:text-6xl">
        Get Started <br />{" "}
        <span className="from-logo bg-gradient-to-br to-orange-600 bg-clip-text font-black lowercase text-transparent">
          With <br />
        </span>
        <span className="from-logo bg-gradient-to-br to-orange-600 bg-clip-text font-black lowercase text-transparent">
          Hands Down{" "}
        </span>
        <br /> Docs.
      </h2>

      <br />
      <div className="text-right  ">
        <Link
          className={cn(
            "  text-white cursor-pointer font-bold transition-all duration-[0.3s] ease-[ease] relative inline-block shadow-[inset_2px_2px_2px_0px_rgba(255,255,255,0.1),7px_7px_20px_0px_rgba(26, 35, 126, 0.3),4px_4px_5px_0px_rgba(0,0,0,0.1)] px-4 md:px-[25px] py-2.5 rounded-[5px] bg-transparent",
            "dark:text-white text-stone-900 border-[none] after:absolute after:content-[''] after:w-0 after:h-full after:z-[-1] after:shadow-[-7px_-7px_20px_0px_#1a237e,-4px_-4px_5px_0px_#000,7px_7px_20px_0px_#0002,4px_4px_5px_0px_#0001] after:transition-all after:duration-[0.3s] after:ease-[ease] after:left-0 after:top-0 hover:text-black hover:after:w-full border-stone-100 dark:border-stone-700 hover:dark:text-white hover:after:left-auto hover:after:right-0 active:top-0.2 border w-max"
          )}
          href="/docs"
          onClick={() => loglib.track("get started", { from: "hero section" })}
        >
          Get Started
        </Link>
        {/* <a
        href={`https://loglib.io/login`}
        className="z-20  border-4 bg-white rounded-2xl from-purple-500 bg-gradient-to-br to-orange-800   p-[1px] outline-none bg-white px-5 py-2 text-sm text-black shadow-lg transition-all hover:bg-white hover:text-black"
      >
        Try Loglib For Free
      </a> */}
      </div>
    </div>
  );
};
export default CodeInstallation;
