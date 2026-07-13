import "./ProfileCard.css";
import { useEffect, useState } from "react";
import API from "../../services/api";

function ProfileCard({ user: propUser }) {
  const [user, setUser] = useState(propUser || null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (propUser) {
      setUser(propUser);
      return;
    }

    loadProfile();
  }, [propUser]);

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

  const uploadImage = async (e) => {
    try {
      const file = e.target.files[0];

      if (!file) return;

      setUploading(true);

      const formData = new FormData();
      formData.append("image", file);

      const token = localStorage.getItem("token");

      const res = await API.put("/auth/profile/image", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setUser((prev) => ({
        ...prev,
        profileImage: res.data.image,
      }));
    } catch (err) {
      console.log(err);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

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
              alt="Profile"
              className="profileImage"
            />
          : <span>{user.fullName?.charAt(0).toUpperCase()}</span>}
        </div>

        <div>
          <h3>{user.fullName}</h3>

          <p>{user.email}</p>
        </div>
      </div>

      <div className="uploadSection">
        <input type="file" accept="image/*" onChange={uploadImage} />

        {uploading && <p className="uploadingText">Uploading...</p>}
      </div>

      <hr />

      <div className="profileInfo">
        <p>
          <strong>Age :</strong> {user.age || "-"}
        </p>

        <p>
          <strong>Gender :</strong> {user.gender || "-"}
        </p>

        <p>
          <strong>State :</strong> {user.state || "-"}
        </p>

        <p>
          <strong>District :</strong> {user.district || "-"}
        </p>

        <p>
          <strong>Category :</strong> {user.category || "-"}
        </p>

        <p>
          <strong>Occupation :</strong> {user.occupation || "-"}
        </p>

        <p>
          <strong>Income :</strong> ₹ {user.income || 0}
        </p>

        <p>
          <strong>Education :</strong> {user.education || "-"}
        </p>

        <p>
          <strong>Phone :</strong> {user.phone || "-"}
        </p>
      </div>
    </div>
  );
}

export default ProfileCard;
