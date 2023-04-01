import { React, useContext } from 'react'
import TodayDate from '../../../../components/interface/taskList/pure/todayDate'
import ChangePassword from './forms/changePassword'
import DeleteUser from './forms/deleteUser'
import PictureOptions from './container/PictureOptions'
import ChangeUsername from './forms/changeUsername'
import ChangeEmail from './forms/changeEmail'
import MethodSignIn from './forms/methodSignIn'
import { motion } from 'framer-motion'
import { AuthContext } from '../../../../components/context/authContext'

const ProfileView = () => {
  const { user } = useContext(AuthContext)
  return (
    <motion.section className='col-span-12 lg:col-span-8 m-6 lg:w-5/6'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className='pb-4 border-b-2 border-purple-500'>
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
          Profile
        </h1>
        <TodayDate/>
      </div>
      <div className='flex flex-col mt-6 divide-y divide-slate-300 dark:divide-slate-700'>
        {/** Picture options */}
        <PictureOptions/>
        {/** Username */}
        <ChangeUsername/>
        {/** Email */}
        {user.providerData[0].providerId === 'password' && <ChangeEmail/>}
        {/** Password */}
        {user.providerData[0].providerId === 'password' && <ChangePassword/>}
        {/** Delete account */}
        <DeleteUser/>
        {/** Services you use to sign in */}
        <MethodSignIn/>
      </div>
    </motion.section>
  )
}

export default ProfileView
