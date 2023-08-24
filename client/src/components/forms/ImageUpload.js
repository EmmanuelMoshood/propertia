import Resizer from "react-image-file-resizer"
import axios from "axios"

export default function ImageUpload({ ad, setAd }) {
    
    // components/forms/ImageUpload.js
  const handleUpload = (e) => {
    let files = e.target.files;
    files = [...files];
    if (files?.length) {
      setAd({ ...ad, uploading: true });

      //reduce the size of each file
      files.map((f) => {
        new Promise((resolve) => {
          Resizer.imageFileResizer(
            f,
            1080,
            720,
            "JPEG",
            100,
            0,
            async (uri) => {
              try {
                const { data } = await axios.post("/upload-image", {
                  image: uri,
                });
                setAd((prev) => ({
                  ...prev,
                  photos: [data, ...prev.photos],
                  uploading: false,
                }));
              } catch (err) {
                console.log("photo upload err => ", err);
                setAd({ ...ad, uploading: false });
              }
            },
            "base64"
          );
        });
      });
    } else {
      setAd({ ...ad, uploading: false });
    }
  };
  
    const handleDelete = async (photo) => {
      setAd({ ...ad, uploading: true });
      try {
        console.log("send API request to remove file");
      } catch (err) {
        console.log(err);
        setAd({ ...ad, removing: false });
      }
    };
  
    
    
    
    return (
      <>
        <div className="d-flex mt-4 mb-3">
          <label className="btn btn-secondary">
            {ad.uploading
              ? "Uploading..."
              : ad.removing
              ? "Removing..."
              : "Upload photos"}
            <input
              onChange={handleUpload}
              type="file"
              accept="image/*"
              multiple
              hidden
            />
          </label>
        </div>
      </>
    );
  }