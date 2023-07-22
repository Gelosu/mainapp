"use client";

import { useState } from "react";
import Image from "next/image";

export default function FCA() {
  const [classCode, setClassCode] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [cName, setcName] = useState("") 
  const [sName, setsName] = useState("") 
  const addClass = () => {
    if (inputValue.trim() !== "") {
      setClassCode([...classCode, inputValue]);
      setInputValue("");
      setcName("")
      setsName("")
    } 
  };
  const deleteClass = (index) => {
    const updatedClass = [...classCode];
    updatedClass.splice(index, 1);
    setClassCode(updatedClass);
  };
  return (
    <main className="container-fluid p-4 ">
      <section className="p-3">
        <h3>CLASS ARCHIVE</h3>
        <button
          type="button"
          class="btn btn-outline-dark pe-3"
          data-bs-toggle="modal"
          data-bs-target="#popup"
        >
          <Image className="pb-1" src="/add.svg" height={25} width={20}></Image>
          <span>NEW</span>
        </button>
        {/* MODAL */}
        <div
          class="modal fade"
          id="popup"
          tabindex="-1"
          aria-labelledby="ModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="ModalLabel">
                  CLASSROOM
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body px-5">
                <p className="text-center mb-1 ">CLASS NAME</p>
                <input
                value={cName}
                  type="text"
                  className="c-size border border-dark w-100 rounded text-center"
                  onChange={e => setcName(e.target.value)}
                />
                <p className="text-center mb-1 mt-3">CLASS CODE</p>
                <input
                  type="text"
                  className="c-size border border-dark w-100 rounded text-center"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                />
                <p className="text-center mb-1 mt-3">SUBJECT NAME</p>
                <input
                value={sName}
                  type="text"
                  className="c-size border border-dark w-100 rounded text-center"
                  onChange={e => setsName(e.target.value)}
                />
              </div>
              <div class="modal-footer align-self-center">
                <button
                  type="button"
                  class="btn btn-outline-dark"
                  onClick={addClass}
                >
                  Enter
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* End MODAL */}
        {/* Start */}
        <div className="row p-3">
          {classCode.map((classC, index) => (
            <div className="col-lg-4 px-sm-5 py-sm-3 py-md-1">
              <div className="custom-h2 d-flex flex-column gap-4 overflow-hidden rounded border border-dark p-3">
                <div className="text-end">
                  <Image
                    src="/three-dots.svg"
                    width={20}
                    height={20}
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  />
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <li>
                      <a className="dropdown-item" onClick={deleteClass}>
                        Remove Class
                      </a>
                    </li>
                  </ul>
                </div>
                <p key={index} className="text-center">
                  {classC}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
