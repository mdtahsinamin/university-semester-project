import { Avatar, Rating } from "@mui/material";
import { Fragment } from "react";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */
  return color;
}

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5
  };
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name)
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
    };
  }
  return (
    <Fragment>
      <div className="reviewCard">
        <Avatar sx={{ width: 50, height: 50 }} className="mb-3" {...stringAvatar(review.name)} />
        <h6>{review.name}</h6>
        <Rating {...options} />
        <span className="reviewCardComment">{review.comment}</span>
      </div>
    </Fragment>
  );
};

export default ReviewCard;
