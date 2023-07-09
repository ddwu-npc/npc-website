import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";

import Calendar from 'react-calendar';

import { usePos } from "hooks";
import { getSchedule, addSchedule } from "api/schedule";

export const loader = async ({ request }) => {
  const params = new URL(request.url).searchParams;
  
  const year = params.get("year") ?? new Date().getFullYear();
  const month = params.get("month") ?? new Date().getMonth()+1;

  return {
    year, month,
    schedules: await getSchedule(year, month)
  }
}

export default () => {
  usePos("일정");
  const navigate = useNavigate();
  let { year, month, schedules } = useLoaderData();

  return (
    <div>
      <p>
        * 구현해놨던 파일을 잃어버려서 찾으면 그거로 연결될 예정.. 못찾으면 다시 구현
      </p>
      year: {year} <br/>
      month: {month} <br/>
      schedules: {JSON.stringify(schedules)} <br/>

      <input type="button" value="이전 달로" 
        onClick={() => {
          month = Number(month) - 1;
          if(month < 0) {
            month = 12;
            year = Number(year) - 1;
          }
          navigate(`/calendar?year=${year}&month=${month}`);
        }}/>
      <input type="button" value="다음 달로" 
        onClick={() => {
          month = Number(month) + 1;
          if(month > 12) {
            month = 1;
            year = Number(year) + 1;
          }
          navigate(`/calendar?year=${year}&month=${month}`);
        }}/>
      <br/><br/><br/>
      <input type="date"/>
      <input type="text"/>
      <input type="button" value="생성"
        onClick={async () => {
          const date = document.querySelector('[type="date"]').value;
          const content = document.querySelector('[type="text"]').value;
          
          if(await addSchedule({date, content})) alert("생성됨");
          else alert("일정 생성에 실패했습니다\n이 현상이 반복되면 관리자에게 문의하세요.");
        }}/>
    </div>
  );
};
