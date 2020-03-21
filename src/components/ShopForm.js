import React from 'react';
import { useForm } from 'react-hook-form';

export default function ShopForm() {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Shop Name" name="Shop Name" ref={register({ required: true, maxLength: 80 })} />
            <select name="Shop Category" ref={register({ required: true })}>
                <option value="Pharmacy">Pharmacy</option>
                <option value=" Grocer"> Grocer</option>
                <option value=" "> </option>
            </select>
            <input type="url" placeholder="Shop Link" name="Shop Link" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />

            <input type="submit" />
        </form>
    );
}

