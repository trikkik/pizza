import React from "react"
import ContentLoader from "react-content-loader"

const Placeholder = (props) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="135" cy="135" r="125" /> 
    <rect x="0" y="290" rx="10" ry="10" width="280" height="25" /> 
    <rect x="0" y="326" rx="10" ry="10" width="280" height="88" /> 
    <rect x="0" y="428" rx="10" ry="10" width="95" height="30" /> 
    <rect x="123" y="426" rx="20" ry="20" width="152" height="45" />
  </ContentLoader>
)

export default Placeholder