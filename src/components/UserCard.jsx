const UserCard=({user})=>
{
    const {firstName,lastName,photourl,gender,age,about,skills}=user;
    return (

    <div className="card bg-base-300 w-80 h-120 shadow-sm mb-20">
        <figure>
            <img
            // className="w-60 h-60 my-6"
            src={photourl}
            alt="Shoes" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{firstName.toUpperCase() +" "+lastName.toUpperCase()}</h2>
            {age && gender(<p>{age+" "+gender}</p>)}
            <p>{about}</p>
            <div className="card-actions justify-center">
                <button className="btn btn-error mx-2">Ignored</button>
               <button className="btn btn-success">Interested</button>
            </div>
        </div>
</div>
)};

export default UserCard; 