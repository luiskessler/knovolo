import React from "react";
import LogoComponent from "../common/logo";
import Link from "next/link";
import {
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaDiscord,
  FaLinkedin,
} from "react-icons/fa";

export default function FooterSectionComponent() {
  return (
    <div className="h-fit w-full bg-black py-[10vh]">
      <div className="mx-auto flex h-fit w-[70%] max-w-7xl flex-col space-y-10 text-white">
        <div className="grid h-full grid-cols-4">
          <div className="col-span-1 flex h-full flex-col gap-4">
            <div className="flex items-center gap-12">
              <Link
                href={"/"}
                className="flex items-center justify-center gap-4"
              >
                <LogoComponent className="aspect-square h-7" />
                <p className="text-xl font-medium">Knovolo</p>
              </Link>
            </div>
            <div className="flex gap-2 text-[#acacac]">
              <Link
                href={"https://www.instagram.com/knovolo/"}
                className="flex items-center gap-2"
              >
                <FaInstagram size={20} />
              </Link>
              <Link
                href={"https://www.youtube.com/channel/UC0-0n-7-9-5-2-3-4"}
                className="flex items-center gap-2"
              >
                <FaYoutube size={20} />
              </Link>
              <Link
                href={"https://discord.gg/knovolo"}
                className="flex items-center gap-2"
              >
                <FaDiscord size={20} />
              </Link>
              <Link
                href={"https://www.linkedin.com/company/knovolo"}
                className="flex items-center gap-2"
              >
                <FaLinkedin size={20} />
              </Link>
            </div>
          </div>
          <div className="col-span-1 flex h-full flex-col gap-4">
            <p className="text-lg">Ressources</p>
            <ul className="text-[#acacac]">
              <li>Support</li>
              <li>Brand Assets / Logos</li>
              <li>Become a Partner</li>
            </ul>
          </div>{" "}
          <div className="col-span-1 flex h-full flex-col gap-4">
            <p className="text-lg">Company</p>
            <ul className="text-[#acacac]">
              <li>Blog</li>
              <li>Company</li>
              <li>Careers</li>
              <li>Events</li>
              <li>Newsletter</li>
              <li>Transparency</li>
            </ul>
          </div>{" "}
          <div className="col-span-1 flex h-full flex-col gap-4">
            <p className="text-lg">Legal</p>
            <ul className="text-[#acacac]">
              <li>Imprint</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Trademark Policy</li>
              <li>Terms of Use</li>
              <li>DPA</li>
              <li>Security & Compliance</li>
            </ul>
          </div>
        </div>
        <div className="flex h-12 items-center text-[#acacac]">
          &copy; {new Date().getFullYear()} Knovolo
        </div>
      </div>
    </div>
  );
}
