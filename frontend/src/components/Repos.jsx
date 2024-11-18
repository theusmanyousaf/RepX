import Repo from './Repo'

const Repos = () => {
    return (
        <div className={`bg-glass rounded-lg px-8 py-6`}>
            <ol className='relative border-s border-gray-200'>
                <Repo />
                <Repo />
                <Repo />
                <Repo />
                <Repo />
                <Repo />
                <Repo />
            </ol>
        </div>
    )
}

export default Repos