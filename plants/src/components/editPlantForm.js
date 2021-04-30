import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';

const initialForm = {
    nickname: '',
    species: '',
    h2o_Frequency: ''
}

export const EditPlant = (props) => {
  const [plantToEdit, setPlantToEdit] = useState(initialForm);
  const plantId = props.match.params.id;
  const history = useHistory()

  useEffect(() => {
    axios.get(`https://reqres.in/api/users/${plantId}`)
      .then(res => {
        console.log('resdata: ', res.data.data)
        setPlantToEdit(res.data.data)
      })
      .catch(err => console.error('something went wrong: ', err))
  }, [plantId])

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`https://reqres.in/api/users/${plantId}`, plantToEdit)
      .then(res => {
        console.log('axios.put: res ', res)
        setPlantToEdit(res.data)
        history.push(`/my-plants/${plantId}`)

        
        // const changedPlant = res.data.data.find(item => item.id === plantId)
        // console.log('axios.put: changedplant: ',changedPlant)
        
        setPlantToEdit(plantId.map(res => {
          if(res.id === plantId){
            return plantId
          }else {
            return res
          }
        }))
      })
      .catch(err => console.error('axios.put: something went wrong: ', err))
  }

  const changeHandler = e => {
    e.persist();
    let value = e.target.value;
    setPlantToEdit({
      ...plantToEdit,
      [e.target.name]: value
    })
  }


  return(
    <div>
      <Nav/>
      <h1>Edit your plant</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Plant's Nickname</label>
            <input 
              type='text'
              name='nickname'
              id='nickname'
              value={plantToEdit.nickname}
              onChange={changeHandler}
            />
          <label className="add-plant-label">Plant's Species</label>
            <input 
              type='text'
              name="species"
              id="species"
              value={plantToEdit.species}
              onChange={changeHandler}
            />
          <label className="add-plant-label">Watering Instructions</label>
            <input
              type="text"
              name="h2o_Frequency"
              id="h2o_Frequency"
              value={plantToEdit.h2o_Frequency}
              onChange={changeHandler}
            />
          <div className="form-button-container">
            <button className="add-plant-form-button submit-btn" type="submit">Update Plant</button>            
            <Link to={`/my-plants/${plantId}`}>
              <button>Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}