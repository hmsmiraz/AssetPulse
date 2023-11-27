import { useForm } from "react-hook-form";
import SharedTitle from "../../Shared/SharedTitle";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddAsset = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      type: "returnable",
      stockQuantity: 0,
      price: 0,
      image: "",
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
      const asset = {
        name: data.name,
        type: data.type,
        stockQuantity: data.stockQuantity,
        price: parseFloat(data.price),
        image: res.data.data.display_url,
      };
      const result = await axiosPublic.post('/assets', asset)
      if(result.data.insertedId){
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${data.name} add to assetsDB.`,
            showConfirmButton: false,
            timer: 1500
          });
      }
      reset();
    }
  };

  return (
    <div className="my-5">
      <SharedTitle heading={"add an asset"}></SharedTitle>
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
              <span className="label-text">Stock Quantity</span>
            </label>
            <input
              type="number"
              min={0}
              placeholder="Stock Quantity"
              {...register("stockQuantity", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.stockQuantity && (
              <span className="error">Stock quantity is required</span>
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
          <div className="mt-9">
            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddAsset;

