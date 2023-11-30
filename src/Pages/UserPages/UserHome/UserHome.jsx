import useCustomReq from "../../../Hooks/useCustomReq";
import SharedTitle from "../../../Shared/SharedTitle";
import { FcViewDetails } from "react-icons/fc";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CardMedia, TextField } from "@mui/material";
import UseAuth from "../../../Hooks/UseAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAssetReq from "../../../Hooks/useAssetReq";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const UserHome = () => {
  const { user } = UseAuth();
  const [assetsReq] = useAssetReq();
  const axiosPublic = useAxiosPublic();
  const email = user?.email;
  const [customReq] = useCustomReq();
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(true);
  const [editableItem, setEditableItem] = React.useState(null);
  const assets = assetsReq.filter((assets) => assets.userEmail == email);
  const assetsPending = assets.filter((asset) => asset.status == "requested");
  // console.log(assetsPending)
  const sortedAssetsDate = assetsPending.slice().sort((a, b) => {
    const dateA = new Date(a.reqDate);
    const dateB = new Date(b.reqDate);
    return dateB - dateA;
  });
  // console.log(sortedAssetsDate)

  const handleOpen = (item) => {
    setEditableItem(item);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //   console.log(editableItem);

  const handleChange = (
    event,
    name,
    price,
    type,
    status,
    reason,
    date,
    additionalInfo
  ) => {
    if (name == "price") {
      editableItem[name] = parseFloat(event.target.value);
    } else {
      editableItem[name] = event.target.value;
    }

    editableItem[price] = parseFloat(event.target.value);
    editableItem[type] = event.target.value;
    editableItem[status] = event.target.value;
    editableItem[reason] = event.target.value;
    editableItem[date] = event.target.value;
    editableItem[additionalInfo] = event.target.value;
    setEditableItem({
      ...editableItem,
    });
  };
  const handleUpdate = async (id) => {
    console.log(id);
    // const updatedEditableItem = { ...editableItem };
    // updatedEditableItem.name = event.target.value;
    setEdit(false);
    console.log(editableItem);
    const res = await axiosPublic.put(`/customReq/${id}`, editableItem);
    console.log(editableItem.data);
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${res.name} is updated to the menu.`,
        showConfirmButton: false,
        timer: 1500,
      });
      setOpen(false);
    }
  };
  const filteredList = customReq.filter((reqList) => reqList.email == email);
  return (
    <div>
      <Helmet>
        <title>AssetPulse | User Home</title>
      </Helmet>
      {/* custom */}
      <div>
        <SharedTitle heading={"Your All Custom Requests"}></SharedTitle>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Asset Name</th>
                <th>Price</th>
                <th>Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.type}</td>
                  <td>{item.status}</td>
                  <td>
                    <Button onClick={() => handleOpen(item)}>
                      <FcViewDetails />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal
          key={editableItem?._id}
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <CardMedia
              component="img"
              sx={{ width: 120, height: 120 }}
              image={editableItem?.image}
              alt="image"
            />
            {edit ? (
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {editableItem?.name}
              </Typography>
            ) : (
              <TextField
                name="name"
                type="text"
                defaultValue={editableItem?.name}
                id="filled-required"
                onChange={(event) => handleChange(event, "name")}
              />
            )}

            <div className="flex flex-col md:flex-row gap-3">
              <div>
                {edit ? (
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Price: ${editableItem?.price}
                  </Typography>
                ) : (
                  <TextField
                    name="price"
                    type="number"
                    required
                    defaultValue={editableItem?.price}
                    id="filled-required"
                    onChange={(event) => handleChange(event, "price")}
                  />
                )}
                {edit ? (
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Date: {editableItem?.date}
                  </Typography>
                ) : (
                  <TextField
                    name="date"
                    type="date"
                    required
                    defaultValue={editableItem?.date}
                    id="filled-required"
                    onChange={(event) => handleChange(event, "date")}
                  />
                )}
                {edit ? (
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Reason: {editableItem?.reason}
                  </Typography>
                ) : (
                  <TextField
                    name="reason"
                    type="text"
                    required
                    defaultValue={editableItem?.reason}
                    id="filled-required"
                    onChange={(event) => handleChange(event, "reason")}
                  />
                )}
              </div>
              <div>
                {edit ? (
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Type: {editableItem?.type}
                  </Typography>
                ) : (
                  <TextField
                    name="type"
                    type="text"
                    required
                    defaultValue={editableItem?.type}
                    id="filled-required"
                    onChange={(event) => handleChange(event, "type")}
                  />
                )}
                {edit ? (
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    status: {editableItem?.status}
                  </Typography>
                ) : (
                  <TextField
                    name="status"
                    type="text"
                    required
                    defaultValue={editableItem?.status}
                    id="filled-required"
                    onChange={(event) => handleChange(event, "status")}
                  />
                )}
                {edit ? (
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Additional Info: {editableItem?.additionalInfo}
                  </Typography>
                ) : (
                  <TextField
                    name="additionalInfo"
                    type="text"
                    required
                    defaultValue={editableItem?.additionalInfo}
                    id="filled-required"
                    onChange={(event) => handleChange(event, "additionalInfo")}
                  />
                )}
              </div>
            </div>
            <div className="flex gap-2 items-center justify-end mt-2">
              {edit ? (
                <Button
                  variant="contained"
                  onClick={() => handleUpdate(editableItem?._id)}
                >
                  Update
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => handleUpdate(editableItem?._id)}
                >
                  Save
                </Button>
              )}
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
      {/* pending */}
      <div>
        <SharedTitle heading={"Your pending requests"}></SharedTitle>
        <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Asset Name</th>
                <th>Request Date</th>
                <th>Type</th>
                <th>Status</th>
                
              </tr>
            </thead>
            <tbody>
              {assetsPending.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.reqDate}</td>
                  <td>{item.type}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </div>
      {/* recent pending */}
      <div>
        <SharedTitle heading={"Your recent pending requests"}></SharedTitle>
        <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Asset Name</th>
                <th>Request Date</th>
                <th>Type</th>
                <th>Status</th>
                
              </tr>
            </thead>
            <tbody>
              {sortedAssetsDate.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.reqDate}</td>
                  <td>{item.type}</td>
                  <td>{item.status}</td>
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
export default UserHome;
