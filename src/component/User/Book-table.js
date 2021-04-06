import React, { Component } from 'react';
import './Book-table.css';

class BookTable extends Component {
    render(){
        return(
            <div>
              <input type="text" name="email"  placeholder="username" onChange={e => setUserName(e.target.value)} />
            </div>
        )
    }
}

export default BookTable;