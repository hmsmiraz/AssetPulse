import Swal from "sweetalert2";
import UseAuth from "../../../Hooks/UseAuth";
import useUsers from "../../../Hooks/useUsers";
import SharedTitle from "../../../Shared/SharedTitle";
import { FcCancel } from "react-icons/fc";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
const MyEmployeeList = () => {
  const { user } = UseAuth();
  const axiosPublic = useAxiosPublic();
  const [users, , refetch] = useUsers();
  const email = user?.email;
  const bookedUsers = users.filter((user) => user.adminEmail == email);
  // console.log(bookedUsers)
  const handleRemove = (user) => {
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
        const res = await axiosPublic.delete(`/users/${user._id}`);
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${user.name} users has been deleted!`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      }
    });
  };
  return (
    <div>
      <SharedTitle heading={"My Employee List"}></SharedTitle>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Image</th>
              <th>Member Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookedUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user?.name}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={user?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <th>{user?.role}</th>
                <th>
                  <button
                    onClick={() => handleRemove(user)}
                    className="btn btn-ghost btn-sm tooltip"
                    data-tip="Remove from Team"
                  >
                    <FcCancel className="text-2xl" />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEmployeeList;
