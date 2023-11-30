import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useUsers from "../../../Hooks/useUsers";
import SharedTitle from "../../../Shared/SharedTitle";
import { IoPersonAddSharp } from "react-icons/io5";
import { useState } from "react";
const AddAnEmployee = () => {
  const [users, refetch] = useUsers();
  const axiosPublic = useAxiosPublic();
  const [buttonText, setButtonText] = useState("Add Your Team");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const admin = users.find((admin) => admin.role === "Admin");
  const companyName = admin?.companyName;
  const companyLogo = admin?.companyLogo;
  const adminEmail = admin?.email;
  //   console.log(companyName, companyLogo);

  const handleAddTeam = async (user,companyName, companyLogo, adminEmail) => {
    console.log(user.name);
    const addTeam = {
      hasTeam: "yes",
      companyName: companyName,
      companyLogo: companyLogo,
      adminEmail: adminEmail,
    };
    console.log(addTeam);
    const res = await axiosPublic.put(`/users/${user._id}`, addTeam);
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${user.name} is updated to the users.`,
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
      setButtonText("Booked");
      setIsButtonDisabled(true);
    }
  };
  return (
    <div>
      <SharedTitle heading={"Add An Employee"}></SharedTitle>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>#</th>
                <th>Name</th>
                <th>Image</th>
                <th>Member Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
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
                    {user?.role === "Admin" ? (
                      <button
                        disabled={isButtonDisabled}
                        className="btn btn-ghost btn-sm"
                        data-tip={buttonText}
                      >
                        <IoPersonAddSharp className="text-2xl" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddTeam(user)}
                        className="btn btn-ghost btn-sm tooltip"
                        data-tip={buttonText}
                      >
                        <IoPersonAddSharp className="text-2xl" />
                      </button>
                    )}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddAnEmployee;
