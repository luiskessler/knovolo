import { motion } from "framer-motion";
import { Plus, Send } from "lucide-react";

export default function ForumComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: 20, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      className="flex h-full w-full gap-4 py-2"
    >
      <div className="flex w-[40%] flex-col gap-4 p-6">
        <h3 className="text-xl">
          Centralized Knowledge-Management with endless expansion
        </h3>
        <p className="text-[#acacac]">
          Knovolo&apos;s Knowledge-Base is self expanding. Didn't find a fitting
          path? Ask a question in the dedicated forum - mark messages as helpful
          so other&apos;s won&apos;t have to ask the same question.
        </p>
      </div>
      <div className="relative flex w-[60%] flex-col justify-between gap-2 overflow-hidden rounded-l-xl border-y border-l border-[#acacac]/10 p-2">
        <div className="line-clamp-1 flex h-10 min-h-10 w-full items-center justify-between gap-4 rounded-l-xl border-y border-l border-[#acacac]/10 bg-[#acacac]/10 pr-10 pl-3 text-sm text-white">
          <span>How do I create a new client in the CRM?</span>
          <span className="text-sm text-[#acacac]/60">by Oliver</span>
        </div>
        <div className="grid h-fit max-h-[80%] w-full grid-cols-2 gap-2 overflow-hidden">
          <div className="col-span-1 grid grid-rows-7 gap-4">
            <div className="relative row-span-2 row-start-1 flex h-full w-full flex-col gap-1 opacity-50">
              <p className="text-sm">Knovolo-Chat:</p>
              <div className="rounded-md border border-[#acacac]/30 p-2 text-sm text-[#acacac]">
                Found one entry relevant to the question:{" "}
                <span className="text-white underline">CRM-Guide.pdf</span>
              </div>
              <div className="absolute -right-14 bottom-0 text-xs text-[#acacac]/50">
                3:36 PM
              </div>
            </div>
            <div className="relative row-span-2 row-start-6 h-fit pt-4">
              <p className="text-sm">Oliver:</p>
              <div className="rounded-md border border-[#acacac]/30 p-2 text-sm text-[#acacac]">
                Thanks - the path really helped.
              </div>
              <div className="absolute -right-14 bottom-0 text-xs text-[#acacac]/50">
                3:42 PM
              </div>
            </div>
          </div>
          <div className="col-span-1 grid grid-rows-4">
            <div className="row-span-3 row-start-2 flex h-full w-full flex-col gap-1 pt-4">
              <div className="row-span-1 row-start-2 flex h-fit w-full flex-col gap-1 text-sm opacity-50">
                <p>You:</p>
                <p className="relative rounded-md border border-[#acacac]/30 p-2 text-sm text-[#acacac]">
                  <span className="absolute bottom-0 -left-14 text-xs text-[#acacac]/50">
                    3:37 PM
                  </span>
                  Just looked over it - seems to be a bit outdated. I&apos;ll
                  create a path.
                </p>
              </div>
              <div className="relative row-span-1 row-start-3 h-fit w-full rounded-md border border-[#acacac]/30 p-2 text-[#acacac]">
                <div className="absolute bottom-0 -left-14 text-xs text-[#acacac]/50">
                  3:41 PM
                </div>
                <p className="text-sm">
                  Just created the{" "}
                  <span className="text-white underline">path</span>. Check it
                  out - Should have everything relevant.
                </p>
                <div className="absolute -bottom-6 left-0 flex h-6 w-full items-center justify-center rounded-b-md bg-[#acacac]/10 text-xs">
                  Oliver marked this message as helpful.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-10 items-center">
          <div className="flex size-10 items-center justify-center">
            <Plus size={18} />
          </div>
          <div className="flex h-full w-full items-center rounded-md border border-[#acacac]/30 px-3 text-sm text-[#acacac]">
            Send a message...
          </div>
          <div className="flex size-10 items-center justify-center">
            <Send size={18} />
          </div>
        </div>
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-l from-[#0D0D0D] from-3% to-transparent to-[8%]"></div>
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-tr from-[#0D0D0D] to-transparent to-[60%]"></div>
      </div>
    </motion.div>
  );
}

//timestamps for messages --> sugegsting fast path creation + toast bottom right and thumb up
