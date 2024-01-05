export function getProcessColor(process) {
    switch (process) {
      case "개발 완료":
        return "#9c9c9c"; 
      case "개발 중":
        return "#4cd964";
      default:
        return "#ffffff"; 
    }
};