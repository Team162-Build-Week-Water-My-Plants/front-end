import React, { useState } from 'react'
import * as Yup from 'yup'
import { axiosAuth } from '../utils/axiosAuth';
import {Link, useHistory} from 'react-router-dom';

// formSchema using Yup
const schema = Yup.object().shape({
    fname: Yup.string().trim().required('Name required').min(6, 'please enter a name longer than 6 chars'),
    email: Yup.string().required('Email required').min(6, 'please enter a valid email address'),
    phone: Yup.number().required('Phone required'),
    password: Yup.string().required('Password required')
})

//InitialState
export default function SignUp(){
    const [formData, setFormData] = useState({
        fname: '',
        email: '',
        password: '',
        phone: ''
    
    }) 
    const [errors, setErrors] = useState({
        fname: '',
        email: '',
        password: '',
        phone: ''
    }) 
    const history = useHistory();


    const onInputChange = event => {
    const newForm= {...formData,[event.target.name]: event.target.value}
        validation(event)
        setFormData(newForm)
    }

    const handleSubmit= event => {
        event.preventDefault();
        axiosAuth().post('/api/register', formData) // refactored with axiosAuth
            .then(res => { 
                localStorage.setItem('token', res.data.token) 
                setFormData({
                    fname: '',
                    email: '',
                    password: '',
                    phone: ''
            })
            history.push('/my-plants')
            console.log(res)
        })
        .catch(err => console.error(err.response))
    }
    
    const validation= e => {
        yup.reach(schema, e.target.name)
        .validate(e.target.value)
        .then((valid) => {
            setErrors({
                ...errors, [e.target.errors]: " "
            })
        })
        .catch((err) => {
            setErrors({
                ...errors, [e.target.errors]: err.errors[0]
            })
        })
    }




    return (
        <div className="signUp">
            <form onSubmit = {handleSubmit}>
                <label htmlFor='fname'>Name:   
                <input onChange={onInputChange}
                    name='fname'
                    placeholder='name, please'
                    id='fname'
                    type='text'
                    value={formData.fname}
                />
                {errors.fname.length > 0 ? <span className = "errors">{errors.fname} </span> : null }
                </label>
            <br>
            </br>
                <label htmlFor='email'> email:    
                <input 
                    onChange={onInputChange}
                    name='email'
                    placeholder='e.mail, please'
                    id='email'
                    type='email'
                    value={formData.email}
                />
                {errors.email.length > 0 ? <span className = "errors">{errors.email} </span> : null }
                </label>
            <br>
            </br>
                <label htmlFor='password'>password:    
                <input 
                    onChange={onInputChange}
                    name='password'
                    placeholder='password'
                    id='password'
                    type='text'
                    value={formData.password}
                />
                {errors.password.length > 0 ? <span className = "errors">{errors.password} </span> : null }
                </label>
            <br>
            </br>
                <label htmlFor='phone'> phone:   
                <input 
                    onChange={onInputChange}
                    name='phone'
                    placeholder='telephone, please'
                    id='phone'
                    type='text'
                    value={formData.phone}
                />
                {errors.phone.length > 0 ? <span className = "errors">{errors.phone} </span> : null }
                </label>
                <br>
                </br>
                <Link to='/'>
                    Already a user? Sign-in!
                </Link>
                <br></br>
                <button> Register </button>
            </form>
    </div>
    )
}

