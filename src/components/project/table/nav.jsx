import { Icon } from "@iconify/react";

import styles from "./style.module.scss";

export default ({ cur, max, setPage }) => {
  const move = (page) => {
    if (page > 0 && page <= max) setPage(page);
  };

  const nums = [];

  const numToShow = 5; // 표시할 페이지 수
  const halfToShow = Math.floor(numToShow / 2); // 현재 페이지가 가운데에 오도록
  
  let startPage = 1;
  if (max > numToShow) {
    startPage = Math.min(max - numToShow + 1, Math.max(1, cur - halfToShow));
  }

  for (let i = startPage; i < startPage + numToShow && i <= max; i++) {
    nums.push(
      <div
        key={`board_table_nav_${i}`}
        onClick={() => move(i)}
        className={cur === i ? styles.cur : ""}
      >
        {i}
      </div>
    );
  }

  return (
    <div className={styles.nav}>
      <Icon
        icon="solar:round-double-alt-arrow-left-linear"
        onClick={() => move(1)}
        style={cur === 1 ? { color: "#B1B1B1", cursor: "default" } : null}
      />
      <Icon
        icon="solar:round-alt-arrow-left-linear"
        onClick={() => move(cur - 1)}
        style={cur === 1 ? { color: "#B1B1B1", cursor: "default" } : null}
      />
      <div className={styles.nums}>{nums}</div>
      <Icon
        icon="solar:round-alt-arrow-right-linear"
        onClick={() => move(cur + 1)}
        style={cur === max ? { color: "#B1B1B1", cursor: "default" } : null}
      />
      <Icon
        icon="solar:round-double-alt-arrow-right-linear"
        onClick={() => move(max)}
        style={cur === max ? { color: "#B1B1B1", cursor: "default" } : null}
      />
    </div>
  );
};
