import React from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {Redirect} from 'react-router-dom';
import {useFormik} from "formik";
import {loginTC} from "./auth-reducer";

export const Login = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const formik = useFormik({
        validate: (values) => {
            if(!values.email) {
                return {
                    email: "Email is required"
                }
            } if (!values.password){
                return {
                    email: "Password is required"
                }
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: true
        },
        onSubmit: values => {
            dispatch(loginTC(values));
        },
    });

    if (isLoggedIn) {
        return <Redirect to={"/"}/>
    }

    return <Grid container justify="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}>here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            name="email"
                            {...formik.getFieldProps("email")}
                        />
                        {formik.errors.email? <div>{formik.errors.email}</div> : null}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            name="password"
                            {...formik.getFieldProps("password")}
                        />
                        {formik.errors.password? <div>{formik.errors.password}</div> : null}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox
                                {...formik.getFieldProps("rememberMe")}
                                onChange={formik.handleChange}
                                checked={formik.values.rememberMe}
                                name="rememberMe"/>}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
