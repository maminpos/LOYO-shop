import ContentLoader from "react-content-loader"

function Skeleton() {
    return(
        <ContentLoader
            style={{marginLeft: '60px', marginBottom: '20px', boxShadow: '0px 9px 15px 3px rgba(34, 60, 80, 0.1)'}}
            speed={3}
            width={470}
            height={720}
            viewBox="0 0 470 720"
            backgroundColor="#f3f3f3"
            foregroundColor="#e6e6e6">
            <rect x="10" y="10" rx="4" ry="4" width="450" height="590" />
            <rect x="10" y="610" rx="5" ry="5" width="130" height="30" />
            <rect x="10" y="650" rx="7" ry="7" width="250" height="25" />
            <rect x="10" y="680" rx="4" ry="4" width="90" height="25" />
        </ContentLoader>
    )
}

export default Skeleton;