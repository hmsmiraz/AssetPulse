import { useForm } from "react-hook-form";
import SharedTitle from "../../../Shared/SharedTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import UseAuth from "../../../Hooks/UseAuth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const CustomReq = () => {
  const {user} = UseAuth();
  // console.log(user.email)
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      type: "returnable",
      reason: "",
      additionalInfo: "",
      price: 0,
      image: "",
      date: "",
    },
  });
  const axiosPublic = useAxiosPublic();
  const onSubmit = async (data) => {
    console.log("Asset data:", data);
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
    const assetReq = {
      name: data.name,
      type: data.type,
      reason: data.reason,
      additionalInfo: data.additionalInfo,
      price: parseInt(data.price),
      image: res.data.data.display_url,
      date: data.date,
      email: user.email,
      status: "requested",
    };
    const result = await axiosPublic.post('/customReq', assetReq)
    if(result.data.insertedId){
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${data.name} add to customReqDB.`,
        showConfirmButton: false,
        timer: 1500
      });
    }
    reset();
    }
  };

  return (
    <div className="my-5">
      <SharedTitle heading={"Make a Custom Request"}></SharedTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Asset Name</span>
            </label>
            <input
              type="text"
              placeholder="Asset Name"
              {...register("name", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.name && (
              <span className="error">Asset name is required</span>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Asset Type</span>
            </label>
            <select
              {...register("type", { required: true })}
              className="input input-bordered w-full"
            >
              <option value="returnable">Returnable</option>
              <option value="nonReturnable">Non-returnable</option>
            </select>
            {errors.type && (
              <span className="error">Asset type is required</span>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Why You Need This</span>
            </label>
            <textarea
              placeholder="Reason for requesting asset"
              {...register("reason", { required: true })}
              className="textarea textarea-bordered w-full"
            ></textarea>
            {errors.reason && <span className="error">Reason is required</span>}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Additional Information</span>
            </label>
            <textarea
              placeholder="Additional information about the asset"
              {...register("additionalInfo", { required: true })}
              className="textarea textarea-bordered w-full"
            ></textarea>
            {errors.additionalInfo && (
              <span className="error">additionalInfo is required</span>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Asset Price</span>
            </label>
            <input
              type="number"
              min={0}
              step={0.01}
              placeholder="Asset Price"
              {...register("price", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.price && (
              <span className="error">Asset price is required</span>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input
              type="file"
              {...register("image")}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Today Date</span>
            </label>
            <input
              type="date"
              placeholder="enter the today date"
              {...register("date", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.date && (
              <span className="error">Today date is required</span>
            )}
          </div>
          <div className="mt-9 ">
          <button type="submit" className=" text-white btn btn-primary w-full">
            Submit
          </button>
        </div>
        </div>
 
      </form>
    </div>
  );
};

export default CustomReq;
