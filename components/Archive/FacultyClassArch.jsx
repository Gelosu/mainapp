"use client";

import { useState } from "react";
import Image from "next/image";

export default function FCA() {
  const [classCode, setClassCode] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [renameit, setRenameit] = useState("");

  const addClass = () => {
    if (inputValue.trim() !== "") {
      setClassCode([...classCode, inputValue]);
      setInputValue("");
    }
  };
  const deleteClass = (index) => {
    const updatedClass = [...classCode];
    updatedClass.splice(index, 1);
    setClassCode(updatedClass);
  };
  const renameNew = (index) => {
    if (renameit.trim() !== "") {
      const wow = [...classCode];
      wow.splice(index, 1, renameit);
      setClassCode(wow);
    }
    setRenameit("");
  };
  return (
    <main className="container-fluid p-sm-4 py-3 ">
      <section>
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
                  INSERT SUBJECT CODE
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <input
                  type="text"
                  value={inputValue}
                  className="c-size border border-dark w-100 rounded"
                  placeholder="Ask class code to your professor"
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                />
              </div>
              <div class="modal-footer align-self-center">
                <button
                  type="button"
                  class="btn btn-outline-dark"
                  onClick={addClass}
                  data-bs-dismiss="modal"
                >
                  Enter
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* End MODAL */}
        {/* Start */}
        <div className="d-flex flex-wrap flex-start pt-2 ">
          {classCode.map((classC, index) => (
            <div className="col-xl-2 col-lg-3 col-md-5 col-12 border border-dark rounded mb-3 me-3 p-5">
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
                    <a
                      className="dropdown-item"
                      onClick={() => deleteClass(index)}
                    >
                      Remove Class
                    </a>
                    <a
                      className="dropdown-item"
                      data-bs-toggle="modal"
                      data-bs-target={`#Renamepopup${index}`}
                    >
                      Rename
                    </a>
                  </li>
                </ul>
                {/* modal2 */}
                <div
                  class="modal fade"
                  id={`Renamepopup${index}`}
                  tabindex="-1"
                  aria-labelledby="Renamepopuplabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="ModalLabel">
                          INSERT SUBJECT CODE
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <input
                          type="text"
                          className="c-size border border-dark w-100 rounded"
                          placeholder="Rename"
                          value={renameit}
                          onChange={e => setRenameit(e.target.value)}
                        />
                      </div>
                      <div class="modal-footer align-self-center">
                        <button
                          type="button"
                          class="btn btn-outline-dark"
                          data-bs-dismiss="modal"
                          onClick={() => renameNew(index)}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end modal2 */}
              </div>
              <div>
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
