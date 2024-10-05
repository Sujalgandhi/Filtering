import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Input from './Input';
import { BsEmojiAngryFill, BsEmojiFrownFill, BsEmojiNeutralFill, BsEmojiSmileFill, BsEmojiLaughingFill } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const MyForm = () => {
  const [hoveredEmoji, setHoveredEmoji] = useState(null);
  const [input, setInput] = useState({});
  const [Data, setData] = useState([]);

  const data = [
    { type: "text", name: "firstName", label: "First Name", placeholder: "Enter your first name" },
    { type: "text", name: "lastName", label: "Last Name", placeholder: "Enter your last name" },
    { type: "email", name: "email", label: "Email", placeholder: "Enter your email" },
    { type: "number", name: "contact", label: "Contact Number", placeholder: "Enter your Contact Number" },
  ];
  
  const emoji = [
    { icon: <BsEmojiAngryFill />, color: 'red', defaultColor: 'gray', name: 'Very Poor' },
    { icon: <BsEmojiFrownFill />, color: 'orange', defaultColor: 'gray', name: 'Poor' },
    { icon: <BsEmojiNeutralFill />, color: 'yellow', defaultColor: 'gray', name: 'Good' },
    { icon: <BsEmojiSmileFill />, color: 'lightgreen', defaultColor: 'gray', name: 'Very Good' },
    { icon: <BsEmojiLaughingFill />, color: 'green', defaultColor: 'gray', name: 'Excellent' }
  ];

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prevData) => ({
      ...prevData, [name]: value
    }));
  };

  const handleEmojiHover = (index) => {
    setHoveredEmoji(index);
  };

  const handleEmojiClick = (index) => {
    const name = emoji[index].name;
    setInput((data) => ({
      ...data, Rating: name
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let existingData = JSON.parse(localStorage.getItem('data')) || [];
    let newData = [...existingData, input];
    setData(newData);
    localStorage.setItem('data', JSON.stringify(newData));

    console.log(newData);
    
  }

  return (
    <Form className='py-5 px-5 bg-info shadow rounded' onSubmit={handleSubmit}>
      {/* Flex layout for the first two inputs */}
      <div className="d-flex">
        {data.slice(0, 2).map((val, key) => (
          <Input key={key} type={val.type} name={val.name} placeholder={val.placeholder} label={val.label} onChange={handleInput} />
        ))}
      </div>

      {/* Full-width layout for the remaining inputs */}
      {data.slice(2).map((val, key) => (
        <Input key={key + 2} type={val.type} name={val.name} placeholder={val.placeholder} label={val.label} onChange={handleInput} />
      ))}

       {/* Dropdown */}
       <Form.Group className='mb-3 mx-3'>
        <Form.Label className='text-start d-block fw-bold'>How did you hear about us?</Form.Label>
        <Form.Select onChange={handleInput} name="Option">
          <option disabled selected>Select Options</option>
          <option value="Internet Search">Internet Search</option>
          <option value="Friends">Friends</option>
          <option value="Advertisement">Advertisement</option>
          <option value="Other">Other</option>
        </Form.Select>
      </Form.Group>

      {/* emoji rating */}
      <Form.Group className='mb-3 mx-3'>
        <Form.Label className='text-start d-block fw-bold'>Rate your experience</Form.Label>
        <div className="d-flex">
          {emoji.map((emojiVal, emojiKey) => (
            <div
              className="mx-2"
              key={emojiKey}
              onMouseEnter={() => handleEmojiHover(emojiKey)}
              onMouseLeave={() => handleEmojiHover(null)}
              onMouseMove={() => handleEmojiClick(emojiKey)}
              style={{ cursor: 'pointer' }}
            >
              {/* Change the color based on hover state */}
              {React.cloneElement(emojiVal.icon, {
                color: hoveredEmoji === emojiKey ? emojiVal.color : emojiVal.defaultColor,
                size: 30
              })}
            </div>
          ))}
        </div>
      </Form.Group>

      <Form.Group className='mb-3 mx-3'>
        <Form.Label className='d-block text-start fw-bold'>Feedback</Form.Label>
        <Form.Control as="textarea" rows={3} onChange={handleInput} name='Feedback' />
      </Form.Group>

      <Form.Group className='mx-3 mb-3'>
        <Form.Check label="I agree to the Terms and Conditions and acknowledge the Privacy Policy." />
      </Form.Group>

      <Button className='mx-2' type='submit' variant="primary">Submit</Button>
      <Link className='mx-2' to="/table"><Button variant="primary">Show Data</Button></Link>
    </Form>
  );
};

export default MyForm;
