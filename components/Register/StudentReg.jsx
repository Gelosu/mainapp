"use client"

import React, { useState } from 'react';
import axios from 'axios';

export default function STUDReg() {
  const [registerTUPCID, setRegisterTUPCID] = useState("");
  const [registerSURNAME, setRegisterSURNAME] = useState("");
  const [registerFIRSTNAME, setRegisterFIRSTNAME] = useState("");
  const [registerGSFEACC, setRegisterGSFEACC] = useState("");
  const [registerCOURSE, setRegisterCOURSE] = useState("");
  const [registerYEAR, setRegisterYEAR] = useState("");
  const [registerSTATUS, setRegisterSTATUS] = useState("");
  const [registerPASSWORD, setRegisterPASSWORD] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const register = () => {
    axios({
      method: "post",
      data: {
        TUPCID: registerTUPCID,
        SURNAME: registerSURNAME,
        FIRSTNAME: registerFIRSTNAME,
        GSFEACC: registerGSFEACC,
        COURSE: registerCOURSE,
        YEAR: registerYEAR,
        STATUS: registerSTATUS,
        PASSWORD: registerPASSWORD,
      },
      withCredentials: true,
      url: "http://localhost:3001/studreg",
    })
      .then((res) => {
        console.log(res);
        setErrorMessage("");
        
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 409) {
          setErrorMessage("TUPCID already exists. Student registration failed.");
        } else {
          setErrorMessage("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <main className="container-sm vh-100 d-flex justify-content-center align-items-center flex-column">
      <p className="mb-0 fw-bold fs-5 ">STUDENT REGISTRATION</p>
      <section className="container-sm col-lg-6 py-3 px-4 border border-dark rounded">
        <form className="row p-sm-2 px-3">
          <p className="col-sm-6 my-1 text-sm-start text-center">TUPC ID</p>
          <input
            type="text"
            className="col-sm-6 rounded border border-dark text-sm-start text-center"
            onChange={(e) => setRegisterTUPCID(e.target.value)}
          />
        </form>
        <form className="row p-sm-2 px-3">
          <p className="col-sm-6 my-1 text-sm-start text-center">SURNAME</p>
          <input
            type="text"
            className="col-sm-6 rounded border border-dark text-sm-start text-center"
            onChange={(e) => setRegisterSURNAME(e.target.value)}
          />
        </form>
        <form className="row p-sm-2 px-3">
          <p className="col-sm-6 my-1 text-sm-start text-center">FIRST NAME</p>
          <input
            type="text"
            className="col-sm-6 rounded border border-dark text-sm-start text-center"
            onChange={(e) => setRegisterFIRSTNAME(e.target.value)}
          />
        </form>
        <form className="row p-sm-2 px-3">
          <p className="col-sm-6 my-1 text-sm-start text-center">GSFE ACCOUNT</p>
          <input
            type="text"
            className="col-sm-6 rounded border border-dark text-sm-start text-center"
            onChange={(e) => setRegisterGSFEACC(e.target.value)}
          />
        </form>
        <form className="row p-sm-2 px-3">
          <p className="col-sm-6 my-1 text-sm-start text-center">COURSE</p>
          <select
            className="col-sm-6 rounded border border-dark text-sm-start text-center "
            value={registerCOURSE}
            onChange={(e) => setRegisterCOURSE(e.target.value)}
            id="inputGroupSelect2"
          >
            <option value="">Choose....</option>
            <option value="COET">COET</option>
            <option value="ESET">ESET</option>
            <option value="ETECH">ETECH</option>
            <option value="MT">MT</option>
          </select>
        </form>
        <form className="row p-sm-2 px-3">
          <p className="col-sm-6 my-1 text-sm-start text-center">YEAR</p>
          <select
            className="col-sm-6 rounded border border-dark text-sm-start text-center"
            value={registerYEAR}
            onChange={(e) => setRegisterYEAR(e.target.value)}
            id="inputGroupSelect3"
          >
            <option value="">Choose....</option>
            <option value="1ST">1ST</option>
            <option value="2ND">2ND</option>
            <option value="3RD">3RD</option>
            <option value="4TH">4TH</option>
          </select>
        </form>
        <form className="row p-sm-2 px-3">
          <p className="col-sm-6 my-1 text-sm-start text-center">STATUS</p>
          <select
            className="col-sm-6 rounded border border-dark text-sm-start text-center"
            value={registerSTATUS}
            onChange={(e) => setRegisterSTATUS(e.target.value)}
            id="inputGroupSelect1"
          >
            <option value="">Choose....</option>
            <option value="REGULAR">REGULAR</option>
            <option value="IRREGULAR">IRREGULAR</option>
          </select>
        </form>
        <form className="row p-sm-2 px-3">
          <p className="col-sm-6 my-1 text-sm-start text-center">PASSWORD</p>
          <input
            type="password"
            className="col-sm-6 rounded border border-dark text-sm-start text-center"
            onChange={(e) => setRegisterPASSWORD(e.target.value)}
          />
        </form>
        <div className="text-center py-2">
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <button
            className="text-center px-3 py-1 btn btn-outline-dark"
            onClick={register}
          >
            SUBMIT
          </button>
        </div>
      </section>
    </main>
  );
}
