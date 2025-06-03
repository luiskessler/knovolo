import React from "react";

export default function DashboardShowcaseSectionComponent() {
  return (
    <div className="relative h-fit w-screen pt-[10vh]">
      <div className="absolute bottom-0 left-0 z-[99999999] mx-auto h-[25vh] w-screen bg-gradient-to-t from-[#000] from-[50%] to-transparent to-[80%]"></div>
      <div className="absolute bottom-0 z-[999999999] h-[1px] w-screen bg-gradient-to-r from-black via-white/30 via-[15%] to-transparent to-[80%]"></div>

      <div className="hide-scrollbar relative mx-auto flex h-[85vh] w-[70%] max-w-7xl flex-col border-white">
        <div
          className="absolute top-0 -left-[5vw] h-[80vh] w-screen -rotate-3 overflow-hidden rounded-lg"
          style={{ boxShadow: "-30px -30px 150px 3px rgba(225,225,225,0.1)" }}
        >
          <div className="absolute top-0 h-px w-full bg-gradient-to-r from-transparent from-[50%] to-white/30 to-[90%]"></div>
          <div className="absolute right-2 -bottom-[5vh] z-[999999] mx-auto h-[25vh] w-screen bg-gradient-to-b from-transparent to-[#000] to-[60%]"></div>
        </div>
      </div>
    </div>
  );
}
