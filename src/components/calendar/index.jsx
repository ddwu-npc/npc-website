import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { Link } from "react-router-dom";

import Calendar from 'react-calendar';
import "./react-calendar.scss";

import { usePos } from "hooks";
import { getSchedule, addSchedule } from "api/schedule";

import Header from "components/commons/header";

import styles from "./style.module.scss";
import { Icon } from "@iconify/react";

export const loader = async ({ request }) => {
  const params = new URL(request.url).searchParams;
  
  const year = Number(params.get("year") ?? new Date().getFullYear());
  const month = Number(params.get("month") ?? new Date().getMonth() + 1);

  const schedule = await getSchedule(year, month);

  return { year, month, schedule };
}

export default () => {
  usePos("일정");
  const navigate = useNavigate();
  const { year, month, schedule } = useLoaderData();

  const move = (year, month) => {
    if (month > 12) return move(year+1, 1);
    if (month < 1) return move(year-1, 12);

    return `?year=${year}&month=${month}`;
  }

  return (
    <div>
      <Header text="일정" src="/" />
      <div className={styles.content}>
        <div className={styles.navigation}>
          <Link to={move(year, month-1)}>
            <Icon icon="cil:chevron-circle-left-alt" color="#BC8686"/>
          </Link>
          <div className={styles.label}>{year + "-" + String(month).padStart(2, "0")}</div>
          <Link to={move(year, month+1)}>
            <Icon icon="cil:chevron-circle-right-alt" color="#BC8686"/>
          </Link>
        </div>
        <Calendar 
          className={"npc_shedule_calendar"}
          minDetail={"month"}
          showNavigation={false}
          value={`${year}-${month}`}
          tileContent={({date}) => {
            return <span>{schedule[date.toDateString()]}</span>;
          }}
          onClickDay={(value) => {
            if (value.getMonth() + 1 != month) {
              navigate(move(value.getFullYear(), value.getMonth() + 1));
            }
          }}
        />
      </div>
    </div>
  );
};
