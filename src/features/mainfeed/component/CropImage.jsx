
import { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
// import "../../../assets/styles/crop.css";

const defaultSrc ="https://res.cloudinary.com/olanetsoft/image/upload/v1648679302/uploadedFiles/family.jpg";

export default function CropImage() {
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("");
  const [cropper, setCropper] = useState(null);

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      // console.log(reader.result)
    };
    reader.readAsDataURL(files[0]);

  };
  console.log('dd', cropData)
  return (
    <div>
      <div className="splitdiv" id="leftdiv">
        <h1 className="main-h1">
            How to Crop and Resize Image in the Browser using CropperJs
        </h1>
        <div id="leftdivcard">
          <input type="file" onChange={onChange}/>
          <button type="button" id="leftbutton">
            Use Default Image
          </button>
            &nbsp; &nbsp;
          <button type="button" id="leftbutton" onClick={getCropData}>
            Crop Image
          </button>

        </div>
        <Cropper
            className="cropper"
            zoomTo={0}
            initialAspectRatio={1}
            aspectRatio={1}
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            // cropBoxResizable={false}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
            guides={true}
          />
      </div>
      <div className="splitdiv" id="rightdiv">
        <div id="itemdivcard">
          {cropData ? (
            <img style={{ height: "50%" }} src='' alt="cropped" />
          ) : (
            <h1>Cropped image will apear here!</h1>
          )}
        </div>
      </div>
    </div>
  );
}


