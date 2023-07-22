export default function FORGOTPASS(props) {
  return (
    <main className="container vh-100 d-flex justify-content-center align-items-center">
      <section className="col-lg-5 d-flex justify-content-center align-items-center flex-column border border-dark h-50 rounded-3">
        <p className="mb-0 fw-bold fs-5 ">FORGOT PASSWORD</p>
        <p className="fw-light text-center px-3">Enter your GSFE account to reset your password</p>
        <input
          type="text"
          className="c-size w-75 rounded border border-dark mb-3 text-center"
          placeholder="TUPC-**-****"
        />
        <input
          type="text"
          className="c-size w-75 rounded border border-dark mb-3 text-center"
          placeholder="GSFE ACCOUNT"
        />
        <button className="px-3 mb-3 btn btn-outline-dark" onClick={props.click}>Submit</button>
      </section>
    </main>
  );
}
