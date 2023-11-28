import React, { useState } from "react";
import useAsset from "../../../Hooks/UseAsset";
import SharedTitle from "../../../Shared/SharedTitle";
import { CiSquareQuestion } from "react-icons/ci";
import UseAuth from "../../../Hooks/UseAuth";
import {
  Box,
  Button,
  Modal,
} from "@mui/material";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ReqAsset = () => {
  const { user } = UseAuth();
  const [assets] = useAsset();
  const [open, setOpen] = React.useState(false);
  const axiosPublic = useAxiosPublic();

  const [searchByName, setSearchByName] = useState("");
  const [filterByType, setFilterByType] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const date = new Date();
//  console.log(selectedAsset);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const handleOpen = (item) => {
    setSelectedAsset(item);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

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

    return filteredAssets;
  };

  const filteredAssets = filterAsset();


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get the text input value
    const textInputValue = event.target.elements.textInput.value;
    // console.log(textInputValue, selectedAsset.name);
    const reqAsset = {
      assetId: selectedAsset._id,
      name: selectedAsset.name,
      type: selectedAsset.type,
      note: textInputValue,
      userName: user.displayName,
      userEmail: user.email,
      reqDate: date,
      status: "requested",
    };
    // console.log(reqAsset);  
    const result =   await axiosPublic.post('/assetReq', reqAsset)
    if(result.data.insertedId){
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${selectedAsset.name} add to ReqAssetsDB.`,
        showConfirmButton: false,
        timer: 1500
      });
    }
    setOpen(false);
  };
  return (
    <div>
      <SharedTitle heading={"Request for an Asset"}></SharedTitle>
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
        {/* category search */}
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
                <th>Image</th>
                <th>Type</th>
                <th>Availability</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.type}</td>
                  <td>{item.stockQuantity}</td>
                  <td>
                    <Button onClick={() => handleOpen(item)}>
                      <CiSquareQuestion />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* modal */}
      {filteredAssets.map((item) => (
        <Modal key={item._id} open={open} onClose={handleClose}>
          <Box sx={style}>
            {/* onSubmit={()=>{handleSubmit(item)}} */}
            <form onSubmit={handleSubmit} >
              <div className="flex flex-col gap-4 items-center justify-center">
                <div>
                  <input
                    type="text"
                    id="textInput"
                    placeholder="Enter your text here"
                  />
                </div>
                <div>
                  <button type="submit" className="btn">
                    Submit
                  </button>
                  <button type="button" className="btn ml-2" onClick={handleClose}>
                    Close
                  </button>
                </div>
              </div>
            </form>
          </Box>
        </Modal>
      ))}
    </div>
  );
};

export default ReqAsset;
