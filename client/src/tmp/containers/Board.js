import React, { Component } from "react";
import { useParams } from "react-router";

import Upper from "../../component/Board/Upper";
import Table from "../../component/Board/Table";

import styles from "../css/Forum/Forum.module.css";

import { getPostList } from "../../actions/board";

const Controller = () => {
  return <Board params={useParams().bid} />;
};

class Board extends Component {
  constructor(props) {
    super(props);

    const board_id = props.params;
    if (!board_id) board_id = 1;

    this.state = {
      board_id,
      page: 1,
      search: {
        range: null,
        search_range: null,
        word: null,
      },
      postList: [],
    };
  }

  updateState = (state) => {
    this.setState({
      ...this.state,
      ...state,
    });
  };

  render() {
    return (
      <div className={styles.Forum}>
        <Upper
          board_id={this.state.board_id}
          search={this.state.search}
          onSearch={(info) => {
            this.updateState({ search: { ...info } });
          }}
        />
        <Table postList={this.state.postList} />
      </div>
    );
  }

  componentDidMount() {
    getPostList(this.state.board_id, this.state.search, (postList) => {
      this.setState({ ...this.state, postList });
    });
  }
}

export default Controller;
