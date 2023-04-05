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
import SetPassword from './forms/setPassword'
import VerifyEmail from './forms/verifyEmail'

const ProfileView = () => {
  const { methods, user } = useContext(AuthContext)

  return (
    <motion.section className='col-span-12 lg:col-span-8 m-6 lg:w-5/6'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className='pb-4 border-b-2 border-purple-500'>
        <h1 className="text-5xl font-bold">
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
        {methods.includes('Password') && <ChangeEmail/>}
        {/** Verify email */}
        {!user.emailVerified && <VerifyEmail/>}
        {/** Password */}
        {methods.includes('Password') && <ChangePassword/>}
        {/** Set password */}
        {!methods.includes('Password') && <SetPassword/>}
        {/** Services you use to sign in */}
        {/** Delete account */}
        <DeleteUser/>
        <MethodSignIn/>
      </div>
    </motion.section>
  )
}

export default ProfileView
