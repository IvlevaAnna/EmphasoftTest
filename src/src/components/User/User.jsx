import React from 'react'
import {TableCell, TableRow} from "@mui/material";

export const User = ({user}) => {

    return (
        <>
            <TableRow>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.first_name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
                <TableCell>{user.is_active ? 'yes' : 'no'}</TableCell>
                <TableCell>{user.last_login}</TableCell>
                <TableCell>{user.is_superuser ? 'yes' : 'no'}</TableCell>
            </TableRow>
        </>
        )
}
