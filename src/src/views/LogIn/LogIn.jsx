import React, {useState} from 'react'
import s from './LogIn.module.css'
import {Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material"
import {Visibility, VisibilityOff} from "@mui/icons-material"
import {useNavigate} from "react-router"
import {getToken} from "../../API";

export const LogIn = ({username, setUsername, password, setPassword}) => {
    const [showPassword, setShowPassword] = useState(false)
    const [validation, setValidation] = useState(false)
    const navigate = useNavigate()

    const handleChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        sessionStorage.setItem('username', username)
        sessionStorage.setItem('password', password)
        getToken(username, password)
            .then(result => {
                result.token ? setValidation(false) : setValidation(true)
                return result.token ?
                navigate('../main', {replace: true}) : setValidation(true)
            })
    }

    return(
        <>
            <form className={s.container}>
                <div className={validation ? s.visible : s.hidden}>Username or password is incorrect</div>
                <TextField required label="Username" variant="outlined" value={username} onChange={handleChangeUsername}/>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={handleChangePassword}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <Button type='submit' variant='outlined' onClick={handleSubmit}>Log In</Button>
            </form>
        </>
    )
}
