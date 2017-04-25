import React, { Component } from 'react';
import {View,ListView,Alert} from 'react-native';
import HandleListOfUser from './handleListOfUser.js';
var userApi = 'https://api.myjson.com/bins/o4zz3';
var userlist = [];

class ListOfUser extends Component {

	constructor(props){
		super(props);

		fetch(userApi)
	  .then( (response) => {
	    return response.json()
	  })   
	  .then( (json) => {
	  	userlist = json;
	  	this.setState({
	  		dataSource: ds.cloneWithRows(userlist)    
	  	})
	  })

		const ds = new ListView.DataSource({
			rowHasChanged : (r1,  r2) => alert('row has changed')
		});

		this.state = {
		 	dataSource: ds.cloneWithRows(userlist)                                                                                                                              
		};
	}

	removeUser(){

    userlist.forEach(function(car, index){

      if(car.UserID ){
       	var rmUser = userlist.slice(index,1);
       	userlist.pop(rmUser);
       	console.log(rmUser, 'rmUser')
       	console.log(userlist, 'userlist')
       	fetch(userApi, {  
        	method: 'PUT',
        	headers: {
	          'Accept': 'application/json',
	          'Content-Type': 'application/json',
        	},
        body: JSON.stringify(userlist)
      }).then(function(){
      	console.log(userlist, 'deleted')
        	Alert.alert(
            'Done',
            'Successfully deleted user'
          )
        }.bind(this));
      }
    }.bind(this));
  }

	render(){
		return (
		  <View>
		    <HandleListOfUser dataSource={this.state.dataSource} removeUser={this.removeUser}/> 
		  </View>     
		)
	}
}

export default ListOfUser;