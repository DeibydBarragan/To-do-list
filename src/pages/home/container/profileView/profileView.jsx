import { React } from 'react'
import TodayDate from '../../../../components/interface/taskList/pure/todayDate'
import UserInfo from './container/userInfo'
import ChangePicture from './forms/changePicture'
import DeletePicture from './forms/deletePicture'
import ChangePassword from './forms/changePassword'
import DeleteUser from './forms/deleteUser'

const ProfileView = () => {
  return (
    <section className='col-span-12 lg:col-span-8 m-6'>
      <div className='pb-4 border-b-2 border-purple-500'>
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
          Profile
        </h1>
        <TodayDate/>
      </div>
      <div className='flex flex-col sm:flex-row mt-6 gap-4 sm:gap-7 sm:justify-center xl:justify-start'>
        {/** User info */}
        <UserInfo/>
        <div className='flex flex-col gap-4'>
          {/** Change picture */}
          <ChangePicture/>
          {/** Delete picture */}
          <DeletePicture/>
          {/** Change password */}
          <ChangePassword/>
          {/** Delete user */}
          <DeleteUser/>
        </div>
      </div>
    </section>
  )
}

export default ProfileView
