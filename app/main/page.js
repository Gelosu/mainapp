"use client";
import FCA from "@/components/Archive/FacultyClassArch";
import SCA from "@/components/Archive/StudClassArch";
import TESTS from "@/components/Testpaper/answerkey";
import AnswerSheet from "@/components/Testpaper/answersheet";
import TestPaper from "@/components/Testpaper/testpaper";
import Link from "next/link";
export default function Main() {
  return (
    <main>
      <aside className="container-fluid">
        <div className="row ">
          <div className="custom-con col-1 col-md-2 px-sm-2 px-0 bg-danger">
            <div className="d-flex flex-column align-items-center justify-content-between pt-2 text-white min-vh-100">
              <div className="custom-hov d-md-flex flex-column text-center">
                <div className="Circle2 align-self-center"></div>
                <p className="my-2">&#123;TUPC-**-****&#125;</p>
                <p className="my-2">&#123;NAME&#125;</p>
                <small>&#123;COURSE, YEAR, SECTION&#125;</small>
              </div>
              <div className="custom-hov d-md-flex flex-column align-self-start px-2">
                <p className="my-2">SETTINGS</p>
                <p className="my-2">REPORT PROBLEM</p>
                <Link href="/login" className="text-decoration-none link-light"><p className="fw-100 my-2">LOGOUT</p></Link>
              </div>
            </div>
          </div>
          <div className="custom-m col-11 col-md-10 p-0">
            <TESTS/>
          </div>
        </div>
      </aside>
    </main>
  );
}
