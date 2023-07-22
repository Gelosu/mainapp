"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";

export default function LOGIN(props) {
  const router = useRouter();
  const tupcRegExp = /TUPC-\d{2}-\d{4}$/;
  const schema = yup.object().shape({
    TUPCID: yup.string().matches(tupcRegExp, "Invalid TUPC-ID"),
    PASSWORD: yup.string().required("Password Required!"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const submitForm = (e) => {
    router.push("/main")
  };

  return (
    <main className="container vh-100 d-flex justify-content-center align-items-center">
      <form
        className="col-lg-5 d-flex justify-content-center align-items-center flex-column border border-dark h-50 rounded-3"
        onSubmit={handleSubmit(submitForm)}
      >
        <p className="mb-0 mt-3">TUPC ID</p>
        <input
          type="text"
          className="c-size w-75 rounded border border-dark  text-center"
          placeholder="TUPC-**-****"
          {...register("TUPCID")}
        />
        <small className="text-center mb-1 text-danger">
          {errors.TUPCID?.message}
        </small>
        <p className="mb-0">PASSWORD</p>
        <input
          type="password"
          className="c-size w-75 rounded border border-dark  text-center"
          {...register("PASSWORD")}
        />
        <small className="text-center mb-1 text-danger">
          {errors.PASSWORD?.message}
        </small>
        <button
          type="submit"
          className="px-3 mb-3 btn btn-outline-dark"
        >
          LOGIN
        </button>
        <a
          className="link-primary mb-3 text-decoration-none"
          onClick={props.click}
        >
          Forgot Password?
        </a>
        <p className="text-center px-2">
          Don't have an account yet?
          <a className="primary-link text-deco-none" onClick={props.clicknu}>
            Register Now
          </a>
        </p>
      </form>
    </main>
  );
}
