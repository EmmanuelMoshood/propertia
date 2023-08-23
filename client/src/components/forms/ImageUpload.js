


export default function ImageUpload({ ad, setAd }) {
    
    const handleUpload = (e) => {
      let files = e.target.files;
      files = [...files];
      if (files?.length) {
        setAd({ ...ad, uploading: true });
        //make a req to backend
        console.log(files)
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