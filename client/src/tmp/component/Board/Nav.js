import styles from '../../css/Forum/Forum.module.css';

const Nav = ({ changePage, curPage, totalPage }) => {
    const pageNums = [];
    pageNums.push(<b>{curPage}</b>);
    
    for(let i = 1; pageNums.length < 5 && pageNums.length < totalPage; i++) {
        if(curPage - i > 0) pageNums.unshift(<span onClick = {() => {changePage(curPage-i)}}>{curPage-i}</span>);
        if(curPage + i <= totalPage) pageNums.push(<span onClick = {() => {changePage(curPage+i)}}>{curPage+i}</span>);
    }

    return (
        <div className={styles.nav}>
            <img onClick = {() => {changePage(curPage-5)}}
                className={styles.front} src="/Forum/nav_btn2.png"/>
            <img onClick = {() => {changePage(curPage-1)}}
                className='before' src="/Forum/nav_btn1.png"/>
            <div className={styles.page}>
                {pageNums}
            </div>
            <img onClick = {() => {changePage(curPage+1)}}
                className={styles.after}src="/Forum/nav_btn1.png"/>
            <img 
                onClick = {() => {changePage(curPage+5)}}
                className={styles.last} src="/Forum/nav_btn2.png"/>
        </div>
    );
}

export default  Nav;