import React, { useState } from "react";
import "./Margin.css";
import axios from 'axios';
import JWT from "../../../SECRET.js";

const Margin = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [pinataResponses, setPinataResponses] = useState([]);
  const [result, setResult] = useState("");


  const [loading, setLoading] = useState(false);
  // const [analyzed, setAnalyzed] = useState(false);
  const [shelfImages, setShelfImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    setSelectedFiles([...selectedFiles, ...files]);
    const imagesArray = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();

      reader.onload = (e) => {
        imagesArray.push(e.target.result);
        if (imagesArray.length === files.length) {
          setShelfImages(imagesArray);
        }
      };

      reader.readAsDataURL(files[i]);
    }

  };

  // const handleImageUpload = (event) => {
  //   const files = event.target.files;
  //   const imagesArray = [];

  //   for (let i = 0; i < files.length; i++) {
  //     const reader = new FileReader();

  //     reader.onload = (e) => {
  //       imagesArray.push(e.target.result);
  //       if (imagesArray.length === files.length) {
  //         setShelfImages(imagesArray);
  //       }
  //     };

  //     reader.readAsDataURL(files[i]);
  //   }
  // };

  const analyzeShelf = async () => {
    setLoading(true);

    const responses = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const formData = new FormData();
      formData.append("file", selectedFiles[i]);

      try {
        const res = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${JWT}`,
            },
          }
        );
        responses.push("https://ipfs.io/ipfs/" + res.data.IpfsHash);
      } catch (error) {
        console.error("Error uploading to IPFS:", error);
      }
    }

    console.log(responses);
    setPinataResponses(responses);

    const data = {
      pinataIPFS: responses,
    }
    console.log(data);
    const response = await axios.post(
      "http://localhost:8800/api/shelf/extract",
      // {
      //   headers: {
      //     "Content-Type": "application/json"
      //   }
      // }
    );
    console.log(response.data);
    setResult(response.data);
    // setResult(` The top shelf has all the wrong structures present or harmful products. The cigarettes are all at the top which may cause a bad impression to users. The products should be placed according to their size, shape, and color. The shelf changes that can be made are to move the cigarettes to the bottom shelf and move the other products up. This will create a more visually appealing display and make it easier for customers to find the products they are looking for.
    // The top shelf has a lot of products that are harmful to the user, such as cigarettes. These products should be placed at the bottom of the shelf so that they are not easily accessible to children. The top shelf should be reserved for products that are not harmful, such as candy and snacks. Additionally, the shelf is very cluttered and difficult to navigate. It would be better to have fewer products on the shelf so that it is easier to see what is available.`);

    setLoading(false);
  };

  return (
    <>
      <h1 className="umm">Let's Examine the shelf</h1>
      <div className="container">
        <div className="shelf-analyzer">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
          <button onClick={analyzeShelf}>Analyze</button>

          {loading && <div className="loading">Analyzing the images...</div>}

          {/* {result && (
            <div className="items-placement">
              {result.data}
            </div>
          )} */}

          <div className="shelf-images">
            {shelfImages.map((image, index) => (
              <img key={index} src={image} alt={`Shelf ${index + 1}`} />
            ))}
          </div>
        </div>
        <div className="paragraph-card">
          <h1 className="oo">ANALYSIS</h1>
          <p>
            {result && (
              <div>
                {result.data}
              </div>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default Margin;
