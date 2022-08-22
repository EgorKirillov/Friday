import React from 'react'
import {useForm} from 'react-hook-form';
import {NavLink} from 'react-router-dom';
import style from './registation.module.css'
import s from '../../../common/components/DevHeader/DevHeader.module.css';
import {PATH} from '../../../common/components/Routing/SwitchRoutes';
import SuperButton from '../../../common/components/c2-SuperButton/SuperButton';

type RegistrationType = {
    email: string,
    password1: string,
    password2: string
}

export function Registration() {

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<RegistrationType>({
        defaultValues: {
            email: '',
            password1: '',
            password2: ''
        }
    });

    const onSubmit = handleSubmit((data: RegistrationType) => {
        if (data) {
            alert(JSON.stringify(data))
        }
        return <h1>none</h1>
    })


    return (
        <div className={style.container}>
            <div className={style.form}>
                <h2>Sing Up</h2>
                <form onSubmit={onSubmit}>
                    <div>
                        <div><label className={style.nameForm}>Email</label></div>
                        <div><input {...register('email')} defaultValue="test"/></div>
                    </div>
                    <div>
                        <div><label className={style.nameForm}>Password</label></div>
                        <div><input
                            {...register('password1', {required: true, maxLength: 10})}
                        /></div>
                        {errors.password1 && <p>This field is required</p>}
                    </div>
                    <div>
                        <label className={style.nameForm}>Confirm password</label>
                        <div><input
                            {...register('password2', {required: true, maxLength: 10})}
                        /></div>
                        {errors.password2 && <p>This field is required</p>}
                    </div>

                    <SuperButton type="submit">Sing Up</SuperButton>
                    <div>Already have an account?</div>
                    <NavLink className={s.link} to={PATH.LOGIN}>
                        Sing In{' '} </NavLink>

                </form>
            </div>
        </div>
    );
}
