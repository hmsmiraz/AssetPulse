import Swal from "sweetalert2";
import UseAuth from "../../../Hooks/UseAuth";
import useAssetReq from "../../../Hooks/useAssetReq";
import SharedTitle from "../../../Shared/SharedTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Button from "@mui/material/Button";
import { GiReturnArrow } from "react-icons/gi";
import { FaPrint } from "react-icons/fa";
const MyAssets = () => {
  const { user } = UseAuth();
  const axiosPublic = useAxiosPublic();
  const email = user?.email;
  const [assetsReq, , refetch] = useAssetReq();
  const filteredAssetReq = assetsReq.filter(
    (assets) => assets.userEmail == email
  );
  //   console.log(filteredAssetReq);

  const [searchByName, setSearchByName] = useState("");
  const [filterByType, setFilterByType] = useState("");

  const handleSearchByName = (event) => {
    event.preventDefault();

    setSearchByName(event.target.value);
  };

  const handleSearchByType = (event) => {
    event.preventDefault();

    setFilterByType(event.target.value);
  };

  const filterAsset = () => {
    const filteredAssets = filteredAssetReq?.filter((asset) => {
      const nameMatches = asset?.name
        .toLowerCase()
        .includes(searchByName.toLowerCase());
      const typeMatches = filterByType ? asset.type === filterByType : true;
      return nameMatches && typeMatches;
    });

    const sortedAssets = filteredAssets?.sort((a, b) => {
      return parseInt(a.stockQuantity) - parseInt(b.stockQuantity);
    });

    return sortedAssets;
  };

  const filteredAssets = filterAsset();

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/assetReq/${item._id}`);
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${item.name} request has been deleted!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };
  return (
    <div>
      <SharedTitle heading={"My Assets"}></SharedTitle>
      <div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 my-5">
          {/* name search */}
          <div>
            <form
              onSubmit={handleSearchByName}
              className="flex items-center justify-center"
            >
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Search By name"
                  name="searchByName"
                  className="input input-bordered w-24 md:w-48"
                  value={searchByName}
                  onChange={handleSearchByName}
                />
              </div>
            </form>
          </div>
          {/* type search */}
          <div>
            <form
              onSubmit={handleSearchByType}
              className="flex items-center justify-center"
            >
              <div className="form-control">
                <select
                  className="select select-bordered"
                  type="text"
                  name="filterByType"
                  required
                  value={filterByType}
                  onChange={handleSearchByType}
                >
                  <option value="returnable">Returnable</option>
                  <option value="nonReturnable">Non-returnable</option>
                </select>
              </div>
            </form>
          </div>
        </div>
        <div className="my-5">
          <div className="overflow-x-auto mx-2">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Asset Name</th>
                  <th>Type</th>
                  <th>Request Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.type}</td>
                    <td>{item.reqDate}</td>
                    <td>{item.status}</td>

                    <td>
                      {item?.status === "approved" &&
                      item?.type === "returnable" ? (
                        <Button disabled color="success">
                          <GiReturnArrow className="text-black" />
                        </Button>
                      ) : // onClick={() => handlePrint(item)}
                      item?.status === "approved" &&
                        item?.type !== "returnable" ? (
                        <Button>
                          <FaPrint />
                        </Button>
                      ) : (
                        <Button  onClick={() => handleDelete(item)}>
                          <FaTrash className="text-red-600"></FaTrash>
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAssets;
