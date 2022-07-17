import React, { useState } from 'react';
import '../App.scss';
// import InputMask from 'react-input-mask';
import * as yup from 'yup';
import { useFormik } from 'formik';
import MaskedInput from "react-text-mask";


const FormComponent = () => {
    
const phoneRegExp = [
    "(",
    /[1-9]/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];
const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    phone: yup
      .string().required('Required')
  });
  const [emailMess, setMessage] = useState('');

  const sendData = async (values) => {
    
    await fetch(`${process.env.REACT_APP_URL}/send_email`,
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(values)
    })
    .then((res) => { 
        setMessage(res)
    })
    .catch(function(res){ console.log(res) })
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        sendData(values);
    },
  });
  const fieldsArray = [
    {
        name: "name",
        type: "text"
    },
    {
        name: "email",
        type: "email"
    },
    {
        name: "phone",
        type: "text"
    },
    {
        name: "subject",
        type: "text"
    },
]
const field = fieldsArray.map((element) => {
    if (element.name === 'phone') {
        return <div className='form-group' key={element.name}>
                <MaskedInput
                mask={phoneRegExp}
                className="form-group__input"
                name={element.name}
                onChange={formik.handleChange}
                value={formik.values[element.name]}
                id='name' type={element.type} placeholder=" "
                />
                <label className='form-group__label'>{element.name}</label>
                <p className='form-group__error'>{formik.errors[element.name]}</p>
            </div>
    }
    return <div className='form-group' key={element.name}>
                <input name={element.name} className='form-group__input'
                onChange={formik.handleChange}
                value={formik.values[element.name]}

                id='name' type={element.type} placeholder=" "/>
                <label className='form-group__label'>{element.name}</label>
                <p className='form-group__error'>{formik.errors[element.name]}</p>
            </div>
});
  return (
    <section className='section form-section'>
        <div className='container'>
            <div className='container-header'>
                <h2 className='container-header__title'>
                    Contact <span>us</span>
                </h2>
            </div>
            <div className='container-body'>
            
            <form className='contact-form' onSubmit={formik.handleSubmit}>
                {field}
                {/* <div className='form-group'> */}
                <textarea name='message' className='text-area'
                onChange={formik.handleChange}
                value={formik.values.message}
                id='message' placeholder=" "/>
                {/* <label className='form-group__label'>message</label> */}
                <p className='form-group__error'>{formik.errors.message}</p>
            {/* </div> */}
                <footer className='form-footer'>
                <button type="submit">Submit</button> 
                <button type='button' onClick={formik.handleReset}>Reset</button>
                </footer>
            </form>
               
            </div>
            <p>{emailMess}</p>
            
        </div>
    </section>
  );
}


export default FormComponent;