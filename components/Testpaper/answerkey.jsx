"use client";

import Link from "next/link";
import { useState } from "react";

export default function TESTS() {
  const [testCode, setTestCode] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [renamenew, setRenameNew] = useState("");

  const addTest = () => {
    if (inputValue.trim() !== "") {
      setTestCode([...testCode, inputValue]);
    }
    setInputValue("");
  };
  const deleteTest = (index) => {
    const updatedTest = [...testCode];
    updatedTest.splice(index, 1);
    setTestCode(updatedTest);
  };

  const renameTest = (index) => {
    if (renamenew.trim() !== "") {
      const renamedTest = [...testCode];
      renamedTest.splice(index, 1, renamenew)
      setTestCode(renamedTest);
    }
    setRenameNew("");
  };

  const resetTest = () => {
    setTestCode([]);
  };

  return (
    <main>
      <div className="d-flex justify-content-start align-items-center">
        <Link href="/">
          <button className="btn btn-outline-none" type="button">
            <img className="backArrow" src="back-arrow.png" alt="backArrow" />
          </button>
        </Link>
        <h4 className="text-dark fw-bold fs-3 my-1">CLASS NAME</h4>
      </div>
      <div className="d-flex pt-2">
        <Link href="/tests">
          <button className="btn btn-outline-none" type="button">
            <h4>TESTS</h4>
          </button>
        </Link>
        <Link href="/tests">
          <button className="btn btn-outline-none" type="button">
            <h4 className="mx-2">STUDENTS</h4>
          </button>
        </Link>
      </div>
      <div className="d-flex">
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#popup"
          className="rounded-3 mx-3"
        >
          <h5 className="mx-2 my-1">+ ADD</h5>
        </button>
        {/* MODAL 1 */}
        <div
          class="modal fade"
          id="popup"
          tabindex="-1"
          aria-labelledby="ModalLabel"
          aria-hidden="true"
          data-bs-backdrop="static"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <button
                type="button"
                class="btn-close align-self-end p-3"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <div class="modal-header align-self-center pb-0 pt-0">
                <h5 class="modal-title" id="ModalLabel">
                  ADDING TEST
                </h5>
              </div>
              <div class="modal-body d-flex flex-column pb-2">
                <h6 className="ps-5 ms-2">TEST NAME</h6>
                <input
                  type="text"
                  value={inputValue}
                  className="c-size border border-dark w-75 rounded align-self-center"
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                />
              </div>
              <div class="modal-footer align-self-center">
                <button
                  type="button"
                  class="btn btn-outline-dark mt-0"
                  onClick={addTest}
                  data-bs-dismiss="modal"
                >
                  <h6 className="mx-2 my-1">ADD</h6>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* NED MODAL */}
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#resetPopup"
          className="rounded-3"
        >
          <h5 className="mx-2 my-1">RESET</h5>
        </button>
        <div
          className="modal fade"
          id="resetPopup"
          tabIndex="-1"
          aria-labelledby="resetPopupLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header align-self-center pb-0 pt-0">
                <h5 className="modal-title pt-5" id="ModalLabel">
                  RESET TEST LISTS
                </h5>
              </div>
              <div className="modal-body d-flex flex-column align-items-center pb-0">
                <p className="mb-0">Are you sure you want to reset the list?</p>
                <p>
                  This will delete all of the lists including the contents of it
                </p>
              </div>
              <div className="modal-footer align-self-center">
                <button
                  type="button"
                  className="btn btn-outline-dark mt-0"
                  onClick={resetTest}
                  data-bs-dismiss="modal"
                >
                  <h6 className="mx-2 my-1">CONFIRM</h6>
                </button>
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  className="btn btn-outline-dark mt-0"
                >
                  <h6 className="mx-2 my-1">CANCEL</h6>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column pt-4">
        {testCode.map((classC, index) => (
          <div className="border border-dark rounded mb-3 mx-3">
            <div className="text-end pt-1" >
              <img
                src="/three-dots.svg"
                width={20}
                height={20}
                role="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              />
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => deleteTest(index)}
                >
                  Remove
                </button>
                <button
                  type="button"
                  className="dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target={`#renamePopup${index}`}
                >
                  Rename
                </button>
              </ul>
              <div
                class="modal fade"
                id={`renamePopup${index}`}
                tabindex="-1"
                aria-labelledby="renamePopupLabel"
                aria-hidden="true"
                data-bs-backdrop="static"
                
              >
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <button
                      type="button"
                      class="btn-close align-self-end p-3"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                    <div class="modal-header align-self-center pb-0 pt-0">
                      <h5 class="modal-title" id="ModalLabel">
                        RENAME TEST
                      </h5>
                    </div>
                    <div class="modal-body d-flex flex-column pb-2">
                      <h6 className="align-self-start ps-5 ms-2">TEST NAME</h6>
                      <input
                        type="text"
                        value={renamenew}
                        className="c-size border border-dark w-75 rounded align-self-center"
                        onChange={(e) => {
                          setRenameNew(e.target.value);
                        }}
                      />
                    </div>
                    <div class="modal-footer align-self-center">
                      <button
                        type="button"
                        class="btn btn-outline-dark mt-0"
                        data-bs-dismiss="modal"
                        onClick={() => renameTest(index)}
                      >
                        SAVE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p key={index} className="text-center">
                {classC}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
