import React from 'react'
import {useHistory} from 'react-router-dom';

 function Menus ({people}) {
    const [peoples, setpeople] = React.useState(null);


     React.useEffect(() => {
        const url = "http://192.168.0.61:8020/categorypost/categories";
        const response =  fetch(url);
        const data = response.json();
        setpeople(data.categoryposts);
     },
     []);
    return (
        <div>
              <div className="flex1">
            <div className="List">
              <h1 className="titles">Category List</h1>
            </div>
            <div className="card">
              {
              people.map(person => (
                <div key={person._id}>
                  <div className="cardItem" onClick={() => this.handleClick(person._id)}>
                    <div className="content">
                      <div className="FoNt">{person.categoryName}</div>
                      <div className="FoNt">{person.name}</div>
                      <div className="FoNt">{person.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    )
}

export default Menus;
