import React from 'react'
import CopyIcon from './CopyIcon'


function PasswordLIst({passwords, handleDelete, handleEdit}) {
  return (
    <div className="passwords">
    <h2 className='font-bold text-2xl py-2'>Your Passwords</h2>
    {passwords.length === 0 && <div> No passwords to show</div>}
    {passwords.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
        <thead className='bg-green-800 text-white'>
            <tr>
                <th className='py-2'>Site</th>
                <th className='py-2'>Username</th>
                <th className='py-2'>Password</th>
                <th className='py-2'>Actions</th>
            </tr>
        </thead>
        <tbody className='bg-green-100'>
            {passwords.map((item, index) => {
                return <tr key={index}>
                    <td className='py-2 border border-white text-center'>
                        <div className='flex items-center justify-center '>
                            <a className='hover:underline hover:text-green-600' href={item.site} target='_blank'>{item.site}</a>
                             <CopyIcon text={item.site} />                            
                        </div>
                    </td>
                    <td className='py-2 border border-white text-center'>
                        <div className='flex items-center justify-center '>
                            <span>{item.username}</span>
                            <CopyIcon text={item.username} />
                        </div>
                    </td>
                    <td className='py-2 border border-white text-center'>
                        <div className='flex items-center justify-center '>
                            <span>{'*'.repeat(item.password.length)}</span>
                            <CopyIcon text={item.password} />
                        </div>
                    </td>
                    <td className='justify-center py-2 border border-white text-center'>
                        <span onClick={() => handleEdit(item.id)} className='cursor-pointer mx-1'>
                            <lord-icon
                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                trigger="hover"
                                style={{"width":"25px", "height":"25px"}}>
                            </lord-icon>
                        </span>
                        <span onClick={() => handleDelete(item.id)} className='cursor-pointer mx-1'>
                            <lord-icon
                                src="https://cdn.lordicon.com/skkahier.json"
                                trigger="hover"
                                style={{"width":"25px", "height":"25px"}}>
                            </lord-icon>
                        </span>
                    </td>
                </tr>

            })}
        </tbody>
    </table>}
</div>
  )
}

export default PasswordLIst
