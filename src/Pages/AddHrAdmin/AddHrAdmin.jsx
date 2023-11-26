import { useForm } from "react-hook-form";
import SharedTitle from "../../Shared/SharedTitle";
import UseAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddHrAdmin = () => {
  const { register, handleSubmit } = useForm();
  const { createUser, updateUserProfile } = UseAuth();
  const axiosPublic = useAxiosPublic();
  const onSubmit = async (data) => {
    // console.log(data);
    const imageFile = { image: data.image[0] };
    // const companyLogo = { companyLogo: data.companyLogo[0] };
    // const imageFile = new FormData();
    // imageFile.append("image", data.image[0]);

    // const companyLogo = new FormData();
    // companyLogo.append("companyLogo", data.companyLogo[0]);
    // try {
    //   const [imageResponse, logoResponse] = await Promise.all([
    //     axiosPublic.post(image_hosting_api, imageFile, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }),
    //     axiosPublic.post(image_hosting_api, companyLogo, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }),
    //   ]);

    const res = await axiosPublic.post(
      image_hosting_api,
      imageFile,
      // { image: imageFile, companyLogo: companyLogo },
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    console.log(res);
    // console.log(imageResponse, logoResponse);
    // if (imageResponse.data.success && logoResponse.data.success) {
    if (res.data.success) {
      const admin = {
        name: data.name,
        role: data.role,
        companyName: data.companyName,
        birthDate: data.birthDate,
        image: res.data.data.display_url,
        companyLogo: data.companyLogo,
        email: data.email,
        package: data.package,
      };
      console.log(admin);
      createUser(data.email, data.password)
        .then((result) => {
          const loggedUser = result.user;
          console.log("admin", loggedUser);
          updateUserProfile(data.name, data.photoUrl).then(() => {
            axiosPublic.post("/users", admin);
            if (res.data.insertedId) {
              console.log("Admin added");
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.name} as admin added to DB.`,
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
  // } catch (error) {
  //   console.error("Error:", error);
  // }
  };
  return (
    <div>
      <SharedTitle heading={"Join as a Hr/Admin"}></SharedTitle>
      <div className="mx-2 my-5">
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
                defaultValue={"Admin"}
                {...register("role", { required: true })}
                className="select select-bordered w-full"
              >
                <option value={"Admin"}>Hr/Admin</option>
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Company Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Company Name"
                {...register("companyName", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Your Company Logo</span>
              </label>
              <input
                type="file"
                {...register("companyLogo", { required: true })}
                className="file-input file-input-bordered file-input-primary w-full "
              />
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
                <span className="label-text">Packages</span>
              </label>
              <select
                type="number"
                defaultValue={"default"}
                {...register("package", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled value={"default"}>
                  Select a a package
                </option>
                <option value="5">5 Members for $5</option>
                <option value="8">10 Members for $8</option>
                <option value="15">20 Members for $15</option>
              </select>
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
            <div className="pt-9">
              <button className="btn btn-neutral rounded-md text-white w-full">
                Register as HR/Admin
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHrAdmin;
