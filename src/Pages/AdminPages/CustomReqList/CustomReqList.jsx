import useCustomReq from "../../../Hooks/useCustomReq";
import SharedTitle from "../../../Shared/SharedTitle";
import { FcApproval, FcDisapprove } from "react-icons/fc";
import { Button } from "@mui/material";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
const CustomReqList = () => {
    const[customReq, refetch] = useCustomReq(); 
  const axiosPublic = useAxiosPublic();
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
            const res = await axiosPublic.delete(`/customReq/${item._id}`);
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
        <div>
            <SharedTitle heading={"All CUstom requests"}></SharedTitle>
            <div>
            <div className="my-5">
          <div className="overflow-x-auto mx-2">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Asset Name</th>
                  <th>Price</th>
                  <th>Type</th>
                  <th>Image</th>
                  <th>Reason</th>
                  <th>additional Info</th>
                  <th>Date</th>
                  <th>Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {customReq.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.type}</td>
                    <td>{item.image}</td>
                    <td>{item.reason}</td>
                    <td>{item.additionalInfo}</td>
                    <td>{item.date}</td>
                    <td>
                      <Button className="tooltip" data-tip="Approved">
                        <FcApproval
                          className="text-2xl tooltip"
                          data-tip="Approve"
                        ></FcApproval>
                      </Button>
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

export default CustomReqList;