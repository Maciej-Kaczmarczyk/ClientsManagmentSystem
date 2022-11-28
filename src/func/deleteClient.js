import React from 'react'
import dbService from '../services/dbService'

const deleteClient = async (id) => {
    return await dbService.deleteClient(id)
}

export default deleteClient