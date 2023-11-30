import { useEffect, useState } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import useUsers from "../../../Hooks/useUsers";
import SharedTitle from "../../../Shared/SharedTitle";

const MyTeams = () => {
  const { user } = UseAuth();
  const [myTeamList, setMyTeamList] = useState([]);
  const [users] = useUsers();
  const email = user?.email;
  const mainUsers = users.filter((user) => user.email == email);
  useEffect(() => {
    if (mainUsers.length > 0) {
      const mainUser = mainUsers[0];
      const teamList = users.filter((u) => u.companyName === mainUser.companyName);
      setMyTeamList(teamList);
    }
    
  }, [users]);
//   when i use in mainusers in dependency it causes infinite loop. i cant solve it

  return (
    <div>
      <SharedTitle heading={"My Team List"}></SharedTitle>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Image</th>
              <th>Member Type</th>
            </tr>
          </thead>
          <tbody>
            {myTeamList.map((user, index) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTeams;
