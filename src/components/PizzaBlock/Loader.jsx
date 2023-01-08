import React from "react"
import ContentLoader from "react-content-loader"

const Loader = (props) => (
    <ContentLoader className="pizza-block"
        speed={2}
        width={280}
        height={460}
        viewBox="0 0 280 460"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="139" cy="122" r="121" />
        <rect x="3" y="255" rx="10" ry="10" width="280" height="26" />
        <rect x="11" y="301" rx="10" ry="10" width="259" height="87" />
        <rect x="7" y="411" rx="10" ry="10" width="93" height="37" />
        <rect x="149" y="412" rx="15" ry="15" width="123" height="36" />
    </ContentLoader>
)

export default Loader