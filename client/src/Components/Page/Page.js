import React from 'react'
import Navbar from '../navbar/navbar'


class Page extends React.Component {

   render() {
           if (!this.state.loaded ) {
               return "loading"
       }

       return (
           <div className="webpage">
                   <Navbar />
           </div>
       )
   }
}
export default Page


