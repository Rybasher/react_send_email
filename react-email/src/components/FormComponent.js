import React, { useState } from 'react';
import '../App.scss';
// import InputMask from 'react-input-mask';
import * as yup from 'yup';
import { useFormik } from 'formik';
import MaskedInput from "react-text-mask";


const FormComponent = () => {
    
  const phoneRegExp = [
      "(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-",/\d/, /\d/, /\d/, /\d/
    ];

  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),

  });
  const [emailMess, setMessage] = useState('');

  const sendData = async (values) => {
    
    await fetch('http://127.0.0.1:8000/send_email',
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          from_email: values.email,
          subject: values.subject,
          content: values.message
        })
    })
    .then((res) => { 
        console.log(res);
        setMessage("Message sent");
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
                <div className='form-group area'>
                  <textarea name='message' className='form-group__input'
                  onChange={formik.handleChange}
                  value={formik.values.message}
                  id='message' placeholder=" "/>
                  <label className='form-group__label'>Message</label>
                </div>
                
                <footer className='form-footer'>
                  <div className='form-buttons'>
                    <button type="submit" className='form-buttons__submit'>Submit message</button> 
                    <button type='button' className='form-buttons__reset' onClick={formik.handleReset}>Reset</button>
                  </div>
               
                </footer>
            </form>
               
            </div>
            <footer className='container-footer'>
              <p>{emailMess}</p>
            </footer>
            
        </div>
    </section>
  );
}


export default FormComponent;