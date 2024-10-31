// import React, { Component } from 'react'
import MainContent from "../../../components/MainContent/MainContent";
import Board from "./Board";
import styles from "./Game2.module.scss";

export default function Game2() {
  return (
    <MainContent title="">
      <div className={styles.game2}>
        {/* {" "} */}
        <Board />
      </div>
    </MainContent>
  );
}
