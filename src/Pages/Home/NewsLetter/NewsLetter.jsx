import Swal from "sweetalert2";
const NewsLetter = () => {
  const handleSubmit = () => {
    Swal.fire({
      title: "Success!",
      text: "Thank you for subscribing to our newsletter",
      icon: "success",
      confirmButtonText: "Cool",
    });
  };
  return (
      <div className="hero shadow-lg my-10 text-stone-600">
        <div className="hero-content flex-col lg:flex-row py-20">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Contact Us!</h1>
            <p className="py-6">
              Feel free to tell us about your plans and events! Do not hesitate
              to message us. We will contact with you soon, Inshallah.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Message</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Message"
                  className="input input-bordered py-12"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button
                  className="btn bg-stone-600 text-white"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default NewsLetter;