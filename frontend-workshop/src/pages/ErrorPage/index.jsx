import React from 'react'
import {Center, Stack} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <Center>
            <div>
                <h1 id='error'> Oops, Error! </h1>
                <h3 id = 'errorText'> Something went wrong. </h3>  
                <Link to= '/'>Go back home</Link>              
            </div>

        </Center>
    )
}

ErrorPage.propTypes = {}

export default ErrorPage