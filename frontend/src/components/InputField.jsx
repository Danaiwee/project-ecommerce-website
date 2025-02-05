
const InputField = ({label, icon:Icon, type='text', name, id, placeholder, value, onChange}) => {
  return (
    <div className='w-full flex flex-col'>
        <label
            className='text-gray-300 text-md font-medium'
            htmlFor={id}
        >
            {label}
        </label>
        <div className='w-full relative flex items-center'>
            <Icon 
                className='size-5 absolute left-2 text-gray-400'
            />
            <input 
                type={type}
                name={name}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className='w-full h-9 text-md bg-gray-700 rounded-md pl-10 text-gray-300 border-none outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300'
            />
        </div>
    </div>
  )
}

export default InputField