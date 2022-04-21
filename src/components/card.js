const Card = (props) => {

    return (
        <div className="main-card" style={{maxWidth:"100%", minWidth:"350px", margin:"1rem", backgroundColor:`${props.bodycolor}`}}>
            <div className="card-header" style={{backgroundColor:`${props.hdrcolor}`, color:`${props.hdrtext}`}}>{props.header}</div>
            <div className="card-body" style={{color:`${props.bodytext}`}}>
                {props.title && (<h4 className="card-title">{props.title}</h4>)}
                {props.text && (<p className="card-text">{props.text}</p>)}
                {props.body}
                {props.status && (<div id="createStatus">{props.status}</div>)}
            </div>
        </div>
    );
}
export default Card;