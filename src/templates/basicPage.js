import React from "react";
import styles from "./basicPage.module.css";

export default function BasicPage(props) {
  return (
    <>
      <h1>A basic page called {props.hello}</h1>
      <div className={styles.testingcss} data-sb-field-path=".meta.message">I am basic, but I can tell you:  {props.meta.message}</div>
    </>
  );
}