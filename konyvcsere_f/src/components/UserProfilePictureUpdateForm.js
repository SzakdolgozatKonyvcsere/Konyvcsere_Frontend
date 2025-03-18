import React, { useState } from 'react'
import useApiContext from '../contexts/ApiContext'

function UserProfilePictureUpdateForm() {
  const {patchUserPFP} = useApiContext();
  const [selectedImage, setSelectedImage] = useState([]);

  const handleImageChange = (event) => { //Ha van kiv. file, beállítja a statet
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = () => {
    if (!selectedImage) {
      return; //Ha nincs kiv. fájl, kilép
    }

    const adat = new FormData();
    adat.append('img_url', selectedImage); //Hozzáadja a stateből a kiv. képet url-be

    console.log(adat.get('img_url'));
    patchUserPFP('/api/user/update-profile-picture', adat); //VEGPOOONT B) 
  };

  return (
    <div className='popup-form__container' onClick={(e) => e.stopPropagation()}> {/* popup-form = megjelenes formazas | hidden-element = display:none, ha nem hidden => osztaly levesz */}
      <label htmlFor='img_url'>Kép kiválasztása:</label>
      <input type='file' name='img_url' accept='.png, .svg, .jpg, .jpeg, .gif'
        id='user-pfp-update__input' onChange={handleImageChange}></input>
      <button onClick={handleSubmit}>kép cserélése</button>
    </div>
  )
}

export default UserProfilePictureUpdateForm