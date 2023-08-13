import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";

import Calendar from 'react-calendar';
import "./react-calendar.scss";

import { usePos } from "hooks";
import { getSchedule, addSchedule } from "api/schedule";

import Header from "components/commons/header";

export const loader = async ({ request }) => {
  // const params = new URL(request.url).searchParams;

  // return {
  //   schedules: await getSchedule(year, month)
  // }
  return {};
}

export default () => {
  usePos("일정");

  return (
    <div>
      <Header text="일정" src="/" />
      <Calendar 
        className={"npc_shedule_calendar"}
        minDetail={"month"}
        tileContent={({date, view}) => {
          if (date.getDay() === 4) return <span>💛 전체 회의</span>;
          return null;
        }}
      />
    </div>
  );
};
