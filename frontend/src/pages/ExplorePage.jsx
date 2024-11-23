import { useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";
import Repos from "../components/Repos";

const ExplorePage = () => {
    const Languages = ["javascript", "typescript", "c++", "python", "java"];
    const [loading, setLoading] = useState(false);
    const [repos, setRepos] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState("");

    const exploreRepos = async (language) => {
        setLoading(true);
        setRepos([]);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/explore/repos/${language}`);
            const { repos } = await res.json();
            setRepos(repos);

            setSelectedLanguage(language);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className='px-4'>
            <div className='bg-glass max-w-2xl mx-auto rounded-md p-4'>
                <h1 className='text-xl font-bold text-center'>Explore Popular Repositories</h1>
                <div className='flex flex-wrap gap-2 my-2 justify-center'>
                    {Languages.map((language) => (
                        <img
                            key={language}
                            src={`/${language}.svg`}
                            alt={language + " logo"}
                            className='h-11 sm:h-20 cursor-pointer'
                            onClick={() => exploreRepos(language)}
                        />
                    ))}
                </div>
                {repos?.length > 0 && (
                    <h2 className='text-lg font-semibold text-center my-4'>
                        <span className='bg-blue-100 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded-full '>
                            {selectedLanguage.toUpperCase()}{" "}
                        </span>
                        Repositories
                    </h2>
                )}
                {!loading && repos?.length > 0 && <Repos repos={repos} alwaysFullWidth />}
                {loading && <Spinner />}
            </div>
        </div>
    );
};
export default ExplorePage;