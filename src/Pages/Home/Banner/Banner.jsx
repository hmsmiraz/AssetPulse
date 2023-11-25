import { Link } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const Banner = () => {
  const spanStyle = {
    width: "800px",
    padding: "20px",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "42px",
    background:
      "-webkit-linear-gradient(45deg, #00c3ff, #ff99cc, #ff6699), rgba(255, 255, 255, 0.2)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "white",
    display: "inline-block",
  };
  const buttonStyle = {
    position: "absolute",
    top: "70%",
    left: "50%",
    textAlign: "center",
    transform: "translate(-50%, -50%)",
    padding: "10px 20px",
    background: "blue",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "20px",
  };

  const divStyle = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "500px",
    borderRadius: "2%",
    margin: "2px",
  };

  const slideImages = [
    {
      url: "https://i.ibb.co/dfCPbwB/hr.jpg",
      caption:
        "Unlock the Power of Code: Exploring the World of Programming 🚀",
      link: "/addHrAdmin",
      buttonText: "Join as HR/Admin",
    },
    {
      url: "https://i.ibb.co/5Wcckmn/employee.jpg",
      caption: "From Zero to Hero: Your Journey Through the Code Jungle 🌐",
      link: "/addEmployee",
      buttonText: "Join as an Employee",
    },
  ];
  return (
    <div className="slide-container my-5">
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div
              style={{
                ...divStyle,
                backgroundImage: `url(${slideImage.url})`,
              }}
            >
              <span style={spanStyle}>{slideImage.caption}</span>
              <Link to={slideImage.link} style={buttonStyle}>
                {slideImage.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Banner;
