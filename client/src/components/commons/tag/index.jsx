export default ({ text, color }) => {
    return (
        <div style={{
            height: "32px",
            background: color,
            borderRadius: "5px",
            padding: "0 10px",
            lineHeight: "32px",
            color: "#505050",
            fontFamily: "Noto Sans",
            fontSize: "14px",
            fontWeight: 600,
        }}>
            {text}
        </div>
    )
};