import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import ModalAddNewBookSearch from './modals/ModalAddNewBookSearch'
import useApiContext from '../../contexts/ApiContext';

function UserAddNewBookSearchButton() {

  const { getBookDemands } = useApiContext();

  const [addModalVisible, setAddModalVisible] = useState(false);

  const handleAddModalVisible = () => {
    setAddModalVisible(!addModalVisible);
  }

  return (
    <>
      <Button className='btn-primary' onClick={handleAddModalVisible}>
        Új keresés felvitele
      </Button>
      {addModalVisible && <ModalAddNewBookSearch 
        show={addModalVisible}
        handleClose={handleAddModalVisible}
        onUpdated={getBookDemands}
      />}
    </>
    
  )
}

export default UserAddNewBookSearchButton