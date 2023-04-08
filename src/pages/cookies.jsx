import React from 'react'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'

const Cookies = () => {
  return (
    <div className='inset-0 background-auth bg-cover flex justify-center items-center overflow-y-auto p-10'>
      <motion.div className='h-auto bg-white p-5 md:p-10 rounded-xl w-10/12 sm:2-8/12 md:w-6/12 flex flex-col gap-3 shadow-lg'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Cookies policy</h1>
        <p>
          In compliance with the provisions of article 22.2 of Law 34/2002, of July 11, on Services of the Information Society and Electronic Commerce, this web page informs you, in this section, about the policy of collection and cookie treatment .
        </p>
        <h2>What are cookies?</h2>
        <p>A cookie is a file that is downloaded to your computer when accessing certain web pages. Cookies allow a web page, among other things, to store and retrieve information about the browsing habits of a user or their equipment and, depending on the information they contain and the way in which you use your equipment, they can be used to recognize to user. </p>
        <h2>What types of cookies does this website use?</h2>
        <p>This website uses the following types of cookies:</p>
        <h3>Analysis Cookies</h3>
        <p>These are those that, well treated by us or by third parties, allow us to quantify the number of users and thus carry out the measurement and statistical analysis of the use made by users of the service offered. To do this, your browsing on our website is analyzed in order to improve the offer of products or services that we offer you.</p>
        <h3>Technical cookies</h3>
        <p>These are those that allow the user to navigate through the restricted area and use its different functions, such as exchanging the purchase process for an item.</p>
        <h3>Personalization cookies</h3>
        <p>These are those that allow the user to access the service with some predefined general characteristics based on a series of criteria in the user´s terminal, such as the language or type of browser through which the user connects to the service. service.</p>
        <h2>Disable cookies</h2>
        <p>You can allow, block or eliminate the cookies installed on your computer by configuring the options of the browser installed on your computer.</p>
        <p>Most web browsers offer the possibility of allowing, blocking or deleting cookies installed on your computer.</p>
        <p>Below you can access the settings of the most frequent web browsers to accept, install or disable cookies:</p>
        <a className='text-indigo-700 dark:text-indigo-700 cursor-pointer underline hover:text-indigo-900' href='https://support.google.com/chrome/answer/95647?hl=es'>Configure cookies in Google Chrome</a>
        <a className='text-indigo-700 dark:text-indigo-700 cursor-pointer hover:text-indigo-900 underline' href='https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias?redirectlocale=es&redirectslug=habilitar-y-deshabilitar-cookies-que-los-sitios-we'>Configure cookies in Firefox</a>
        <a className='text-indigo-700 dark:text-indigo-700 cursor-pointer hover:text-indigo-900 underline' href='https://support.microsoft.com/es-es/help/17442/windows-internet-explorer-delete-manage-cookies'>Configure cookies in Internet Explorer</a>
        <a className='text-indigo-700 dark:text-indigo-700 cursor-pointer hover:text-indigo-900 underline' href='https://support.apple.com/es-es/guide/safari/sfri11471/mac'>Configure cookies in Safari</a>
        <h2>Warning about deleting cookies</h2>
        <p>You can delete and block all cookies on this site, but part of the site will not work or the quality of the web page may be affected.</p>
        <p>If you have any questions about our cookie policy, you can contact this website through our Contact channels.</p>
        <NavLink className='btn-modal' to='/login'>
          Go back
          <i className='bi bi-arrow-90deg-left text-xl' />
        </NavLink>
      </motion.div>
    </div>
  )
}

export default Cookies
