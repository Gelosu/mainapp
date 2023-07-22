"use client";
import ChangePass from "@/components/Password/Changepass";
import FORGOTPASS from "@/components/Password/FORGOTPASS";
import LOGIN from "@/components/Login/Login";
import PositionOPT from "@/components/Register/PositionOpt";
import FacultyReg from "@/components/Register/FacultyReg";
import STUDReg from "@/components/Register/StudentReg";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [fpass, setFpass] = useState(false);
  const [newuser, setNewuser] = useState(false);
  const [facultyreg, setFacultyreg] = useState(false);
  const [studreg, setStudreg] = useState(false);
  const [cpass, setCpass] = useState(false);


  const clickfr = () => {
    setFacultyreg(!facultyreg);
  };
  const clicksr = () => {
    setStudreg(!studreg);
  };
  const clicknu = () => {
    setNewuser(!newuser);
  };
  const clickfp = () => {
      setFpass(!fpass);
  };
  const clickcp = () => {
      setCpass(!cpass);
  };
  return (
    <main>
      <nav className="navbar position-fixed w-100 navbar-lg py-4 px-3 bg-danger text-dark">
        <Link href="/main">
          <div className="Circle"></div>
        </Link>
      </nav>
      <div>
        {fpass ? ( //if
          cpass ? ( //if
            <ChangePass click={clickcp} />
          ) : (
            //else
            <FORGOTPASS click={clickcp} />
          )
        ) : newuser ? ( //if else
          facultyreg ? ( //if
            <FacultyReg />
          ) : studreg ? ( //if else
            <STUDReg />
          ) : (
            //else
            <PositionOPT clickfr={clickfr} clicksr={clicksr} />
          )
        ) : (
          //else
          <LOGIN click={clickfp} clicknu={clicknu} />
        )}
      </div>
      <footer className="container-fluid position-fixed bottom-0 bg-danger text-dark text-lg-start ">
        <small className="text-lg-start p-2">© 2023 ENDINGSONLY</small>
      </footer>
    </main>
  );
}
