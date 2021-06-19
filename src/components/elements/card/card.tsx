import React from "react";
import classes from "./card.module.scss";

const Card = (props: IData) => {
  return (
    <div id={props.id} className={classes.card}>
      <div className={classes.img}>
        <img src={props.avatar} alt="pictures"></img>
      </div>
      <div className={classes.content}>
        <h6>
          {props.first_name} {props.last_name}
        </h6>
        <p>{props.email}</p>
      </div>
    </div>
  );
};

export default Card;
