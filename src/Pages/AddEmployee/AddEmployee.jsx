import { useForm } from "react-hook-form";
import SharedTitle from "../../Shared/SharedTitle";
import UseAuth from "../../Hooks/UseAuth";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddEmployee = () => {
  const { register, handleSubmit } = useForm();
  const { createUser, updateUserProfile } = UseAuth();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    // console.log("Data", data);
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const employee = {
        name: data.name,
        role: data.role,
        birthDate: data.birthDate,
        image: res.data.data.display_url,
        email: data.email,
      };
      console.log(employee)
      createUser(data.email, data.password)
        .then((result) => {
          const loggedUser = result.user;
          console.log("employee", loggedUser);
          updateUserProfile(data.name, data.photoUrl).then(() => {
            axiosPublic.post("/users", employee);
            if (res.data.insertedId) {
              console.log("employee added");
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.name} as employee added to DB.`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        })
        .then((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div>
      <SharedTitle heading={"Join as a Employee"}></SharedTitle>
      <div className="mx-2 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Full Name"
                {...register("name", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Your Role</span>
              </label>
              <select
                type="text"
                selected
                defaultValue={"Employee"}
                {...register("role", { required: true })}
                className="select select-bordered w-full"
              >
                <option value={"Employee"}>Employee</option>
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Date of Birth</span>
              </label>
              <input
                type="date"
                placeholder="date of Birth"
                {...register("birthDate", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Your Picture</span>
              </label>
              <input
                type="file"
                {...register("image", { required: true })}
                className="file-input file-input-bordered file-input-primary w-full "
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="email"
                {...register("email", { required: true })}
              ></input>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered w-full"
                placeholder="password"
                {...register("password", { required: true })}
              ></input>
            </div>
          </div>
          <div className="flex items-center justify-center my-3">
            <button className="btn btn-neutral rounded-md text-white">
              Register as Employee
            </button>
          </div>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default AddEmployee;
