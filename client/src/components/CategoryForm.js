import React from 'react'

const CategoryForm = ({handleSubmit,value,setValue}) => {
  return (
    <div>
      <div className='m-4 p-2 border-2 rounded-xl '>
            <h1>Add A Category</h1>
            <input className='p-2 decoration-0' placeholder='Enter New Category ' value={value} 
            onChange={(e)=>setValue(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  )
}

export default CategoryForm
