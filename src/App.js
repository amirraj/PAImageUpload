import { useState } from "react";
import "./styles.css";
import axios from "axios";
import AWS from 'aws-sdk';

var s3 = new AWS.S3();

export default function App() {
  const [isSelected, setIsSelected] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  const uploadToS3 = async (file, signedRequest) => {
    const options = {
      headers: {
        "Content-Type": file.type
      }
    };
    let res = await axios.put(signedRequest, file, options);
    console.log(res);
  };

  const url = async (name, type) => {
    return axios
      .post(
        "https://xloie6cu80.execute-api.us-east-2.amazonaws.com/v1/get-upload-url",
        {
          filename: name,
          filetype: type
        }
      )
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  };
  const handleSubmission = async (event) => {
    event.preventDefault();

    let link = await url(selectedFile.name, selectedFile.type);

    await uploadToS3(selectedFile, link.data.signedRequest);
    setUploadStatus(true);

};
const onFileChange = (event) => {
  event.preventDefault();
  setSelectedFile(event.target.files[0]);
  setIsSelected(true);
};

return (
  <div>
    <input type="file" name="file" onChange={onFileChange} />
    <div>
      <button onClick={handleSubmission}>Submit</button>
    </div>

    {isSelected ? (
      <div>
        <h1>
          Upload to S3 status:{" "}
          {uploadStatus ? "Uploaded to S3" : "Not yet uploaded"}
        </h1>
        <p>Filename: {selectedFile.name}</p>
        <p>Filetype: {selectedFile.type}</p>
        <p>Size in bytes: {selectedFile.size}</p>
        <p>
          lastModifiedDate:{" "}
          {selectedFile.lastModifiedDate.toLocaleDateString()}
        </p>
      </div>
    ) : (
      <p>Select a file to show details</p>
    )}
  </div>
);
}
