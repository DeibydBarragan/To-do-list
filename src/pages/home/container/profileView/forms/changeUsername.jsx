/* eslint-disable no-unused-vars */
import { React, useContext, useState } from 'react'
import { AuthContext } from '../../../../../components/context/authContext'
import Modal from '../../../../../components/pure/modal/modal'
import { AnimatePresence } from 'framer-motion'
import { chooseNameSchema } from './../../../../../components/forms/formSchema/chooseNameSchema'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Popover from '../../../../../components/forms/pure/popover'
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../../../../../firebase/firebase'

const ChangeUsername = () => {
  const { userName, user, setUserName } = useContext(AuthContext)
  const [showForm, setShowForm] = useState(false)
  // Form validation
  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(chooseNameSchema)
  })

  const onSubmit = async (data) => {
    // Query to get the document with the user id
    const q = query(collection(db, 'usernames'), where('userId', '==', user?.uid))
    try {
      // Get the document
      const querySnapshot = await getDocs(q)
      // Update the document
      await updateDoc(querySnapshot.docs[0].ref, { username: data.username })
      // set the new username
      setUserName(data.username)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className='relative'>
      <h4>
        {userName}
        <i onClick={() => setShowForm(!showForm)} className='bi bi-pencil-square text-2xl ml-2 cursor-pointer'/>
        <AnimatePresence>
          {showForm && <Modal setShow={setShowForm}>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
              <h2 className='text-3xl sm:text-4xl'>Change username</h2>
              <div className='relative'>
                <input
                  type='text'
                  className='input-tasks w-full'
                  placeholder='New username'
                  autoComplete='off'
                  maxLength='15'
                  {...register('username')}
                />
                <AnimatePresence>
                  {errors.username && <Popover>{errors.username.message}</Popover>}
                </AnimatePresence>
              </div>
              <button className='btn' type='submit'>
                Change
                <i className='bi bi-pen ml-2'/>
              </button>
            </form>
          </Modal>}
        </AnimatePresence>
      </h4>
    </div>
  )
}

export default ChangeUsername
