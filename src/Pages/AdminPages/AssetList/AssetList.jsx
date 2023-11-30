import { useState } from "react";
import useAsset from "../../../Hooks/UseAsset";
import SharedTitle from "../../../Shared/SharedTitle";
import { Button, Pagination, Stack } from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const AssetList = () => {
  const [assets, ,refetch] = useAsset();
  const axiosPublic = useAxiosPublic();

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
    const filteredAssets = assets?.filter((asset) => {
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
        const res = await axiosPublic.delete(`/assets/${item._id}`);
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${item.name} has been deleted!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };
  return (
    <Stack spacing={2}>
      <div>
        <SharedTitle heading={"All Asset is Here"}></SharedTitle>
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
                  <th>Quantity</th>
                  <th>Date Added</th>
                  <th>Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.type}</td>
                    <td>{item.stockQuantity}</td>
                    <td>{item.reqData}</td>
                    <td>
                      <Button>
                        <FaEdit></FaEdit>
                      </Button>
                    </td>
                    <td>
                      <Button onClick={() => handleDelete(item)}>
                        <FaTrash></FaTrash>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center pb-5">
        <Pagination count={10} color="primary" />
      </div>
    </Stack>
  );
};

export default AssetList;
