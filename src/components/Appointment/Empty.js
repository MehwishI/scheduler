import React from 'react';
import PropTypes from 'prop-types';

export default function Empty(props) {
  console.log("props.onAdd:",props.onAdd)
  return (
    
    <main className="appointment__add" >
      <img
        
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}

      />
    </main>
  );

};
Empty.propTypes = {
  onAdd: PropTypes.func,
};


