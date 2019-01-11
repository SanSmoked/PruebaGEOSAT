import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import store from './store';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      act:0,
      index: '',
      datas:[]
    };

    store.subscribe(() =>{
      this.setState({
       datas: store.getState().datas,
       act:0
      });
    });
  }

  fSubmit(e){
    e.preventDefault();
 
    let index = this.state.index;
    let name = this.refs.name.value;
    let number = this.refs.number.value;
    let description = this.refs.description.value;

    

    if(this.state.act === 0){
     store.dispatch({
      type: "ADD_TO_DATAS",
      data: [{name,number,description}]
    });
    }else{
      store.dispatch({
        type: "EDIT_DATAS",
        index: index,
        data: [{name,number,description}]
      });
    }

    this.refs.myForm.reset();
  }

  fRemove(i){
    store.dispatch({
      type: "REMOVE_FROM_DATAS",
      index: i
    });
  }

  fEdit(i){
    let data = this.state.datas[i];
    this.refs.name.value = data.name;
    this.refs.number.value= data.number;
    this.refs.description.value = data.description;

    this.setState({
      act: 1,
      index: i
    })

    this.refs.name.focus();
  }

  render() {
    let datas = this.state.datas;
    return (
      <div>
         <nav className = "navbar navbar-dark bg-dark">
            <a href="#" className="text-white">
              Data
              <span className = "badge badge-pill badge-light ml-2">
                {this.state.datas.length}
              </span>
            </a>
          </nav>
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
              
        <form ref="myForm"  className="myForm">
          <input type="text" ref="name" placeholder="name" className="formField"/>
          <input type="number" ref="number" placeholder="cell number" className="formField"/>
          <input type="text" ref="description" placeholder="description" className="formField"/>
          <button onClick={(e)=>this.fSubmit(e)} type="button" class="btn btn-success">submit</button>              
        </form>
        <pre>
          {datas.map((data,i) =>
            <div className="col-md-3">
              <div className="card mt-4">
                <div className="card-header">
                  <h3>{data.name}</h3>
                </div>
                <div className="card-body">
                  <p>Number: {data.number}</p>
                  <p>Description: {data.description}</p>
                  <button onClick={()=>this.fRemove(i)} type="button" class="btn btn-danger">remove</button>
                  &nbsp;
                  <button onClick={()=>this.fEdit(i)} type="button" class="btn btn-warning">edit</button>
                </div>
              </div>
            </div>
          )}
        </pre>
        
      </div> 
      </div>
    );
  }
}

export default App;
