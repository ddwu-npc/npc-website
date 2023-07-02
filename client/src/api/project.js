export const getProjectList = (search) => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve([
            { 
                pid: 1,
                pname: "NPC 정기 회의",
                type: "팀"
            },
            { 
                pid: 2,
                pname: "컬러미",
                type: "팀"
            },
            { 
                pid: 3,
                pname: "후엠유",
                type: "팀"
            },
        ]);
      }, 100)
    );
  };
  