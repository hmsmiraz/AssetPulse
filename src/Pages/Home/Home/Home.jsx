import { Helmet } from "react-helmet-async";
import About from "../About/About";
import Banner from "../Banner/Banner";
import Packages from "../Packages/Packages";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>AssetPulse | Home</title>
      </Helmet>
      <Banner></Banner>
      <About></About>
      <Packages></Packages>
      
    </div>
  );
};

export default Home;
