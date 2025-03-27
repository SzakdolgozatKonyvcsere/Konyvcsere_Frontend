import React, { useState } from 'react'
import useApiContext from '../../contexts/ApiContext'

function UserProfilePictureUpdateForm() {
  const {patchUserPFP, selectedImage, setSelectedImage} = useApiContext();
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => { //Ha van kiv. file, beállítja a statet
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      
      //Url preview-nek
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = () => {
    if (!selectedImage) {
      return; //Ha nincs kiv. fájl, kilép
    }

    const adat = new FormData();
    adat.append('img_url', selectedImage); //Hozzáadja a stateből a kiv. képet url-be

    /*patchUserPFP('/api/user/update-profile-picture', adat); //VEGPOOONT B) 
    window.location.reload();*/
    patchUserPFP('/api/user/update-profile-picture', adat)
    .then(() => {
      setSelectedImage(null);

      window.location.reload();
    })
    .catch((error) => {
      console.error("Error uploading image:", error);
    });
  };

  

  return (
    <div className='popup-form__container' onClick={(e) => e.stopPropagation()}> 
      <label htmlFor='img_url'>Kép kiválasztása:</label>
      { selectedImage?
        <div className='popup-form__container__image-preview'>
          <img src={imagePreview} alt='uploaded img preview'></img>
        </div> : null }
      <input
        type='file'
        name='img_url'
        accept='.png, .svg, .jpg, .jpeg, .gif'
        id='user-pfp-update__input'
        className='form-control'
        onChange={handleImageChange}
      />
      
      <button className='btn-primary' onClick={handleSubmit}>kép cserélése</button>
    </div>
  )
}

export default UserProfilePictureUpdateForm