import React, { Component } from 'react';
import { Link } from "react-router-dom";

import styles from '../../css/Forum/Forum.module.css';

class Upper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            board_id: this.props.board_id,
            ... this.props.search,
        };
    }

    onSubmit = () => {
        const form = document.getElementById('searchForm');
        const range = form.querySelector('.view_scope').value; 
        const search_range = form.querySelector('.search_scope').value;
        const word = form.querySelector('.search').value;

        this.props.onSearch( { range, search_range, word } );
        console.log({ range, search_range, word });

        return false;
    }

    render() {
        return (
            <div className={styles.upper}>
                <Link to={"/newPost/"+this.state.board_id}>
                    <iconify-icon class={styles.post_icon} icon="bi:plus-square"></iconify-icon>
                    게시글 작성하기
                </Link>
                <form id="searchForm">
                    <select className={styles.view_scope} name="range">
                        { [ '전체', '임원', '팀장' ].map((e) => 
                            this.state.range === e
                                ? (<option value={e} selected>{e}</option>)
                                : (<option value={e}>{e}</option>)
                        )}
                    </select>
                    <select className={styles.search_scope} name="search_range">
                        { [ '제목', '내용', '제목+내용', '작성자' ].map((e) => 
                            this.state.search_range === e
                                ? (<option value={e} selected>{e}</option>)
                                : (<option value={e}>{e}</option>)
                        )}
                    </select>
                    <input className={styles.search} type="text" name="search" placeholder="search" value={this.state.word}></input>
                    <div className={styles.search_button} onClick={this.onSubmit}>
                        <input className={styles.button} type="button"></input>
                        <iconify-icon class={styles.search_icon} icon="akar-icons:search"></iconify-icon>
                    </div>
                </form>
            </div>
        );
    }
}

export default Upper;