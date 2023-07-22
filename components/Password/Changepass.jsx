import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
export default function ChangePass(props) {
  const schema = yup.object().shape({
    NewPass: yup.string().required("New Password!"),
    NewPassConfirm: yup.string().oneOf([yup.ref("NewPass"),null], "Password must match!")
    
  })
  const {register, handleSubmit, formState:{ errors },} = useForm({resolver:yupResolver(schema),}) 
  const submitForm = (e) => {

  }
  return (
    <main className="container-sm vh-100 d-flex justify-content-center align-items-center">
      <section className="col-sm-5 border border-dark rounded p-3 py-5">
        <p className="text-center fs-5 fw-bold">FORGOT PASSWORD</p>
        <form className="row gap-3 justify-content-center" onSubmit={handleSubmit(submitForm)}>
          <input
            type="password"
            className="w-75 c-size border border-dark rounded text-center"
            placeholder="NEW PASSWORD"
            {...register("NewPass")}
          />
          <small className="text-center text-danger">
              {errors.NewPass?.message}
          </small>
        
          <input
            type="password"
            className="w-75 c-size border border-dark rounded text-center"
            placeholder="CONFIRM PASSWORD"
            {...register("NewPassConfirm")}
          />
          <small className="text-center text-danger">
                {errors.NewPassConfirm?.message}
          </small>
      
          <div className="text-center mb-3">
            <button className="btn btn-outline-dark" >SUBMIT</button>
          </div>
        </form>
      </section>
    </main>
  );
}
