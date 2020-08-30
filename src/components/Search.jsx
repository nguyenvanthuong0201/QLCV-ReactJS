import React, { Component } from "react";

export default class Search extends Component {
    constructor(props) {
      super(props);
      this.state={
        keyWord:"",
      }
    }
    onChange=(event)=>{
        let target=event.target;
        let name =target.name;
        let value= target.value;
        this.setState({
          [name]:value,
        })
    }
    onSearch = ()=>{
        this.props.onSearch(this.state.keyWord)
    }

  render() {
    let {keyWord}=this.state

    return (
      <div>
        <div className="col-md-12">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Nhập từ khóa..."
              value={keyWord}
              name="keyWord"
              onChange={this.onChange}
            />
            <span className="input-group-btn">
              <button className="btn btn-primary" type="button" onClick={this.onSearch}>
                <span className="fa fa-search mr-5"></span>Tìm
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
