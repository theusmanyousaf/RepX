import { MdLogout } from 'react-icons/md'
// TODO: add logout functionality

const Logout = () => {
    return (
        <>
            <img src={"https://lh3.googleusercontent.com/a/ACg8ocJMqbyVoBPQGau0Yu-tgffJ2yt0_TA9HpI_EllDQoZiFXpx-M0g=s360-c-no"} className='w-10 h-10 rounded-full border border-gray-800' />

            <div
                className='cursor-pointer flex items-center p-2 rounded-lg bg-glass mt-auto border border-gray-800'
            >
                <MdLogout size={22} />
            </div>
        </>
    )
}

export default Logout