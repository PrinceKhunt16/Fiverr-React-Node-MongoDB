import axios from "axios";

const upload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "fiverr");

    try {
        const response = await axios.post("https://api.cloudinary.com/v1_1/fiverr-pk/image/upload", data);

        return response.data.url;
    } catch (err) {
        console.log(err);
    }
}

export default upload;