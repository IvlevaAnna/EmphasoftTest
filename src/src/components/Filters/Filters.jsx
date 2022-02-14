import React from 'react'
import s from './Filters.module.css'
import {Button, IconButton, TextField} from "@mui/material"
import SortIcon from '@mui/icons-material/Sort'
import ClearIcon from '@mui/icons-material/Clear'

export const Filters = ({filters, setFilters}) => {

    const handleChange = (e) => {
        setFilters(prevFilters => ({...prevFilters, username: e.target.value}))
    }

    const handleClickSort = () => {
        setFilters(prevFilters => ({...prevFilters, sort: true}))
    }

    const handleClickClear = () => {
        setFilters(prevFilters => ({...prevFilters, username: '', sort: false}))
    }

    return(
        <div className={s.container}>
            <div className={s.filters}>
                <TextField sx={{width: 120}} size='small' label="Username" variant="outlined" value={filters.username} onChange={handleChange}/>
                <Button style={{background: '#2c387e'}} variant="contained" endIcon={<SortIcon />} onClick={handleClickSort}>
                    <span className={s.text}>Sort by Id</span>
                </Button>
            </div>
            <IconButton aria-label="clear filters" onClick={handleClickClear}>
                <ClearIcon />
            </IconButton>
        </div>
    )
}
