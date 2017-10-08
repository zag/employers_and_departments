'use strict';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/modules/actions';
import Modal from 'react-modal'


const customStyles = {
    overlay : {
      position          : 'fixed', 
      backgroundColor   : 'rgba(255, 255, 255, 0.75)',
      backgroundColor   : 'rgba(55, 55, 55, 0.6)',
      'overflow-y'      : 'hidden'
    },
    content : {
      top                   : '50%',
      left                  : '50%', 
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      'overflow-y'      : 'hidden'
    }
  };
  
@connect ( state => ({data:state.actions}), {...Actions} )
export default class  Employers extends Component {
    constructor(props) {
        super(props);
        this.state = {
          EditIsOpen : false,
          newIsOpen  : false,
        };
    }
    componentDidMount() {
        // this.props.getPosts();
      }
    openModal = (e)=>{
        e.preventDefault();
        this.setState({newIsOpen: true})
     }
     openEditModal = (e)=>{
        e.preventDefault();
        this.setState({EditIsOpen: true})
     }
     
     closeModal = (e) =>{
         e.preventDefault();
         this.setState({newIsOpen: false, EditIsOpen: false})

     }
     onSubmitCreate = (e) => {  
        if ( e ) {
          e.preventDefault();
          e.stopPropagation();
          let attr = {};
          
          attr.firstName = this.refs.firstName.value.trim();
          attr.lastName = this.refs.lastName.value.trim();
          attr.departmentId = this.refs.departmentId.value.trim();
          this.props.SetEmployers([ ...this.props.data.employers, attr])
          this.refs.name =
          this.refs.age =
          this.refs.phone =
          this.refs.email = '';
          this.closeModal(e)
          }
      }

      onSubmitEdit = (e,id) => {  
        if ( e ) {
          e.preventDefault();
          e.stopPropagation();
          let attr = {};
          
          attr.firstName = this.refs.firstName.value.trim();
          attr.lastName = this.refs.lastName.value.trim();
          attr.departmentId = this.refs.departmentId.value.trim();
          let new_list = [ ...this.props.data.employers]
          new_list[id] = attr;
          this.props.SetEmployers(new_list)
          this.refs.name =
          this.refs.age =
          this.refs.phone =
          this.refs.email = '';
          this.closeModal(e)
          }
      }
    onSetDelete = (e, id) => { 
        if(confirm("Delete item for: " + this.props.data.employers[id].firstName + "?")) 
                { let new_list = [ ...this.props.data.employers]; new_list.splice( id, 1);this.props.SetEmployers(new_list)} 
             }

  
    render_item (attr, key){
        
    return  (<tr key={key} ><td>
    <Modal
      className="Modal__Bootstrap modal-dialog"
      isOpen={this.state.EditIsOpen}
      closeTimeoutMS={150}
      onRequestClose={this.closeModal}
      __style={customStyles} 
      contentLabel="Modal">
       <h3>New Person entry</h3>
        <form onSubmit={this.onSubmit}>

        <div className="form-group">
        <input type="text" className="form-control" ref="firstName" placeholder="firstName, i.e. Pavel" defaultValue={attr.firstName}/>
      </div>
      <div className="form-group">
        <input type="text" className="form-control" ref="lastName" placeholder="lastName, i.e. Ivanov" defaultValue={attr.lastName}/>
      </div>
      <div className="form-group">
        <input type="number" className="form-control" ref="departmentId" placeholder="departmentId, i.e. 23" defaultValue={attr.departmentId}/>
      </div> 
         <button type="submit" onClick={(e)=>{ this.onSubmitEdit(e, key) } } className="btn btn-default">Submit</button>
        </form>
    </Modal> 
    {attr.firstName}</td>
    <td>{attr.lastName}</td>
    <td>{attr.departmentId}</td>
    <td>
       <button onClick={(e)=>{ this.onSetDelete(e,key)}} type="button" className="btn btn-default btn-xs" aria-label="Left Align">
<span className="glyphicon glyphicon-remove" aria-hidden="true"></span> 
</button>
       <button onClick={this.openEditModal} type="button" className="btn btn-default btn-xs" aria-label="Left Align">
<span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> 
</button>
    </td>
</tr>)
;
        // this.props.posts.data.map(

        // )
        return (<h1>Employers</h1>)
    }
    render () {
        let items = this.props.data.employers; 
        let PersonItems = [];
        items.forEach( (item, index, array) => {
                  PersonItems.push( this.render_item(item,index));
        }) 
        console.log(items);
        return <div className="panels">
        <h2>Employers list</h2>
            <Modal
              className="Modal__Bootstrap modal-dialog"
              isOpen={this.state.newIsOpen}
              closeTimeoutMS={150}
              onRequestClose={this.closeModal}
              __style={customStyles} 
              contentLabel="Modal"
              >
    
              <h3>New Employer entry</h3>
    <form onSubmit={this.onSubmit}>
      <div className="form-group">
        <input autoFocus type="text" className="form-control" ref="firstName" placeholder="firstName, i.e. Pavel"/>
      </div>
      <div className="form-group">
        <input type="text" className="form-control" ref="lastName" placeholder="lastName, i.e. Ivanov"/>
      </div>
      <div className="form-group">
        <input type="number" className="form-control" ref="departmentId" placeholder="departmentId, i.e. 23"/>
      </div> 
     <button type="submit" onClick={this.onSubmitCreate} className="btn btn-default">Submit</button>
    
    
    </form>
            </Modal> 
        <table className="table table-striped table-hover"> 
          <thead>
           <tr>
            <th>firstName</th>
            <th>lastName</th> 
            <th>departmentId</th>
            <th></th>
            </tr>
          </thead>
          <tbody> 
          {PersonItems}
          </tbody> 
        </table>
               <div className="clear"></div>
        <form> 
        <button onClick ={this.openModal} type="button" className="btn btn-default" aria-label="Left Align">
      <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Person
    </button>
        </form> 
        </div>; 
      }
    
}