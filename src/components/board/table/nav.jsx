import { Icon } from "@iconify/react";

import styles from "./style.module.scss";

export default ({ cur, max, setPage }) => {
  const move = (page) => {
    if (page > 0 && page <= max) setPage(page);
  };

  const nums = [
    <div key={`board_table_nav_0`} className={styles.cur}>
      {cur}
    </div>,
  ];
  for (let i = cur - 1; i > 0 && nums.length < 5; i--) {
    nums.unshift(
      <div key={`board_table_nav_${nums.length}`} onClick={() => move(i)}>
        {i}
      </div>
    );
  }
  for (let i = cur + 1; i <= max && nums.length < 5; i++) {
    nums.push(
      <div key={`board_table_nav_${nums.length}`} onClick={() => move(i)}>
        {i}
      </div>
    );
  }

  return (
    <div className={styles.nav}>
      <Icon
        icon="solar:round-double-alt-arrow-left-linear"
        onClick={() => move(1)}
        style={
          cur === 1 && {
            color: "#B1B1B1",
            cursor: "default",
          }
        }
      />
      <Icon
        icon="solar:round-alt-arrow-left-linear"
        onClick={() => move(cur - 1)}
        style={
          cur === 1 && {
            color: "#B1B1B1",
            cursor: "default",
          }
        }
      />
      <div className={styles.nums}>{nums}</div>
      <Icon
        icon="solar:round-alt-arrow-right-linear"
        onClick={() => move(cur + 1)}
        style={
          cur === max && {
            color: "#B1B1B1",
            cursor: "default",
          }
        }
      />
      <Icon
        icon="solar:round-double-alt-arrow-right-linear"
        onClick={() => move(max)}
        style={
          cur === max && {
            color: "#B1B1B1",
            cursor: "default",
          }
        }
      />
    </div>
  );
};
