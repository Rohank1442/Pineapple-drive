import { useState } from "react";
import axios from "axios";
import "./FileUpload.css"
const FileUpload = ({ contract, account, provider }) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No image selected");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: `9e78ba31429bfcd47632`,
                        pinata_secret_api_key: `00b0917dd1f912d0ecf0ff83563eeda1048bccc228006f7ab428a50da7342562`,
                        "Content-Type": "multipart/form-data",
                    },
                });
                // const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
                const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
                contract.add(account, ImgHash);
                alert("Successfully Image Uploaded");
                setFileName("No image selected");
                setFile(null);
            }
            catch (e) {
                alert("Unable to upload image on pinata");
            }
        }
        alert("Image Uploaded Successfully");
        setFileName("No Image Selected");
        setFile(null);
    };
    
    const retrieveFile = (e) => {
        const data = e.target.files[0];
        console.log(data);
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setFile(e.target.files[0]);
        }
        setFileName(e.target.files[0].name);
        e.preventDefault();
    };
    return <div className="top">
        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="file-upload" className="choose">
                Choose Image
            </label>
            <input disabled={!account} type="file" id="file-upload" name="data" onChange={retrieveFile} />
            <span className="textArea">Image: {fileName}</span>
            <button type="submit" className="upload" disabled={!file}>
                Upload File
            </button>
        </form>
    </div>
};
export default FileUpload;