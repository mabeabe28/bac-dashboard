import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withGoogleSheets } from 'react-db-google-sheets';
import FadeIn from 'react-fade-in';





const Hello = props => {
    console.log('props',props);
    
  const [search, setSearch] = useState(null);

  const searchSpace = (e) => {
    let keyword = e.target.value;
    setSearch(keyword);
  } 
  
    return(
      <div>
        <div className="search">
          <input  type="text" placeholder="Search..."  onChange={(e)=>searchSpace(e)} />
        </div>

        <FadeIn className="grid" childClassName="item">
        {props.db['Form Responses 1']
          .filter((data)=>{
            if(search == null)
                return data
            else if(
              data['Name (Full Name if possible)'] !== null && data['Name (Full Name if possible)'].toLowerCase().includes(search.toLowerCase()) 
              || data['Career/Industry'] !== null && data['Career/Industry'].toLowerCase().includes(search.toLowerCase())
              || data['Creative Interests/Skills '] !== null && data['Creative Interests/Skills '].toLowerCase().includes(search.toLowerCase())
              ){
                return data
            }
          })
          .map((data,key) => {
            
            if(!data['Name (Full Name if possible)']){
              return;
            }
            return(
              <div className="content" key={key}>
              <div className="content-wrapper" key={key}>
                <div className="name">{data['Name (Full Name if possible)']}</div>
                <div className="career">{data['Career/Industry']}</div>
                <div className="social">{data['Social Media Handles ']}</div>
                {/*<div className="other">{data['Other Links to Work/Projects']}</div>*/}
              </div>
              </div>
          )}
          
          )}

        </FadeIn>
        
      </div>
       
      );

}

Hello.propTypes = {
  db: PropTypes.shape({
    sheet1: PropTypes.arrayOf(PropTypes.object)
  })
};

export default withGoogleSheets('Form Responses 1')(Hello);
