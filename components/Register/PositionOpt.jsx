"use client";
export default function PositionOPT({clickfr, clicksr}) {
  return (
    <main className="vh-100 d-flex justify-content-center align-items-center">
        <div className="d-flex flex-column align-self-center h-50 justify-content-center">
        <p className="text-center fs-2 fw-bold">CHOOSE POSTION</p>
        <section className="d-sm-flex gap-5 justify-content-center h-50 container-lg">
            <button className="btn btn-outline-dark p-5 custom-width" onClick={clicksr}>STUDENT PROFILE</button>
            <button className="btn btn-outline-dark p-5 custom-width" onClick={clickfr}>FACULTY PROFILE</button>
        </section>
    </div>
    </main>
 );
}

    // <main className="d-flex justify-content-center align-items-center custom-h">
    //   <section className="container-lg border border-danger h-50">
    //     <p className="text-center fs-2">CHOOSE POSITION</p>
    //     <div className="row justify-content-center px-3 gap-5">
    //       <button className="col-sm-3 btn btn-outline-dark ">STUDENT PROFILE</button>
    //       <button className="col-sm-3 btn btn-outline-dark py-5">
    //         PROFFESOR PROFILE
    //       </button>
    //     </div>
    //   </section>
    //  </main>
    
  