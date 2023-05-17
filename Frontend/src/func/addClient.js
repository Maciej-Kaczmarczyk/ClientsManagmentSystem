import React from 'react'
import dbService from '../services/dbService'

const addClient = async (client) => {
    return await dbService.addClient(client)
}

export default addClient