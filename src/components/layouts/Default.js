import React from 'react';
import Header from 'components/common/Header';

const DefaultLayout = (props) => {

  return (
    <div className="layout--default">

      <Header />

      <div className="content">
        {/* this will render our page content */}
        { props.children }
      </div>

    </div>
  );

}

export default DefaultLayout;

