import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UseAuth from "../../../Hooks/UseAuth";
import useUsers from "../../../Hooks/useUsers";

const UserProfile = () => {
  const { user } = UseAuth();
  const [users] = useUsers();
  const email = user?.email;
  const filteredUser = users.filter((user) => user.email == email);
  return (
    <div>
      <h2 className="text-center text-blue-600 font-bold font-2xl">
        User Profile
      </h2>
      <div className="flex justify-center items-center my-5">
        {filteredUser.map((item) => (
          <Card key={item._id} sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="Admin Picture"
              height="140"
              image={item?.image}
            />
            <CardContent style={{ justifyContent: "center" }}>
              <Typography gutterBottom variant="h5" component="div">
                Name: {item?.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ paddingBottom: 1, paddingTop: 1 }}
              >
                Email: {item?.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Date of Birth: {item?.birthDate}
              </Typography>
            </CardContent>
            <CardActions
              style={{ justifyContent: "center" }}
              sx={{ marginBottom: 2 }}
            >
              <Button variant="contained" size="small">
                Update
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
