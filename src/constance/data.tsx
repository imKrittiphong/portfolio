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
import Github from "@/assets/img/GitHub_Invertocat_White.svg";
import Linkedin from "@/assets/img/linkedin-icon-2-logo-svgrepo-com.svg";
import tanstack from "@/assets/img/logo-color-600.png";
import prisma from "@/assets/img/light-prisma-svgrepo-com.svg";
import pSql from "@/assets/img/PostgresSQL.svg";

//Device Repair report
import AdminDash from "@/assets/img/Projectimg/DeviceRepairReport/admindash.png";
import HomeUser from "@/assets/img/Projectimg/DeviceRepairReport/homeUser.png";
import Register from "@/assets/img/Projectimg/DeviceRepairReport/register.png";
import Report from "@/assets/img/Projectimg/DeviceRepairReport/report.png";

//kahterm Project
import loginPage from "@/assets/img/Projectimg/kahterm/login.png";
import dashBoardPage from "@/assets/img/Projectimg/kahterm/dashboard.png";
import reportPage from "@/assets/img/Projectimg/kahterm/report.png";
import promotePage from "@/assets/img/Projectimg/kahterm/promote.png";
import tuitionPage from "@/assets/img/Projectimg/kahterm/promote.png";

//pokedex
import page1 from "@/assets/img/Projectimg/pokedex/page1.png"
import page2 from "@/assets/img/Projectimg/pokedex/page2.png"

export const Language = [
  { img: TSLogo, lang: "TypeScript", exrt: "Intermediate" },
  { img: JavaScript, lang: "JavaScript", exrt: "Basic" },
  { img: PHP, lang: "PHP", exrt: "Basic" },
];

export const Tool = [
  { img: React, tools: "React", exrt: "Intermediate" },
  { img: React, tools: "React-Native", exrt: "Basic" },
  { img: Laravel, tools: "Laravel", exrt: "Basic" },
  { img: Postman, tools: "Post Man", exrt: "Basic" },
  { img: Git, tools: "Git", exrt: "Basic" },
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
    tech: [PHP, Laravel, TailwindCSS],
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
    tech: [TSLogo, tanstack, prisma, pSql],
    img: [loginPage, dashBoardPage, tuitionPage, promotePage, reportPage],
    projectName: "Kahterm",
    projectDis:
      "Web app for managing tuition fees, students, payments, and teacher info.",
    learned:
      "Built full-stack with TanStack Start, used Prisma + PostgreSQL for database management, Role Management for user.",
  },
  {
    id: 3,
    gitLink: "https://github.com/imKrittiphong/the-challenger.git",
    tech: [TSLogo, tanstack, prisma, pSql],
    img: [AdminDash, HomeUser, Register, Report],
    projectName: "The Challenger",
    projectDis:
      "A web app for creating and tracking personal or shared challenges.",
    learned:
      "Built full-stack with TanStack Start, Prisma + PostgreSQL. Learned how to structure a full-stack app from scratch.",
  },
  {
    id: 4,
    gitLink: "https://github.com/imKrittiphong/kahterm.git",
    tech: [TSLogo, React],
    img: [page1, page2],
    projectName: "PokéDex",
    projectDis: "A web app for searching and exploring Pokémon data.",
    learned: "Learned how to fetch and display data from a public API.",
  },
];
