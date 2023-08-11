import React from 'react'
import { useGetPropertiesQuery } from '../features/propertiesSlice';

function Pro() {
    const { data, isLoading, isSuccess, isError, error } = useGetPropertiesQuery();
    console.log(data)
    return (
        <div>
            Hello
        </div>
    )
}

export default Pro
