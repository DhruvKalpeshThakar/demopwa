import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

export function Users() {

    const [data, setData] = useState([])
    const [mode, setmode] = useState("online")

    useEffect(() => {
        let url = 'https://jsonplaceholder.typicode.com/users'
        fetch(url).then((response) => {
            response.json().then((result) => {
                console.warn("result", result)
                setData(result)

                //To set Api Data in Local Storage
                localStorage.setItem('users', JSON.stringify(result))

            })
        }).catch(e => {
            let collection = localStorage.getItem("users")
            setData(JSON.parse(collection))
            setmode('Offline')
            // alert("Catch Block")
        })
    }, [])


    return (
        <div>
            {mode === 'Offline' ?
                <div className='alert alert-warning' role='alert'>You are in Offline Mode </div>
                : null
            }
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                        </tr>
                    ))
                    }
                    {/* <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td colSpan={2}>Larry the Bird</td>
                        <td>@twitter</td>
                    </tr> */}
                </tbody>
            </Table>
        </div>
    )
}



