import React, {useState, useEffect} from 'react'
import s from './Main.module.css'
import {Filters} from "../../components/Filters/Filters"
import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material"
import {User} from "../../components/User/User"
import {getData, getToken} from "../../API"
import LogoutIcon from '@mui/icons-material/Logout'
import {useNavigate} from "react-router"


export const Main = () => {
    const [data, setData] = useState([])
    const [filters, setFilters] = useState({
        username: '',
        sort: false
    })
    const navigate = useNavigate()

    useEffect(() => {
        const username = sessionStorage.getItem('username')
        const password = sessionStorage.getItem('password')

        getToken(username, password)
            .then(result => {
                getData(result.token)
                    .then(result => setData(result))
            })
    }, [])

    useEffect(() => {
        if (filters.sort) {
            setData([...data].sort((a,b) => b.id - a.id))
        } else {
            const username = sessionStorage.getItem('username')
            const password = sessionStorage.getItem('password')

            getToken(username, password)
                .then(result => {
                    getData(result.token)
                        .then(result => setData(result))
                })
        }
    }, [filters.sort])

    useEffect(() => {
        const username = sessionStorage.getItem('username')
        const password = sessionStorage.getItem('password')

        getToken(username, password)
            .then(result => {
                getData(result.token)
                    .then(result => {setData(
                        result.filter((el) => {
                            return el.username.toLowerCase().indexOf(filters.username.toLowerCase()) > -1
                        }))
                    })
            })

        if (filters.sort) {
            setData([...data].sort((a,b) => b.id - a.id))
        }
    }, [filters.username])

    const handleClickLogOut = () => {
        sessionStorage.clear()
        navigate('../', {replace: true})
    }

    return (
        <>
            <div className={s.header}>
                <Filters filters={filters}
                         setFilters={setFilters}
                />
                <IconButton aria-label="LogOut" onClick={handleClickLogOut}>
                    <LogoutIcon />
                </IconButton>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>First name</TableCell>
                            <TableCell>Last name</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell>Last login</TableCell>
                            <TableCell>Superuser status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { data.map((user) => {
                            return <User user={user} key={`${user.id}-${Date.now()}`}/>
                        })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
