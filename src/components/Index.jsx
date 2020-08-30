import React, { Component } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import Control from "./Control";
import randomstring from "randomstring";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: [],
      isDisplayForm: false,
      taskEdit: null,
      filter: {
        name: "",
        status: -1,
      },
      keyWord: "",
      sortBy: "name",
      sortValue: 1
    };
  }
  clickData = () => {
    var generate = [
      {
        id: randomstring.generate(),
        name: "Học lập trình",
        status: true,
      },
      {
        id: randomstring.generate(),
        name: "Học lập trình ReactJS",
        status: false,
      },
      {
        id: randomstring.generate(),
        name: "Học lập trình VueJS",
        status: false,
      },
    ];
    this.setState({
      task: generate,
    });
    localStorage.setItem("task", JSON.stringify(generate));
  };
  componentWillMount() {
    if (localStorage && localStorage.getItem("task")) {
      let task = JSON.parse(localStorage.getItem("task"));
      this.setState({
        task: task,
      });

    }
  }
    clickTaskCongViec = () => {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEdit: null
      });
    };
    closeForm = () => {
      this.setState({
        isDisplayForm: false,
      });
    };
    openForm = () => {
      this.setState({
        isDisplayForm: true,
      });
    };
    onSubmit = (data) => {                  ///Thêm dữ liệu - data từ con truyền vào thì id:"", thì có thể xóa được...
      let { task } = this.state;
      if (data.id === "") {
        data.id = randomstring.generate();
        task.push(data);                 ///// đẩy dữ liệu Data và task
      }
      else {
        var index = this.findIndex(data.id);                      ///////edit dữ liệu 
        task[index] = data;
      }
      this.setState({
        task: task,
        taskEdit: null
      });
      localStorage.setItem("task", JSON.stringify(task));
    };
    onUpdateStatus = (id) => {                                // Click sửa và đổi màu theo vị trí 
      var { task } = this.state;
      var index = this.findIndex(id);                                ///findIndex: tìm vị trí id
      if (index !== -1) {
        task[index].status = !task[index].status;
        console.log(task[index].status);
        this.setState({
          task: task,
        });
        localStorage.setItem("task", JSON.stringify(task));

      }

    };
    onDelete = (id) => {                                            ///xóa 1 Task list bằng ID
      var { task } = this.state;
      var index = this.findIndex(id);                            ///findIndex: tìm vị trí id
      if (index !== -1) {
        task.splice(index, 1);                                  ///splice là xóa 1(1) hàng vị trí inxdex
        // console.log(task[index].status);                     ///consolog là báo lỗi liền ấy
        this.setState({
          task: task,
        });
        localStorage.setItem("task", JSON.stringify(task));
      }
    }

    findIndex = (id) => {                                       ///Tìm vị trí của ID
      var { task } = this.state;
      var result = -1;
      task.forEach((tasks, index) => {
        if (tasks.id === id) {
          result = index;
        }
      });
      return result;
    };

    onFilter = (filterName, filterStatus) => {
      filterStatus = parseInt(filterStatus, 10);                 /// chuyển đỗi dữ liệu từ String sang Number
      this.setState({
        filter: {
          name: filterName.toLowerCase(),
          status: filterStatus,
        }
      })

    };
    onSearch = (keyWord) => {
      // console.log(keyWord)      ///// gọi keyWord lấy từ thằng con sang cha
      this.setState({
        keyWord: keyWord.toLowerCase(),
      })
    };
    onSort = (sortBy, sortValue) => {
      this.setState({
        sortBy: sortBy,
        sortValue: sortValue,
      })
    };

    render() {
      let { task, isDisplayForm, taskEdit, filter, keyWord, sortBy, sortValue } = this.state;   /// dùng trong Index  thì phải khai báo lên state và function trưc thuộc nó mới có sự thay đỗi
      // console.log(filter);

      {
        if (filter.name) {
          task = task.filter((task) => {                           //dùng filter để trả về 1 cái task khác 
            return task.name.toLowerCase().indexOf(filter.name) !== -1;     /// chuyển chuỗi (task.name)về thường và đặt điều kiện nếu nó ===1 thì không tìm thấy                                                         
          })
        }
        task = task.filter((task) => {
          if (filter.status === -1) {                    /// -1 là tất cả nên trả về lại task
            return task;
          }
          else {
            return task.status === (filter.status === 1 ? true : false)    /// trả về true / false 
          }
        })
      }
      if (keyWord) {                                                  ////Search theo key word 
        task = task.filter((task) => {
          return task.name.toLowerCase().indexOf(keyWord) !== -1;
        })
      }
      ///sort giá trị trong mãng
      if (sortBy === "name") {
        task.sort((a, b) => {
          if (a.name > b.name) return sortValue
          else if (a.name < b.name) return -sortValue
          else return 0;
        })
      }
      else {
        task.sort((a, b) => {
          if (a.status > b.status) return -sortValue
          else if (a.status < b.status) return sortValue
          else return 0;
        })
      }
      let elmTaskForm = isDisplayForm ? (
        <TaskForm
          onSubmit={this.onSubmit} // nhận dữ liệu đưa về từ con
          onCloseForm={this.closeForm}
          taskEdit={taskEdit}
        />
      ) : (
          ""
        ); // nhận dữ liệu đưa về từ con

      return (
        <div>
          <div>
            <div>
              <div className="container">
                <div className="text-center">
                  <h1>Quản Lý Công Việc </h1>
                  <h6>(by <b>ThuongNguyen</b>)</h6>
                  <hr />
                </div>
                <div className="row">
                  <div
                    className={
                      isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""
                    }
                  >
                    {elmTaskForm}
                  </div>
                  <div
                    className={
                      isDisplayForm
                        ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                        : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
                    }
                  >
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={this.clickTaskCongViec}
                    >
                      <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                  </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={this.clickData}
                    >
                      <span className="fa fa-plus mr-5"></span>Dữ liệu mẫu
                  </button>
                    <Control onSearch={this.onSearch}
                      onSort={this.onSort}
                      sortBy={sortBy}
                      sortValue={sortValue} />
                    <div className="row mt-15">
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <TaskList
                          task={task}
                          onUpdateStatus={this.onUpdateStatus}
                          onDelete={this.onDelete}
                          onUpdate={this.onUpdate}
                          onFilter={this.onFilter}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }