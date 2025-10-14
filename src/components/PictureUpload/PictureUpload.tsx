import axios from "axios";
import { useState, type FormEvent } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { ENVIRONMENT } from "../../constants";

function PictureUpload() {
    const [pictureURL, setPictureURL] = useState(null);
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState("");
    const [hasError, setHasError] = useState(false);

    const USER_API_BASE_URL = `${ENVIRONMENT.VITE_API_BASE_URL}/users`;

    const { token } = useAuth();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
        }
    };

    async function handlePictureUpload(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!token || !file) {
            setHasError(true);
            console.error("You must be logged in and select a file to upload picture to your profile.");
            return;
        }

        try {

            // get upload url 
            const response = await axios.post(`${USER_API_BASE_URL}/profile-pic-url`, {
                fileName,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response);
            const uploadURL = response.data.data;

            // upload from frontend 
            await axios.put(`${uploadURL}`, file, {
                headers: {
                    "Content-Type": file.type
                }
            });
            setPictureURL(uploadURL);

        } catch (error: unknown) {
            setHasError(true);
            if (axios.isAxiosError(error)) {
                console.error("Error uploading user profile picture:", error.response?.data || error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }

    return (
        <form onSubmit={handlePictureUpload}>
            <input
                type="file"
                accept="image/jpeg"
                onChange={handleFileChange}
                required
            />
            <button type="submit">Upload Image</button>
            {hasError &&
                <div style={{ color: "red" }}>Error uploading image.</div>}
            {pictureURL &&
                <div>
                    Image uploaded!
                    <img src={pictureURL} alt="Uploaded" width={"200px"} height={"200px"} />
                </div>}
        </form>
    )
}

export default PictureUpload;