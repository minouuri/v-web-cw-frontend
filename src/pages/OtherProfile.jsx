import ProfileUser from "../components/ProfileUser";
import ProfileTagsRoles from "../components/ProfileTagsRoles";
import ProfileAuthorOfProjects from "../components/ProfileAuthorOfProjects";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

export default function OtherProfile() {
    const { userId } = useParams();
    const location = useLocation();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem("token");
                let url = null;
                if (userId) {
                  url = `http://155.212.247.183:5000/api/profile/${userId}`;
                } else {
                  // ищем ?username=...
                  const params = new URLSearchParams(location.search);
                  const username = params.get("username");
                  if (username) {
                    url = `http://155.212.247.183:5000/api/profile/username/${username}`;
                  } else {
                    setError("Не указан пользователь");
                    setLoading(false);
                    return;
                  }
                }
                const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
                if (!res.ok) throw new Error("Ошибка загрузки профиля");
                const data = await res.json();
                setProfile(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [userId, location.search]);

    if (loading) {
        return <div className="status-message loading">Загрузка профиля...</div>;
    }
    if (error || !profile) {
        return <div className="status-message error">Профиль пользователя не найден</div>;
    }

    return (
        <div className="profile_grid">
            <div className="main-content">
                <ProfileUser user={profile} />
                <ProfileTagsRoles user={profile} />
                <ProfileAuthorOfProjects user={profile} />
            </div>
        </div>
    );
}

