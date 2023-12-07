function Error({title,message}){
    return(
        <div className="error center">
            <h2>{title}</h2>
            <p>{message}</p>
        </div>
    );
}
export default Error;