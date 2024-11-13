import React from 'react'

function Footer() {

    function getCurrentYear() {
        return new Date().getFullYear();
      }
  return (
<footer class="bg-[#09090b]">
<hr/>
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
            <a href="https://flowbite.com/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
               
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Zarch.AI</span>
            </a>
             <div className='text-white'>
                Email: <span>smzaid321@gmail.com</span>
             </div>
             <div className='text-white'>
                Phone: <span>+91 6299979103</span>
             </div>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© {getCurrentYear()} <a href="https://mdzaid3133.netlify.app/" class="hover:underline">Zarch.ai</a>. All Rights Reserved.</span>
    </div>
</footer>


  )
}

export default Footer