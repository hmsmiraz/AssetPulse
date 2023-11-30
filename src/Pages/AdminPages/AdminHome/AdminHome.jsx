import { Helmet } from "react-helmet-async";
import SharedTitle from "../../../Shared/SharedTitle";
import useAssetReq from "../../../Hooks/useAssetReq";
import { Button } from "@mui/material";
import { FcRight } from "react-icons/fc";
import { Link } from "react-router-dom";
import useCustomReq from "../../../Hooks/useCustomReq";
import { PieChart, Pie, Cell, Legend } from "recharts";
import NewsLetter from "../../Home/NewsLetter/NewsLetter";
import useAsset from "../../../Hooks/UseAsset";
const AdminHome = () => {
  const [assetsReq] = useAssetReq();
  const [customReq] = useCustomReq();
  const [assets] = useAsset();
  const pendingReq = assetsReq
    .filter((user) => user.status == "requested")
    .slice(0, 5);
  const customRequests = customReq
    .filter((user) => user.status == "requested")
    .slice(0, 3);
  const returnable = assetsReq.filter((asset) => asset.type == "returnable");
  const nonReturnable = assetsReq.filter(
    (asset) => asset.type == "nonReturnable"
  );
  const returnableAsset = returnable.length;
  const nonReturnableAsset = nonReturnable.length;
  // console.log(nonReturnableAsset, returnableAsset);

  const data = [
    { name: "Returnable Asset", value: returnableAsset },
    { name: "Non-Returnable Asset", value: nonReturnableAsset },
  ];

  const COLORS = ["#0088FE", "#00C49F"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div>
      <Helmet>
        <title>AssetPulse | Admin Home</title>
      </Helmet>
      <SharedTitle heading={"Welcome Admin "}></SharedTitle>
      <div>
        {/* Pending Requests */}
        <section>
          <h2 className="text-center text-xl font-bold p-5 border-stone-500 border-y-2">
            Pending Requests
          </h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Request Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingReq.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.reqDate}</td>
                    <td>{item.status}</td>
                    <th>
                      <Link to={"/allRequest"}>
                        <Button>
                          <FcRight className="text-2xl" />
                        </Button>
                      </Link>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {/* pie chart */}
        <section className="flex flex-col items-center justify-center gap-5">
          <h2 className="text-center text-xl font-bold p-5 border-stone-500 border-y-2">
            Asset Request Type Ratio
          </h2>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx={200}
              cy={200}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend></Legend>
          </PieChart>
        </section>
        {/* custom Requests */}
        <section className="my-5">
          <h2 className="text-center text-xl font-bold p-5 border-stone-500 border-y-2">
            Custom Requests
          </h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Request Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {customRequests.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.date}</td>
                    <td>{item.status}</td>
                    <th>
                      <Link to={"/customReqList"}>
                        <Button>
                          <FcRight className="text-2xl" />
                        </Button>
                      </Link>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {/* Our Product */}
        <section>
          <SharedTitle heading={"Our provided Products"}></SharedTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assets.map((item) => (
              <div key={item._id} className="card  shadow-xl">
                <figure>
                  <img src={item?.image} alt="product" className="h-32 w-32" />
                </figure>
                <div className="card-body flex items-center justify-center ">
                  <h2 className="card-title">{item?.name}</h2>
                  <div className="flex gap-4">
                    <div>
                      <p>Type: {item?.type}</p>
                    </div>
                    <div><p>Price: ${item?.price}</p></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Newsletter */}
        <section className="my-5">
          <SharedTitle heading={"Contact With us"}></SharedTitle>
          <NewsLetter></NewsLetter>
        </section>
      </div>
    </div>
  );
};

export default AdminHome;
