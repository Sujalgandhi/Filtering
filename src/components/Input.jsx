import React from 'react'
import Form from 'react-bootstrap/Form';

const Input = ({ type, name, placeholder, label, onChange }) => {
    return (
        <div>
            <Form.Group className="mb-3 mx-3" controlId="exampleForm.ControlInput1">
                <Form.Label className="text-start d-block fw-bold">{label}</Form.Label>
                <Form.Control type={type} name={name} placeholder={placeholder} onChange={onChange} />
            </Form.Group>
        </div>
    )
}

export default Input
