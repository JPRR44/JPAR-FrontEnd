import { React, useEffect, useState } from 'react'; //Use effect used on load
import './developer2.scss';
import Modal from 'react-modal';
import { Form, Container } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import axios from 'axios'


const Developer2 = () => {
  const url = 'https://c1tm95660k.execute-api.us-east-1.amazonaws.com/dev/updateticket';
  const [modalIsOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([])
  const [getId, setgetId] = useState('')
  function openModal(e) {
    // e.preventDefault()
    setIsOpen(true);
  }
  function closeModal(e) {
    e.preventDefault()
    setIsOpen(false);
    mapTickets();
  }
  const print = () => {
    const test = document.getElementById('summary')
    console.log(test.innerHTML);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '500px'
    }
  };

  const mapTickets = () => {
    axios.get('https://c1tm95660k.execute-api.us-east-1.amazonaws.com/dev/conseguirticket')
      .then(res => {
        console.log(res)
        setUsers(res.data);
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    mapTickets()
  }, [])



  const [data, setData] = useState({
    ticket: {
      id: '',
      summary: '',
      email: '',
      date: '',
      description: '',
      assignedDev2: "",
      assignedDev3: "",
      attachedFiles: ""
    }
  })

  const myFunction = (e) => {
    const newData = { ...data }
    newData[e.target.id] = e.target.value
    setData(newData)
  }

  const submit = (e) => {
    e.preventDefault()
    var id = e.target.innerHTML
    setgetId(id)

    axios.put(url, {
      ticket: {
        id: getId,
        summary: "",
        email: (data.email === undefined) ? '' : data.email,
        date: "",
        description: (data.description === undefined) ? '' : data.description,
        assignedDev2: (data.assignedDev2 === undefined) ? '' : data.assignedDev2,
        assignedDev3: (data.assignedDev3 === undefined) ? '' : data.assignedDev3,
        attachedFiles: (data.attachedFiles === undefined) ? '' : data.attachedFiles
      }
    }).then(res => {
      console.log('result!');
      console.log(res.data);
    }).catch(err => {
      return console.log(err);
    })
  }

  const setId = (e) => {
    // e.preventDefault()
    var id = e.target.innerHTML
    setgetId(id)
    openModal()
  }

  return (
    <Container className='DevContainer'>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Container className='ClientContainer' onSubmit={submit}>
          <Form className='ClientForm'>
            <Form.Group >
              <Form.Label>Assigned Dev2</Form.Label>
              <Form.Control onChange={(e) => myFunction(e)} type="text" placeholder="Please enter the L2 developer's name " id='assignedDev2' />
            </Form.Group>
            <Form.Group >
              <Form.Label>Assigned Dev3</Form.Label>
              <Form.Control onChange={(e) => myFunction(e)} type="text" placeholder="Please enter the L2 developer's name " id='assignedDev3' />
            </Form.Group>
            <Form.Group >
              <Form.Label>Description</Form.Label>
              <Form.Control onChange={(e) => myFunction(e)} as="textarea" placeholder="Please describe the issue" id='description' />
            </Form.Group>
            <Form.Group >
              <Form.Label>Dev3 email</Form.Label>
              <Form.Control onChange={(e) => myFunction(e)} type="text" placeholder="Please enter the L3 developer's email " id='email' />
            </Form.Group>
            <Button variant="contained" color="primary" type="submit" className='SubmitBtn' >
              Submit
        </Button>
          </Form>
        </Container>
      </Modal>

      <div>
        {
          users.map(users => {
            return (
              <table className='ticketTable'>
                <tr>
                  <th>ID</th>
                  <th>Summary</th>
                  <th>Date</th>
                  <th>Assigned L2 developer</th>
                  <th>Assigned L3 developer</th>
                  <th>L3 dev email</th>
                  <th>Description</th>
                  {/* <th>Actions</th> */}
                </tr>
                <tr>
                  <td id='id' onClick={setId}><Button color="primary" variant="contained">{users.id}</Button></td>
                  <td id='summary' onClick={print}>{users.summary}</td>
                  <td>{users.date}</td>
                  <td>{users.assignedDev2}</td>
                  <td>{users.assignedDev3}</td>
                  <td >{users.email}</td>
                  <td>{users.description}</td>
                  {/* <td><Button href='' onClick={openModal}>Edit</Button> </td> */}
                </tr>
              </table>
            );
          })
        }
      </div>
    </Container>
  )
}

export default Developer2;