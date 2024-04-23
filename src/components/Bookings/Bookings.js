import React, { useState } from 'react';

function Bookings() {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container">
      <h2>Upload an Image</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && (
        <div>
          <h2>Image URL:</h2>
          <p>{image}</p>
          {console.log(image)}
          <img src={image} alt="Uploaded" />
        </div>
      )}
    </div>
  );
}

export default Bookings;
