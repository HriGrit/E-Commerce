import { useParams } from "react-router-dom";

const Profile = () => {
    
    const { id } = useParams<{ id: string }>();

    console.log(id);

    return (
        <div>
            Profile
        </div>
    )
}

export default Profile
