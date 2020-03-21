import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const CategoryOptions = props => props.categories.map(c => <option value={c}> {c} </option>)

export default function ShopForm() {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch('/.netlify/functions/categoryList')
            .then(res => res.json())
            .then(response => {
                setCategories(response.categories)
            })
            .catch(err => console.log('Error retrieving categories: ', err))
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Shop Name" name="Shop Name" ref={register({ required: true, maxLength: 80 })} />
            <select name="Shop Category" ref={register({ required: true })}>
                {categories && <CategoryOptions categories={categories} />}
            </select>
            <input type="url" placeholder="Shop Link" name="Shop Link" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />

            <input type="submit" />
        </form>
    );
}

