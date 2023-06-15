import React from 'react'
import dbService from '../services/dbService'

const editClient = async () => {
    return await dbService.addClient(client)
}

export default editClient