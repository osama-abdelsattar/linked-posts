// Icons
import { FaBolt, FaShieldHalved, FaUsers } from "react-icons/fa6";
// Components
import ThemeSwitch from "../themeSwitch/ThemeSwitch";

export default function LoginHero() {
  return (
    <div className="bg-sky-100 dark:bg-slate-800 text-slate-700 dark:text-sky-50 transition-all min-h-screen p-8 flex flex-col">
      <header className="mb-6 flex items-center justify-between border-b-2 border-slate-300 dark:border-slate-600 transition-colors pb-6">
        <h1 className="font-[DM_Serif_Text] font-bold text-4xl bg-linear-to-l from-sky-600/80 dark:from-sky-500/80 to-sky-600/90 transition-colors text-transparent bg-clip-text grow">
          Linked Posts
        </h1>
        <ThemeSwitch />
      </header>
      <main className="grow flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-6xl font-medium dark:text-sky-100/90 flex flex-col font-[bowlby_one_sc]">
            <span>
              Own Your <br />
              <span className="text-rose-500 dark:text-rose-600 transition-colors">
                Audience
              </span>
              .
            </span>
            <span>
              Shape Your <br />
              <span className="text-cyan-600 dark:text-cyan-600/80 transition-colors">
                Story
              </span>
              .
            </span>
          </h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 transition-colors font-medium">
            Linked Posts gives developers a single place to grow, connect, and
            share creativity, without the noise of traditional platforms.
          </p>
        </div>
        <p className="text-lg">
          It's{" "}
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-sky-500/70 rounded-lg me-0.5">
            <FaBolt className="text-[13px]" /> Fast
          </span>
          ,{" "}
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-teal-500/70 rounded-lg me-0.5">
            <FaUsers className="text-[14px]" /> Reliable
          </span>
          , and{" "}
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-violet-500/50 rounded-lg me-0.5">
            <FaShieldHalved className="text-[14px]" /> Private
          </span>
          .
        </p>
      </main>
    </div>
  );
}
