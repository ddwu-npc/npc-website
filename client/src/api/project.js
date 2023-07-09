// 프로젝트 - 출석 DB 어떻게 작성할 건지, 어떻게 구현되는지 정리해서 전달주시면 맞춰서 수정할 예정
// 추가로 필요한 것
// 1. user의 point 얻고 잃었던 기록 [{날짜, 내용, 변경된 포인트(+4 / -4), 합계}, ...]

// 의논 필요
// 1. 출석을 project가 아니라 schedule로 묶는 것도 한번 고려해보기 (더 적절하다 싶은 걸로 진행해주세요) 

export const getProjectList = (search) => {
  // search
  // type: 0 전체, 1 팀 2 개인
  // process: 0 전체, 1 개발중, 2 개발완료

  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
          { 
            // 필요 정보를 정리해 둠. 
            // string or int 형 / 칼럼 통합 or 분리 자유롭게 변형 가능
            // '개발 완료' 등 값의 종류/이름 등 의논해서 변경 가능
            pid: 1,
            pname: "NPC 정기 회의",
            type: "팀", // 팀 or 개인
            tname: "[NAME]", // 팀 이름 or 유저 이름
            process: "개발 중", // 개발 완료, 개발 중
            period: "2023-07-01 ~ 2023-08-31"
          },
          { 
            pid: 2,
            pname: "컬러미",
            type: "팀",
            tname: "[NAME]",
            process: "개발 중",
            period: "2023-07-01 ~ 2023-08-31"
          },
          { 
            pid: 3,
            pname: "후엠유",
            type: "팀",
            tname: "[NAME]",
            process: "개발 중",
            period: "2023-07-01 ~ 2023-08-31"
          },
      ]);
    }, 100)
  );
};

export const getProjectInfo = (pid) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        pid: 2,
        pname: "컬러미",
        type: "팀",
        tname: "[NAME]",
        process: "개발 중",
        period: "2023-07-01 ~ 2023-08-31",
        description: "불라불라불라", // 게시글과 같이 markdown 식으로 정리할 까 생각 중
        member: [1, 2, 3], // userId list
      });
    }, 100)
  );
}

export const getQuickAttendance = (pid) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(1); // project에서 현재 생성되어 있는 출석의 id를 가져옴
    }, 100)
  );
};

export const deleteProject = (pid) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, 100)
  );
};
