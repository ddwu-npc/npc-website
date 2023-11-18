const socket = new WebSocket('ws://localhost:8080/ws'); 

// 출석 생성 요청 메시지
const createAttendanceRequest = {
    action: 'createAttendance', // 예: 서버에서 어떤 동작을 수행할지 식별하기 위한 액션
    // 다른 요청 데이터 추가
  };
  
  // 출석 확인 요청 메시지
  const checkAttendanceRequest = {
    action: 'checkAttendance', // 예: 서버에서 어떤 동작을 수행할지 식별하기 위한 액션
    attendanceCode: '입력한출석코드' // 실제로 입력한 출석 코드
  };
  
  // WebSocket 연결이 열릴 때
  socket.onopen = function(event) {
    console.log('WebSocket 연결이 열렸습니다.');
  
    // 출석 생성 요청을 보냅니다.
    socket.send(JSON.stringify(createAttendanceRequest));
  };
  
  // 서버로부터 메시지를 받을 때
  socket.onmessage = function(event) {
    const message = JSON.parse(event.data);
    console.log('서버로부터 메시지 수신:', message);
  
    // 메시지를 처리하고 결과에 따라 출석 확인 요청을 보낼 수 있습니다.
    // 예: if (message.action === 'attendanceCreated') {
    //       socket.send(JSON.stringify(checkAttendanceRequest));
    //     }
  };
  
  // WebSocket 연결 오류 시
  socket.onerror = function(error) {
    console.error('WebSocket 오류 발생:', error);
  };
  
  // WebSocket 연결이 닫힐 때
  socket.onclose = function(event) {
    if (event.wasClean) {
      console.log('WebSocket 연결이 정상적으로 닫힘.');
    } else {
      console.error('WebSocket 연결이 오류로 닫힘.');
    }
  };
  