import React, { Component } from "react";

export default class TaskItem extends Component {
  onUpdateStatus = () => {
    this.props.onUpdateStatus(this.props.task.id); /// truyền ID từ con ra  Index..
  };
  onDelete = () =>{
      this.props.onDelete(this.props.task.id);
  }
  onUpdate = ()=>{
      this.props.onUpdate(this.props.task.id)
  }

  render() {
    let { task, index } = this.props;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{task.name}</td>
        <td className="text-center">
          <span
            className={
              task.status === true
                ? "badge badge-success"
                : "badge badge-danger"
            }
            onClick={this.onUpdateStatus} ///Click truyền thuộc tính ra
          >
            {task.status === true ? "Kích Hoạt" : "Ẩn "}
          </span>
        </td>
        <td className="text-center">
          <button type="button" className="btn btn-warning" onClick={this.onUpdate}>
            <span className="fa fa-edit mr-5"></span>Sửa
          </button>
          &nbsp;
          <button type="button" className="btn btn-danger" onClick={this.onDelete}>
            <span className="fa fa-trash mr-5"></span>Xóa
          </button>
        </td>
      </tr>
    );
  }
}
