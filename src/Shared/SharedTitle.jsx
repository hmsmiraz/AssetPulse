const SharedTitle = ({ heading }) => {
  return (
    <div className="mx-auto text-center my-8 md:w-4/12 pt-6">
      <h3 className="text-2xl py-4 uppercase border-y-4 border-stone-300 text-blue-600 font-bold">{heading}</h3>
    </div>
  );
};

export default SharedTitle;
