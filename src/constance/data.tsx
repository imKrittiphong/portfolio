//Icon
import TSLogo from "@/assets/img/TSLogo.svg";
import JavaScript from "@/assets/img/JavaScript.svg";
import Laravel from "@/assets/img/Laravel.svg";
import PHP from "@/assets/img/PHP.svg";
import Postman from "@/assets/img/Postman.svg";
import React from "@/assets/img/React.svg";
import TailwindCSS from "@/assets/img/Tailwind CSS.svg";
import Git from "@/assets/img/Git.svg";
import Figma from "@/assets/img/Figma.svg";
import Github from "@/assets/img/github-svgrepo-com.svg";
import Linkedin from "@/assets/img/linkedin-icon-2-logo-svgrepo-com.svg";
import tanstack from "@/assets/img/logo-color-600.png";
import prisma from "@/assets/img/light-prisma-svgrepo-com.svg";
import pSql from "@/assets/img/PostgresSQL.svg";
import NextJs from  "@/assets/img/Next.js.svg"
import NextJSw from "@/assets/img/nextjs-white.svg"
import NestJs from  "@/assets/img/Nest.js.svg"

//Device Repair report
import AdminDash from "@/assets/img/Projectimg/DeviceRepairReport/admindash.png";
import HomeUser from "@/assets/img/Projectimg/DeviceRepairReport/homeUser.png";
import Register from "@/assets/img/Projectimg/DeviceRepairReport/register.png";
import Report from "@/assets/img/Projectimg/DeviceRepairReport/report.png";

//pokedex
import page1 from "@/assets/img/Projectimg/pokedex/page1.png"
import page2 from "@/assets/img/Projectimg/pokedex/page2.png"

export const DarkImg: Record<string, string> = { [NextJs]: NextJSw };

export const Language = [
  { img: TSLogo, lang: "TypeScript", exrt: "Intermediate" },
  { img: JavaScript, lang: "JavaScript", exrt: "Basic" },
  { img: PHP, lang: "PHP", exrt: "Basic" },
];

export const Tool = [
  { img: React, tools: "React", exrt: "Intermediate" },
  // { img: React, tools: "React-Native", exrt: "Basic" },
  { img: NextJs, tools: "Next.Js", exrt: "Basic" },
  { img: NestJs, tools: "Nest.Js", exrt: "Basic" },
  { img: Laravel, tools: "Laravel", exrt: "Basic" },
  { img: Postman, tools: "Post Man", exrt: "Basic" },
  { img: Git, tools: "Git", exrt: "Basic" },
  { img: Github, tools: "Github", exrt: "Basic" },
  { img: TailwindCSS, tools: "TailwindCSS", exrt: "Intermediate" },
  { img: Figma, tools: "Figma", exrt: "intermediate" },
  { img: tanstack, tools: "Tanstack Start", exrt: "Basic" },
  { img: prisma, tools: "Prisma", exrt: "Basic" },
  { img: pSql, tools: "PostgresSQL", exrt: "Basic" },
];

export const ContactData = [
  {
    img: Github,
    cont: "GitHup",
    nameAct: "imKrittiphong",
    url: "https://github.com/imKrittiphong",
  },
  {
    img: Linkedin,
    cont: "Linkedin",
    nameAct: "Krittiphong Butsaba",
    url: "https://linkedin.com/in/krittiphong-butsaba-145b97384",
  },
];

export const ProjectData = [
  {
    id: 1,
    gitLink: "https://github.com/imKrittiphong/device-repair-report-app.git",
    tech: [PHP, Laravel],
    img: [AdminDash, HomeUser, Register, Report],
    projectName: "Repair Device Report",
    projectDis:
      "A system for reporting and tracking broken devices in the university, so they get fixed faster.",
    learned:
      "Built with Laravel + PHP, styled with Tailwind. Learned MVC structure and basic CRUD with a real use case.",
  },
  {
    id: 2,
    gitLink: "https://github.com/imKrittiphong/kahterm.git",
    tech: [TSLogo,React],
    img: [page1, page2],
    projectName: "PokéDex",
    projectDis: "A web app for searching and exploring Pokémon data.",
    learned: "Learned how to fetch and display data from a public API.",
  },
  {
    id: 3,
    gitLink: "https://github.com/imKrittiphong/kahterm.git",
    tech: [TSLogo, NextJs, prisma],
    img: [page1, page2],
    projectName: "myWeight",
    projectDis: "Wep app for track Process of Caloris, Workout Program",
    learned: "Create a web app with 3d landingpage And Fullstuck App",
  },
];
