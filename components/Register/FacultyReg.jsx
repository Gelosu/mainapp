'use client'

import React, { useState } from 'react';
import axios from 'axios';

export default function FACULTYReg({ click }) {
  const [registerTUPCID, setRegisterTUPCID] = useState("");
  const [registerSURNAME, setRegisterSURNAME] = useState("");
  const [registerFIRSTNAME, setRegisterFIRSTNAME] = useState("");
  const [registerGSFEACC, setRegisterGSFEACC] = useState("");
  const [registerSUBJECTDEPT, setRegisterSUBJECTDEPT] = useState("");
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
        SUBJECTDEPT: registerSUBJECTDEPT,
        PASSWORD: registerPASSWORD,
      },
      withCredentials: true,
      url: "http://localhost:3001/facultyreg",
    })
      .then((res) => {
        console.log(res.data);
        // Add success message or redirect to a success page if needed
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage("An error occurred while registering faculty.");
        }
      });
  };

  return (
    <main className="container-sm vh-100 d-flex justify-content-center align-items-center flex-column">
      <p className="mb-0 fw-bold fs-5">FACULTY REGISTRATION</p>
      <section className="container-sm col-lg-6 py-3 px-4 border border-dark rounded">
        <form className="row p-sm-2 px-3">
          <p className="col-sm-6 my-1 text-sm-start text-center">TUPC ID</p>
          <input
            type="text"
            className="col-sm-6 rounded border border-dark text-sm-start text-center"
            value={registerTUPCID}
            onChange={(e) => setRegisterTUPCID(e.target.value)}
          />
        </form>
        <form className="row p-sm-2 px-3">
          <p className="col-sm-6 my-1 text-sm-start text-center">SURNAME</p>
          <input
            type="text"
            className="col-sm-6 rounded border border-dark text-sm-start text-center"
            value={registerSURNAME}
            onChange={(e) => setRegisterSURNAME(e.target.value)}
          />
        </form>
        <form className="row p-sm-2 px-3">
          <p className="col-sm-6 my-1 text-sm-start text-center">FIRST NAME</p>
          <input
            type="text"
            className="col-sm-6 rounded border border-dark text-sm-start text-center"
            value={registerFIRSTNAME}
            onChange={(e) => setRegisterFIRSTNAME(e.target.value)}
          />
        </form>
        <form className="row p-sm-2 px-3">
          <p className="col-sm-6 my-1 text-sm-start text-center">GSFE ACCOUNT</p>
          <input
            type="text"
            className="col-sm-6 rounded border border-dark text-sm-start text-center"
            value={registerGSFEACC}
            onChange={(e) => setRegisterGSFEACC(e.target.value)}
          />
        </form>
        <form className="row p-sm-2 px-3">
          <p className="col-sm-6 my-1 text-sm-start text-center">SUBJECT DEPARTMENT</p>
          <select
            className="col-sm-6 rounded border border-dark text-sm-start text-center"
            id="inputGroupSelect4"
            value={registerSUBJECTDEPT}
            onChange={(e) => setRegisterSUBJECTDEPT(e.target.value)}
          >
            <option value="">Choose....</option>
            <option value="DIT">DIT</option>
            <option value="DIT?">DIT</option>
            <option value="EHH??">EHH?</option>
            <option value="EHH???">EHH???</option>
          </select>
        </form>
        <form className="row p-sm-2 px-3">
          <p className="col-sm-6 my-1 text-sm-start text-center">PASSWORD</p>
          <input
            type="password"
            className="col-sm-6 rounded border border-dark text-sm-start text-center"
            value={registerPASSWORD}
            onChange={(e) => setRegisterPASSWORD(e.target.value)}
          />
        </form>
        {/* Display error message */}
        {errorMessage && (
          <div className="text-center text-danger py-2">{errorMessage}</div>
        )}
        <div className="text-center py-2">
          <button className="text-center px-3 py-1 btn btn-outline-dark" onClick={register}>
            SUBMIT
          </button>
        </div>
      </section>
    </main>
  );
}
