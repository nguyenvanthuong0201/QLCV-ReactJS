import React, { Component } from "react";

export default class TaskForm extends Component {
  
  constructor(props) {
    super(props);
    this.state={
      id:"",
      name:"",
      status:false,   
    }
  }
   componentWillMount(){
    if(this.props.taskEdit){
      this.setState({
        id:this.props.taskEdit.id,
        name:this.props.taskEdit.name,
        status:this.props.taskEdit.status
      })
    }
  }
  componentWillReceiveProps(next){
    if(next && next.taskEdit){
      this.setState({
        id:next.taskEdit.id, 
        name:next.taskEdit.name,
        status:next.taskEdit.status
      })
    }
  }

  onCloseForm=()=>{/// truyền button ra ngoài cha để đóng form
    this.props.onCloseForm(); 
  }
  onChange=(event)=>{   /// thay đổi trang thái
    let target=event.target
    let name=target.name;
    let value=target.value
    if(name==="status"){value=target.value==="true"?true:false}
    this.setState({
        [name]:value
    })
  } 

  onSubmit=(event)=>{  /// truyền dữ liệu ra ngoài cha
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.onClear();
    this.onCloseForm();
  }

  onClear=()=>{       //set mặc định
    this.setState({
      name:"",
      status:false
    })
  }

  render() {    
    let{id}=this.state;
    return (
      <div>
        <div>
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">{ id ?"Cập nhật công việc" : "Thêm công việc"}<button  className="fa fa-window-close text-right" style={{marginLeft:"50px"}} onClick={this.onCloseForm}></button></h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group" >
                  <label>Tên :</label>
                  <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange}/>
                </div>
                <label>Trạng Thái :</label>
                <select className="form-control" required="required" name="status" value={this.state.status} onChange={this.onChange}>
                  <option value={true}>Kích Hoạt</option>
                  <option value={false}>Ẩn</option>
                </select>
                <br />
                <div className="text-center">
                  <button type="submit" className="btn btn-warning ">
                    Thêm
                  </button>
                  &nbsp;
                  <button type="button" className="btn btn-danger" onClick={this.onClear}>
                    Hủy Bỏ
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
