import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

import { getBName } from "../../actions/board";
import { readPost, readComment, createComment } from "../../actions/post";

import PostView from "../../component/Post/PostView";
import PostEdit from "../../component/Post/PostEdit";

import styles from "../css/Post/Post.module.css";

const Controller = () => {
  return <Post params={useParams().pid} />;
};

class Post extends Component {
  constructor(props) {
    super(props);
    const post_id = props.params;

    this.state = {
      board_id: null,

      post_id,
      edit: false,
    };
  }

  changeEdit = () => {
    this.setState({
      ...this.state,
      edit: !this.state.edit,
    });
  };

  render() {
    return (
      <div className={styles.Post}>
        <div className={styles.top}>
          <Link to={"/board/" + this.state.board_id}>
            <iconify-icon icon="ep:arrow-left" />
          </Link>
          <div className={styles.text}>{this.state.bname}</div>
        </div>
        {this.state.edit ? (
          <PostEdit type="update" postId={this.state.post_id} />
        ) : (
          <PostView edit={this.changeEdit} postId={this.state.post_id} />
        )}
      </div>
    );
  }

  componentDidMount() {
    readPost(this.state.post_id, (post) => {
      getBName(post.board_id, (bname) => {
        this.setState({ ...this.state, board_id: post.board_id, bname });
      });
    });
  }
}

export default Controller;
