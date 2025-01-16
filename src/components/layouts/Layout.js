import React from 'react'

import Header from '../navigations/Header'
import Footer from '../navigations/Footer'

class Layout extends React.Component {
  render(){
    return (
      <>
        <Header />
          <main>{this.props.children}</main>
        <Footer />
      </>
    )
  }
}

export default Layout;