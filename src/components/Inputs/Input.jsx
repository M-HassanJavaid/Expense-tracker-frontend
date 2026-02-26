import React from 'react'
import { useState } from 'react'
import { LuEye , LuEyeClosed } from "react-icons/lu";

const Input = ({ value, label, placeholder, onChange, type }) => {

  const [showPassword, setShowPassword] = useState(false);



  return (
    <div>
      <label className='text-[13px] text-slate-800'>{label}</label>

      <div className='input-box' >
        <input
          type={(type === 'password' && showPassword) ? 'text' : type }
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          className='w-full bg-transparent outline-none'
        />

        {type === 'password' && (
          showPassword ? (
            <LuEye
            size={22}
            className="text-primary cursor-pointer"
            onClick={()=> setShowPassword((prev)=> !prev)}
            />
          ) : (
            <LuEyeClosed
            size={22}
            className="text-slate-400 cursor-pointer"
            onClick={()=> setShowPassword((prev)=> !prev)}
            />
          )
        )}


      </div>
    </div>
  )
}

export default Input