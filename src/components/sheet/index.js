import React from 'react';
import PropTypes from 'prop-types';
import { withGoogleSheets } from 'react-db-google-sheets';

const Hello = props => {
    console.log('props',props)
    return(
        <div className="grid">
          {props.db['Form Responses 1'].map((data,key) => {
            
            
            if(!data['Name (Full Name if possible)']){
              return;
            }
            return(
            <div className="item" key={key}>
              <div className="content">
                <div>{data['Name (Full Name if possible)']}</div>
              </div>
            </div>
          )}
          
          )}
        </div>
      );

}

Hello.propTypes = {
  db: PropTypes.shape({
    sheet1: PropTypes.arrayOf(PropTypes.object)
  })
};

export default withGoogleSheets('Form Responses 1')(Hello);
