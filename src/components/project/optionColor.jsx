export function getProcessColor(process) {
    switch (process) {
      case "개발 완료":
        return "#f1f0ef"; 
      case "개발 중":
        return "#dbefdb";
      default:
        return "#ffffff"; 
    }
};