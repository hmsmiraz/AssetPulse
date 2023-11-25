import SharedTitle from "../../../Shared/SharedTitle";

const About = () => {
  return (
    <div className=" my-5">
      <SharedTitle heading={"About Us"}></SharedTitle>
      <div className="hero min-h-screen bg-base-200 flex flex-col md:flex-row gap-6 ">
        <div className="hero-content md:mx-10">
          <img
            src="https://i.ibb.co/XXmrMZR/gadget.jpg"
            className="md:max-w-sm rounded-lg shadow-2xl"
          />
        </div>
        <div className="mx-2 text-left">
          <h2 className="card-title font-bold text-xl ">
            Asset Share: Streamlined System for Efficient Resource Distribution
          </h2>

          <div className="divider divider-neutral"></div>
          <p>
            Our system offers a swift, user-friendly platform for companies to
            access and utilize a wide range of resources. It simplifies the
            process of browsing, selecting, and requesting assets tailored to
            specific needs. Real-time updates on availability and condition
            ensure optimized deployment, minimizing downtime.
          </p>

          <div className="divider divider-neutral"></div>
          <p className="py-2">
            Robust security measures protect sensitive information, promoting
            trust among users. This system not only facilitates asset lending
            but also encourages collaborative opportunities among companies,
            fostering resource efficiency and reducing costs. With its
            simplicity and commitment to enhancing resource utilization, Asset
            Share is the go-to solution for streamlined asset management and
            collaborative growth.
          </p>

          <div className="divider divider-neutral"></div>
          <p className="pt-2">
            With its innovative approach and commitment to resource
            optimization, our Asset Management System stands as a catalyst for
            fostering collaborative growth and sustainable practices in the
            corporate landscape.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
