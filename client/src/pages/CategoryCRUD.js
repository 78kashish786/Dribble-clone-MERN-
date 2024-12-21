import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import CategoryForm from '../components/CategoryForm';
import { Modal } from 'antd'
const CategoryCRUD = () => {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedCategory, setUpdatedCategory] = useState('');

    const handleSubmit = async (e) => {

        try {
            const { data } = await axios.post('http://localhost:8080/api/v1/profile/category/create-category', { name });
            if (data?.success) {
                toast.success(`${name} is added to category`);

                GetAllCategories();
            } else {
                toast.error(data?.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Cannot Add Category")
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`http://localhost:8080/api/v1/profile/category/update-category/${selected}`, { name: updatedCategory })
            if (data?.success) {
                toast.success(`${updatedCategory} is updated`);
                setSelected(null);
                setUpdatedCategory('')
                setVisible(false);
                GetAllCategories();
            } else {
                toast.error(data?.message);
            }
        } catch (err) {
            console.log(err);
            toast.error('Somethign went wrong')
        }
    }

    const handleDelete = async (cid) => {
        try {
            const { data } = await axios.delete(`http://localhost:8080/api/v1/profile/category/delete-category/${cid}}`)
            if (data?.success) {
                toast.success(`${name} is updated`);
                GetAllCategories();
            } else {
                toast.error(data?.message);
            }
        } catch (err) {
            console.log(err);
            toast.error('Somethign went wrong')
        }
    }
    const GetAllCategories = async () => {
        try {

            const { data } = await axios.get('http://localhost:8080/api/v1/profile/category/categories');
            if (data?.success) {
                setCategories(data?.AllCategories);
            }


        } catch (error) {
            console.log(error);
            toast.error('Cannot Get Categories');
        }
    }

    useEffect(() => {
        GetAllCategories();
    }, [])

    return (
        <div className='px-8 py-4'>
            <h1 className='text-4xl  '>Categories</h1>
            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
            <ul className=' bg-white px-10 py-3 m-2'>
                <li>
                    {
                        categories.map((c) =>
                            <>
                                <div key={c._id} className='flex justify-between items-center p-4 border-2'>
                                    <h1 className='text-2xl font-[600]'>{c.name}</h1>
                                    <div className='flex gap-7'>
                                        <button onClick={() => {
                                            setVisible(true)
                                            setUpdatedCategory(c.name)
                                            setSelected(c._id);
                                        }} className='px-4 py-2 bg-blue-800 rounded-md text-xl font-[600] text-white'>Edit</button>
                                        <button onClick={() => handleDelete(c._id)} className='px-4 py-2 bg-red-800 rounded-md text-xl font-[600] text-white'>Delete</button>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </li>
            </ul>
            <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
                <CategoryForm value={updatedCategory} setValue={setUpdatedCategory} handleSubmit={handleUpdate} />
            </Modal>
        </div>
    )
}

export default CategoryCRUD
