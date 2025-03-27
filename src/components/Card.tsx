import CardProps from "@/types/CardProps";
import React from "react";
// import styles from "@/styles/Card.module.css";

const Card: React.FC<CardProps> = ({ name }) => {
  return <h1>{name}</h1>;
};

export default Card;
