import React, { useEffect, useState } from 'react'
import useAuthContext from '../../contexts/AuthContext'
import UserProfilePictureUpdateForm from './UserProfilePictureUpdateForm';
import { Button, Form } from 'react-bootstrap';
import useApiContext from '../../contexts/ApiContext';


function UserOwnProfileInfo() {
  const {user} = useAuthContext();
  const {userInfoUpdate} = useApiContext();
  const [isPFPUpdateVisible, setPFPUpdateVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    full_name: "",
    email: "",
    city: "",
    tel: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userInfoUpdate(formData, user.id);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      refreshData();
    }
  }

  // set formdata with user's details once
  const refreshData = () => {
    setFormData({
      name: user.name || "",
      full_name: user.full_name || "",
      email: user.email || "",
      city: user.city || "",
      tel: user.tel || ""
    });
  }

  useEffect(() => {
    refreshData();
  }, [user]);

  const togglePFPUpdateVisibility = () => {
    setPFPUpdateVisible(!isPFPUpdateVisible);
  };

  return (
    <div className='user-own-profile'>
      <div className='user-own-profile__details'>
        <div className='user-own-profile__details-top'>
          <div className="user-own-profile__details-top__edit-image" onClick={togglePFPUpdateVisibility}>
            <img className='user-own-profile__details-top__image' src={`http://localhost:8000/${user.img_url}`}></img>
            <span>kép cserélése</span>
          </div>
        </div>
        <Form id="edit-user-form" onSubmit={handleSubmit}>
          <Form.Group className="mb-3 w-100">
            <Form.Label>Felhasználónév:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3 w-100">
            <Form.Label>Teljes név:</Form.Label>
            <Form.Control
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3 w-100">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3 w-100">
            <Form.Label>Város:</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3 w-100">
            <Form.Label>Telefonszám:</Form.Label>
            <Form.Control
              type="text"
              name="tel"
              value={formData.tel}
              onChange={handleChange}
            />
          </Form.Group>
          <Button type='submit' className='w-100 btn'>módosítás</Button>
        </Form>  
      </div>
      {isPFPUpdateVisible && (
        <>
          <div onClick={togglePFPUpdateVisibility} className='popup-form__background'>
            <UserProfilePictureUpdateForm/>
          </div>          
        </>        
      )}
      
    </div> 
  )
}

export default UserOwnProfileInfo