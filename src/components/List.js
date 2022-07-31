import React from "react";
import ListItem from "./ListItem";
import styles from "./List.module.css"

function List(props) {
  let { items } = props;
  

  return (
    <>
    <div className={styles.heading}>
        <div className={styles.hName}>Name</div>
        <div className={styles.hDept}>Department</div>
    </div>
      {items.map((item, index) => (
        <ListItem key={index} item={item}/>
      ))}
    </>
  );
}

export default List;
