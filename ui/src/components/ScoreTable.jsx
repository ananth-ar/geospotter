import React from "react";
import styles from "../styles/ScoreTable.module.css";

function ScoreTable({ resultarray }) {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tablehead1}>Players</th>
              <th className={styles.tablehead2}>Points</th>
            </tr>
          </thead>
          <tbody>
            {resultarray.map((item, index) => (
              <tr className={styles.item} key={item.name}>
                <td className={styles.cell1}>
                  {index + 1}. &nbsp;
                  {item.name}
                </td>
                <td className={styles.cell2}>{item.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ScoreTable;
