"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { cn } from "~/lib/utils";
import LogoComponent from "../common/logo";

export default function KnowledgebaseSectionComponent() {
  return (
    <div className="h-fit w-screen">
      <div className="relative mx-auto h-fit w-[70%] max-w-7xl py-[10vh]">
        <div className="grid w-full grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: -20, x: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="col-span-1 flex flex-col justify-end py-4"
          >
            <h2 className="text-5xl font-medium text-balance text-white">
              <span className="text-[#acacac]">Organize your Knowledge</span> in
              one central Hub
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20, x: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="col-span-1 flex flex-col justify-end p-4"
          >
            <p className="text-[#acacac]">
              Knovolo's Knowledge Base is your all-in-one hub for storing and
              accessing company knowledge. But it doesn&apos;t stop there —
              Knovolo grows with you. Can&apos;t find an answer? Knovolo opens
              the conversation with a built-in forum{" "}
              <Link
                href={"/"}
                className="inline-flex items-center gap-2 text-white underline underline-offset-2"
              >
                Explore More <ChevronRight size={18} />
              </Link>
            </p>
          </motion.div>
        </div>
        <div className="group relative mt-[10vh] h-fit overflow-hidden">
          <div className="absolute top-0 right-0 bottom-0 left-5 z-[99999999] mx-auto my-auto line-clamp-1 flex h-1/2 w-1/3 items-center justify-center gap-4 rounded-md border border-[#272727] bg-[#171717]/30 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] backdrop-blur-xs transition-all duration-700">
            <LogoComponent className="aspect-square h-[50%] text-[#fff] opacity-100 drop-shadow-[0_0_3px_#fff]/30 transition-all duration-300" />
          </div>
          <div className="absolute top-0 right-0 left-0 z-[9999999] h-full w-full bg-gradient-to-r from-black via-transparent to-black" />
          <KnowledgeBase />
        </div>
        <div className="mt-[10vh] h-[60vh] border border-white"></div>
      </div>
    </div>
  );
}

export const KnowledgeBase = ({ className }: { className?: string }) => {
  return (
    <div className={cn(className)}>
      <svg
        width="1460"
        height="323"
        viewBox="0 0 1460 323"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full scale-125"
      >
        <path
          d="M10 311C155.5 311 201 314.265 279 295C336.5 278 349.5 269 407.5 214C449 179.5 465 177.5 500 171C519.664 167.348 531 151.736 548 152.236C563.591 152.236 572.429 162.739 594.66 170.749C602.042 173.408 610.2 174.237 617.356 171.019C634.755 163.195 651.446 144.324 667 144.735C683.408 144.735 703.545 167.572 722.903 174.769C728.727 176.934 735.184 176.395 740.902 173.965C761.726 165.115 774.085 145.106 792 144.735C804.831 144.47 814.103 156.859 832.469 166.515C845.13 173.171 860.214 174.815 872.827 168.069C885.952 161.049 899.748 150.706 913.5 151.736C932.677 153.171 945.293 158.562 955.817 163.673C964.234 167.76 973.095 170.792 982.199 172.954C1006.01 178.611 1017.42 182.118 1044 197C1087.5 221.359 1092.5 242.5 1150 277C1216 318 1338.5 310.5 1450 310.5"
          stroke="#F3F3F3"
          strokeWidth="2"
        />
        <path
          d="M10 235.5C157 235.5 287 235.5 320 221.5C358 211 402.5 191.5 418 183C444 171.5 436 174.235 489 163.235C504 160.729 533 158.435 544.5 160.735C564.5 164.735 565.5 171.235 586 171.735C602 171.735 626 144.735 643 145.235C658.671 145.235 671.31 163.052 694.774 172.942C702.004 175.989 710.2 176.738 717.349 173.505C734.886 165.575 751.932 146.33 767.5 146.742C783.864 146.742 801.711 168.623 820.403 175.654C826.218 177.841 832.661 177.246 838.451 174.991C859.246 166.893 871.599 150.112 889.5 149.742C896.47 149.597 906.865 154.047 917.429 158.911C940.879 169.707 967.139 167.639 992.951 168.063C1030.91 168.686 1047.5 178.797 1066.5 185C1112.24 204.627 1126.5 218.704 1190.5 227.235C1267.5 237.5 1289 235 1450 236"
          stroke="#F3F3F3"
          strokeWidth="2"
        />
        <path
          d="M10 162C157.5 162.333 304.5 161.735 390.5 161.735C415.976 162.94 432.849 163.228 446.37 163.123C487.503 162.803 528.631 154.605 569.508 159.197C574.04 159.706 579.162 160.524 585 161.735C598 164.433 626 169.702 637.5 167.402C657.5 163.402 669 147.235 690.5 147.235C710.5 147.235 735 177.235 752 176.735C767.654 176.735 778.77 158.583 801.793 148.59C808.991 145.465 817.16 144.777 824.423 147.745C842.335 155.064 860.418 172.648 876 172.235C892.791 172.235 912.316 157.786 931.814 153.392C936.856 152.255 942.097 152.674 947.176 153.631C976.993 159.248 980.679 162.346 999.5 162.735C1016.3 163.083 1046.5 161.235 1065.5 161.235C1124.5 161.235 1100.5 161.235 1134 161.235C1187.5 161.235 1188.99 162.402 1251 162.402C1327.5 162.402 1284.5 160.568 1450 161.235"
          stroke="#F3F3F3"
          strokeWidth="2"
        />
        <path
          d="M10 86.5C160.5 86.5 271 86.318 333.5 104.5C361 112.5 397.517 132.001 433.5 142.5C457.371 149.465 482 151.735 497 155.735C513.786 160.212 514.5 164.808 533 166.735C557 169.235 574.814 149.235 594.5 149.235C614.5 149.235 636 177.069 653 176.569C668.676 176.569 682.076 159.63 705.751 149.972C713.017 147.008 721.231 146.208 728.298 149.617C745.448 157.889 761.454 177.98 777 177.569C793.364 177.569 811.211 155.687 829.903 148.657C835.718 146.469 842.141 147.104 847.992 149.194C869.178 156.764 883.089 171.365 901 171.735C917.8 172.083 933 152.235 973 154.735C1044.5 154.735 1057.5 140.68 1081 129.5C1132.5 105 1152.23 100.871 1195 94.5C1265.5 84 1304 87 1449.5 87"
          stroke="#F3F3F3"
          strokeWidth="2"
        />
        <path
          d="M10.5 12C155.288 10.349 205 9.49999 275.5 26C332 39.223 409.182 105.5 421 115.5C434.176 126.649 466.916 139.677 506.259 150.699C508.746 151.396 511.16 152.304 513.511 153.374C527.104 159.558 551.149 168.911 561.5 169.236C581.5 169.236 600 146.736 621.5 146.736C641.5 146.736 662.5 177.236 679.5 176.736C695.171 176.736 707.81 158.924 731.274 149.036C738.505 145.988 746.716 145.231 753.812 148.579C771.362 156.857 788.421 177.148 804 176.736C820.375 176.736 839.35 156.68 858.364 150.179C864.243 148.169 870.624 148.802 876.535 150.718C896.961 157.338 908.141 167.866 926 168.236C942.8 168.583 944.5 158.236 977.5 149.736C1021.5 139 1017.5 141.5 1039.5 128C1079.5 101.5 1082 88.442 1138.5 51.5C1190.5 17.5 1285 8.37399 1449 12"
          stroke="#F3F3F3"
          strokeWidth="2"
        />
        <g filter="url(#filter0_f_1_26)">
          <path
            d="M10 311C155.5 311 201 314.265 279 295C336.5 278 349.5 269 407.5 214C449 179.5 465 177.5 500 171C519.664 167.348 531 151.736 548 152.236C563.591 152.236 572.429 162.739 594.66 170.749C602.042 173.408 610.2 174.237 617.356 171.019C634.755 163.195 651.446 144.324 667 144.735C683.408 144.735 703.545 167.572 722.903 174.769C728.727 176.934 735.184 176.395 740.902 173.965C761.726 165.115 774.085 145.106 792 144.735C804.831 144.47 814.103 156.859 832.469 166.515C845.13 173.171 860.214 174.815 872.827 168.069C885.952 161.049 899.748 150.706 913.5 151.736C932.677 153.171 945.293 158.562 955.817 163.673C964.234 167.76 973.095 170.792 982.199 172.954C1006.01 178.611 1017.42 182.118 1044 197C1087.5 221.359 1092.5 242.5 1150 277C1216 318 1338.5 310.5 1450 310.5"
            stroke="#F3F3F3"
            strokeWidth="2"
          />
        </g>
        <g filter="url(#filter1_f_1_26)">
          <path
            d="M10 235.5C157 235.5 287 235.5 320 221.5C358 211 402.5 191.5 418 183C444 171.5 436 174.235 489 163.235C504 160.729 533 158.435 544.5 160.735C564.5 164.735 565.5 171.235 586 171.735C602 171.735 626 144.735 643 145.235C658.671 145.235 671.31 163.052 694.774 172.942C702.004 175.989 710.2 176.738 717.349 173.505C734.886 165.575 751.932 146.33 767.5 146.742C783.864 146.742 801.711 168.623 820.403 175.654C826.218 177.841 832.661 177.246 838.451 174.991C859.246 166.893 871.599 150.112 889.5 149.742C896.47 149.597 906.865 154.047 917.429 158.911C940.879 169.707 967.139 167.639 992.951 168.063C1030.91 168.686 1047.5 178.797 1066.5 185C1112.24 204.627 1126.5 218.704 1190.5 227.235C1267.5 237.5 1289 235 1450 236"
            stroke="#F3F3F3"
            strokeWidth="2"
          />
        </g>
        <g filter="url(#filter2_f_1_26)">
          <path
            d="M10 162C157.5 162.333 304.5 161.735 390.5 161.735C415.976 162.94 432.849 163.228 446.37 163.123C487.503 162.803 528.631 154.605 569.508 159.197C574.04 159.706 579.162 160.524 585 161.735C598 164.433 626 169.702 637.5 167.402C657.5 163.402 669 147.235 690.5 147.235C710.5 147.235 735 177.235 752 176.735C767.654 176.735 778.77 158.583 801.793 148.59C808.991 145.465 817.16 144.777 824.423 147.745C842.335 155.064 860.418 172.648 876 172.235C892.791 172.235 912.316 157.786 931.814 153.392C936.856 152.255 942.097 152.674 947.176 153.631C976.993 159.248 980.679 162.346 999.5 162.735C1016.3 163.083 1046.5 161.235 1065.5 161.235C1124.5 161.235 1100.5 161.235 1134 161.235C1187.5 161.235 1188.99 162.402 1251 162.402C1327.5 162.402 1284.5 160.568 1450 161.235"
            stroke="#F3F3F3"
            strokeWidth="2"
          />
        </g>
        <g filter="url(#filter3_f_1_26)">
          <path
            d="M10 86.5C160.5 86.5 271 86.318 333.5 104.5C361 112.5 397.517 132.001 433.5 142.5C457.371 149.465 482 151.735 497 155.735C513.786 160.212 514.5 164.808 533 166.735C557 169.235 574.814 149.235 594.5 149.235C614.5 149.235 636 177.069 653 176.569C668.676 176.569 682.076 159.63 705.751 149.972C713.017 147.008 721.231 146.208 728.298 149.617C745.448 157.889 761.454 177.98 777 177.569C793.364 177.569 811.211 155.687 829.903 148.657C835.718 146.469 842.141 147.104 847.992 149.194C869.178 156.764 883.089 171.365 901 171.735C917.8 172.083 933 152.235 973 154.735C1044.5 154.735 1057.5 140.68 1081 129.5C1132.5 105 1152.23 100.871 1195 94.5C1265.5 84 1304 87 1449.5 87"
            stroke="#F3F3F3"
            strokeWidth="2"
          />
        </g>
        <g filter="url(#filter4_f_1_26)">
          <path
            d="M10.5 12C155.288 10.349 205 9.49999 275.5 26C332 39.223 409.182 105.5 421 115.5C434.176 126.649 466.916 139.677 506.259 150.699C508.746 151.396 511.16 152.304 513.511 153.374C527.104 159.558 551.149 168.911 561.5 169.236C581.5 169.236 600 146.736 621.5 146.736C641.5 146.736 662.5 177.236 679.5 176.736C695.171 176.736 707.81 158.924 731.274 149.036C738.505 145.988 746.716 145.231 753.812 148.579C771.362 156.857 788.421 177.148 804 176.736C820.375 176.736 839.35 156.68 858.364 150.179C864.243 148.169 870.624 148.802 876.535 150.718C896.961 157.338 908.141 167.866 926 168.236C942.8 168.583 944.5 158.236 977.5 149.736C1021.5 139 1017.5 141.5 1039.5 128C1079.5 101.5 1082 88.442 1138.5 51.5C1190.5 17.5 1285 8.37399 1449 12"
            stroke="#F3F3F3"
            strokeWidth="2"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_1_26"
            x="0"
            y="133.728"
            width="1460"
            height="188.481"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="5"
              result="effect1_foregroundBlur_1_26"
            />
          </filter>
          <filter
            id="filter1_f_1_26"
            x="0"
            y="134.228"
            width="1460.01"
            height="112.772"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="5"
              result="effect1_foregroundBlur_1_26"
            />
          </filter>
          <filter
            id="filter2_f_1_26"
            x="-0.00225762"
            y="134.847"
            width="1460.01"
            height="52.8945"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="5"
              result="effect1_foregroundBlur_1_26"
            />
          </filter>
          <filter
            id="filter3_f_1_26"
            x="0"
            y="75.4999"
            width="1459.5"
            height="113.075"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="5"
              result="effect1_foregroundBlur_1_26"
            />
          </filter>
          <filter
            id="filter4_f_1_26"
            x="0.488598"
            y="0.163391"
            width="1458.53"
            height="187.579"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="5"
              result="effect1_foregroundBlur_1_26"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
