import "./ProfileCard.css";
import { useEffect, useState } from "react";
import API from "../../services/api";

function ProfileCard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadProfile();
  }, []);

  if (!user) {
    return <div className="profileCard">Loading...</div>;
  }

  return (
    <div className="profileCard">
      <div className="profileHeader">
        <div className="avatar">
          {user.profileImage ?
            <img
              src={user.profileImage}
              alt="profile"
              className="profileImage"
            />
          : user.fullName?.charAt(0)}
        </div>
        <div>
          <h3>{user.fullName}</h3>

          <p>{user.email}</p>
        </div>
      </div>

      <input
  type="file"
  onChange={uploadImage}
/>



      <hr />

      <div className="profileInfo">
        <p>
          <strong>Age:</strong> {user.age || "-"}
        </p>

        <p>
          <strong>Gender:</strong> {user.gender || "-"}
        </p>

        <p>
          <strong>State:</strong> {user.state || "-"}
        </p>

        <p>
          <strong>District:</strong> {user.district || "-"}
        </p>

        <p>
          <strong>Occupation:</strong> {user.occupation || "-"}
        </p>

        <p>
          <strong>Income:</strong> ₹ {user.income || 0}
        </p>
      </div>
    </div>
  );
}



const uploadImage = async (e) => {
  try {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("image", file);

    const token = localStorage.getItem("token");

    const res = await API.put(
      "/auth/profile/image",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setUser((prev) => ({
      ...prev,
      profileImage: res.data.image,
    }));
  } catch (err) {
    console.log(err);
  }
};

export default ProfileCard;
