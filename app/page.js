"use client";
import About from "@/components/Home/about";
import Contact from "@/components/Home/contact";
import Hero from "@/components/Home/hero";
import INSTRUCTION from "@/components/Home/instruction";
import Video from "@/components/Home/video";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <nav className="navbar position-sticky top-0 w-100 navbar-lg py-4 px-3 bg-danger text-dark">
        <Link href="/main">
          <div className="Circle"></div>
        </Link>
        <div className="d-flex flex-column">
          <a className="text-decoration-none" href="/login">Login</a>
          <a>Register Now</a>
        </div>
      </nav>
      <Hero/>
      <About/>
      <INSTRUCTION/>
      <Video/>
      <Contact/>
      <footer className="container-fluid bg-danger text-dark text-lg-start ">
        <Link href="/login" className="text-dark text-decoration-none">
          <small className="text-lg-start p-2">© 2023 ENDINGSONLY</small>
        </Link>
      </footer>
    </main>
  );
}
