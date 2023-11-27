import useAsset from "../../../Hooks/UseAsset";

const UserHome = () => {
    const [asset] = useAsset();
    console.log(asset)
    return (
        <div>
            <h2 className="text-center font-3xl">UserHome</h2>
        </div>
    );
};

export default UserHome;