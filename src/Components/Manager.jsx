import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from "react";
import PasswordLIst from "./PasswordList";


const Manager = () => {

    const imgRef = useRef()
    const passwordRef = useRef()

    const [form, setForm] = useState({
        site: "",
        username: "",
        password: ""
    })
    const [passwordArray, setPasswordArray] = useState([])
    const [editId, setEditId] = useState(null)

    const getPasswords = async () => { 
      let req = await fetch("http://localhost:3000/")
      let passwords = await req.json()
      console.log(passwords)
      setPasswordArray(passwords)
     }

    useEffect(() => {
      getPasswords()
    }, [])
    
    const showPassword = () => {
        passwordRef.current.type = "text"
        if (imgRef.current.src.includes("icons/eyecross.png")) {
            imgRef.current.src = "icons/eye.png"
            passwordRef.current.type = "password"

        }else {
            imgRef.current.src = "icons/eyecross.png"
        passwordRef.current.type = "text"

        }

    }

    const savePassword = async () => { 
        const { site, username, password } = form;
        if (site.length < 3 || username.length < 3 || password.length < 3) {
            toast.info('All fields must be at least 3 characters long', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        return;
      }
        const existingPassIndex = passwordArray.findIndex(item => item.id === editId)
        if (existingPassIndex !== -1) {
          const updatedPassword = { ...form, id: editId };
          const updatedPasswordArray = passwordArray.map((item, index) => {
            if (index === existingPassIndex) {
              return { ...form, id: editId };
            }
            return item;
          });

          console.log("updated array", updatedPasswordArray)
          setPasswordArray(updatedPasswordArray);
          await fetch(`http://localhost:3000/${editId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify( updatedPassword) })

          setEditId(null);
          toast.success('Password Updated...', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        } else {
          const newPassword = { ...form, id: uuidv4() };
          setPasswordArray([...passwordArray, newPassword]);
          // localStorage.setItem("passwords", JSON.stringify([...passwordArray, newPassword]));
          await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newPassword) })

          toast.success('Password Saved...', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        }
      
        setForm({
          site: "",
          username: "",
          password: ""
        });
      }

     const deletePassword = async(id) => {
        let c = confirm("Do you really want to delete this password?")
        if(c){
            setPasswordArray(passwordArray.filter(item=>item.id!==id))
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id))) 
            toast.error('Password Deleted...', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
            
    }
    const editPassword = (id) => {
        setEditId(id);
        const passwordToEdit = passwordArray.find(item => item.id === id)
        setForm(passwordToEdit)
    }

    const handleFormChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value
        })
    }

  return (
    
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"> <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>    
      <div className=" p-3 md:mycontainer min-h-[84vh] ">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-500"> &lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>

        <div className="flex flex-col p-4 text-black gap-8 items-center">
            <input onChange={handleFormChange} value={form.site} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="site" id="site" />
            <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                <input onChange={handleFormChange} value={form.username} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="username" id="username" />
                <div className="relative">
                    <input onChange={handleFormChange} ref={passwordRef} value={form.password} placeholder='Enter Password' className='rounded-full border border-green-500 w-full pl-4 py-1 pr-7' type="password" name="password" id="password" />
                    <span onClick={showPassword} className='absolute right-[3px] top-[4px] cursor-pointer' >
                        <img ref={imgRef}  className='p-1' width={26} src="icons/eye.png" alt="eye" />
                    </span>
                </div>

            </div>
            <button onClick={savePassword}  className='flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900'>
                <lord-icon
                    src="https://cdn.lordicon.com/jgnvfzqg.json"
                    trigger="hover" >
                </lord-icon>
                Save</button>
        </div>
        <PasswordLIst handleDelete={deletePassword} handleEdit={editPassword} passwords={passwordArray}/>
      </div>
    </>
  );
}


export default Manager;

