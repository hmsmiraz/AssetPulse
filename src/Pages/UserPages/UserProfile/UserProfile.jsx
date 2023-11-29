import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UseAuth from "../../../Hooks/UseAuth";

const UserProfile = () => {
    const {user} = UseAuth();
  return (
    <div>
      <h2 className="text-center text-blue-600 font-bold font-2xl">
        User Profile
      </h2>
      <div className="flex justify-center items-center my-5">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt="User Picture"
            height="140"
            image={user?.photoURL}
          />
          <CardContent style={{ justifyContent: 'center' }}>
            <Typography gutterBottom variant="h5" component="div">
              Name: {user?.displayName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Email: {user?.email}
            </Typography>
          </CardContent>
          <CardActions style={{ justifyContent: 'center' }}>
            <Button variant="contained" size="small">Update</Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
