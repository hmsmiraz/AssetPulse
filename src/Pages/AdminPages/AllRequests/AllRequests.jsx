import { Button } from "@mui/material";
import useAssetReq from "../../../Hooks/useAssetReq";
import SharedTitle from "../../../Shared/SharedTitle";
import { FcDisapprove } from "react-icons/fc";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useState } from "react";
const AllRequests = () => {
  const [assetsReq, , refetch] = useAssetReq();
  const axiosPublic = useAxiosPublic();
  const [searchByEmail, setSearchByEmail] = useState("");

  const handleSearchByEmail = (event) => {
    event.preventDefault();
    setSearchByEmail(event.target.value);
  };
  const filterReq = () => {
    const filterRequests = assetsReq?.filter((item) => {
      const emailMatch = item?.userEmail
        .toLowerCase()
        .includes(searchByEmail.toLowerCase());
      return emailMatch;
    });
    return filterRequests;
  };
  const requestData = filterReq();
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
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${item.name} has been deleted!`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      }
    });
  };

  const handleApproved = (item) => {
    axiosPublic.patch(`/assetReq/${item._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${item.name} has been Approved!`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };
  return (
    <div>
      <SharedTitle heading={"All Requests"}></SharedTitle>
      <div>
        {/* email search */}
        <div>
          <form
            onSubmit={handleSearchByEmail}
            className="flex items-center justify-center"
          >
            <div className="form-control">
              <input
                type="text"
                placeholder="Search By email"
                name="searchByEmail"
                className="input input-bordered w-24 md:w-48"
                value={searchByEmail}
                onChange={handleSearchByEmail}
              />
            </div>
          </form>
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
                  <th>Email of requester</th>
                  <th>Name of requester</th>
                  <th>Request Date</th>
                  <th>Note</th>
                  {/* <th>Status</th> */}
                  <th>Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {requestData.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.type}</td>
                    <td>{item.userEmail}</td>
                    <td>{item.userName}</td>
                    <td>{item.reqDate}</td>
                    <td>{item.note}</td>
                    <td>
                      {item?.status === "requested" ? (
                        <Button
                          onClick={() => handleApproved(item)}
                          className="tooltip"
                          data-tip="requested"
                        >
                          Requested
                        </Button>
                      ) : (
                        <Button className="tooltip" data-tip="Approved">
                          Approved
                        </Button>
                      )}
                    </td>
                    <td>
                      <Button
                        onClick={() => handleDelete(item)}
                        className="tooltip"
                        data-tip="Delete"
                      >
                        <FcDisapprove className="text-2xl"></FcDisapprove>
                      </Button>
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

export default AllRequests;
