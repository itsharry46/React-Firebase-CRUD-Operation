import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import fireDb from '../firebase';
import Swal from 'sweetalert2';

const Contacts = () => {

    var [contactObjects, setContactObjects] = useState(0);

    var [currentId, setCurrentId] = useState('');

    useEffect(() => {
        fireDb.child('contacts').on('value', snapshot => {
            if (snapshot.val() != null)
                setContactObjects({
                    ...snapshot.val()
                })
        })
    }, []);

    const addOrEdit = (obj) => {
        if (currentId === '')
            fireDb.child('contacts').push(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
        else
            fireDb.child(`contacts/${currentId}`).set(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
    }

    const onDelete = keys => {
        if (Swal.fire({
            title: 'Are you sure you want to delete the record?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })) {
            fireDb.child(`contacts/${currentId}`).remove(
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
        }
    }

    return (
        <>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4 text-center">CRUD OPERATIONS</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <ContactForm {...({ addOrEdit, currentId, contactObjects })} />
                </div>
                <div className="col-md-7">
                    <table className="table table-borderless table-stripped">
                        <thead className="thead-light">
                            <tr>
                                <th>Full Name</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(contactObjects).map(id => {
                                    return (
                                        <tr key={id}>
                                            <td>{contactObjects[id].fullname}</td>
                                            <td>{contactObjects[id].mobile}</td>
                                            <td>{contactObjects[id].email}</td>
                                            <td>
                                                <a className="btn text-primary" onClick={() => { setCurrentId(id) }} >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </a>
                                                <a className="btn text-danger" onClick={() => { onDelete(id) }} >
                                                    <i className="far fa-trash-alt"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
};

export default Contacts;
