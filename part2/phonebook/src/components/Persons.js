import React from 'react';
const Persons = ({ names, deleteInfo }) => {
    return (
        <div>
            <li>{names.name} {names.number}
                <button type="button"  onClick={deleteInfo}>delete</button>
            </li>
        </div>
    )
}
export default Persons;