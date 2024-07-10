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
                        pinata_api_key: `5fd1afa23e590062831b`,
                        pinata_secret_api_key: `dc4e157655589e3148aad3fe868a82d30c1e661c9bd1e90b7810fb76344af50c`,
                        "Content-Type": "multipart/form-data",
                    },
                });
                // const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
                const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
                const signer = contract.connect(provider.getSigner());
                signer.add(account, ImgHash);  // Storing Image Hash on Blockchain
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