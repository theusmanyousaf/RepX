import { useState, useEffect, useCallback } from "react"
import toast from "react-hot-toast"

import Search from "../components/Search"
import ProfileInfo from "../components/ProfileInfo"
import SortRepos from "../components/SortRepos"
import Repos from "../components/Repos"
import Spinner from "../components/Spinner"

const HomePage = () => {
    const [userProfile, setUserProfile] = useState({});
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sortType, setSortType] = useState("recent");

    const getUserGithubData = useCallback(async (username = "theusmanyousaf") => {
        setLoading(true);
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            const userProfile = await response.json();
            setUserProfile(userProfile);
            const userRepos = await fetch(userProfile.repos_url);
            const repos = await userRepos.json();
            setRepos(repos);
            return { userProfile, repos };
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getUserGithubData();
    }, [getUserGithubData]);

    const onSearch = async (e, username) => {
        e.preventDefault();

        setLoading(true);
        setRepos([]);
        setUserProfile(null);

        const { userProfile, repos } = await getUserGithubData(username);
        setUserProfile(userProfile);
        setRepos(repos);
        setLoading(false);
    }

    return (
        <div className='m-4'>
            <Search onSearch={onSearch} />
            <SortRepos />
            <div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
                {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}

                {!loading && <Repos repos={repos} />}
                {loading && <Spinner />}
            </div>
        </div>
    )
}

export default HomePage