import React, { Component } from "react";
import TaskItem from "./TaskItem";


export default class TaskList extends Component {
    constructor(props) {
      super(props);
      this.state={
        filterName:"",
        filterStatus:-1 ,          /// tất cả là -1 , active : 1 , deactive: 0;
      }
    }
    
    onChangeTaskList=(event)=>{
       let target=event.target;
       let name=target.name;
       let value = target.value;     /// lấy dự liệu nhập vô đẩy ra cho index( cha)
       this.props.onFilter(            
        name==="filterName"? value : this.state.filterName,
        name==="filterStatus"? value : this.state.filterStatus
       )
       this.setState({
         [name]:value,
       })
    }

  render() {
    let { task } = this.props;                      /// gọi từ index(cha) sang                  
    let{filterName,filterStatus}=this.state;        // trong thư mục TaskList
    let elmTask = task.map((task, index) => {//   Dùng vòng lập để danh sách ra truyền vào TaskItem
      return (
        <TaskItem
          task={task}
          index={index}
          key={index}                                         ///truyền dữ liệu sang task Item
          onUpdateStatus={this.props.onUpdateStatus}
          onDelete={this.props.onDelete}
          onUpdate={this.props.onUpdate}
        />  
      ); 
    });
    return (
      <div>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th className="text-center">Tên</th>
              <th className="text-center">Trạng Thái</th>
              <th className="text-center">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input type="text" className="form-control" name="filterName" value={filterName} onChange={this.onChangeTaskList}/>
              </td>
              <td>
                <select className="form-control" name="filterStatus" value={filterStatus} onChange={this.onChangeTaskList}>
                  <option value={-1}>Tất Cả</option>
                  <option value={0}>Ẩn</option>
                  <option value={1}>Kích Hoạt</option>
                </select>
              </td>
              <td></td>
            </tr>
            {elmTask}
          </tbody>
        </table>
      </div>
    );
  }
}
