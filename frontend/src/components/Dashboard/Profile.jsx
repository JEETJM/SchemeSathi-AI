import { useEffect, useState } from "react";
import API from "../../services/api";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState({});
  const [image, setImage] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await API.get("/auth/profile");
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async () => {
    try {
      await API.put("/auth/profile", user);
      alert("Profile Updated");
    } catch (err) {
      alert("Update Failed");
    }
  };

  const uploadImage = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await API.put("/auth/profile/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUser({
        ...user,
        profileImage: res.data.image,
      });

      alert("Image Uploaded");
    } catch (err) {
      alert("Upload Failed");
    }
  };

  return (
    <div className="profilePage">
      <div className="profileCard">
        <div className="profileLeft">
          <img
            src={
              user.profileImage ||
              "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(user.fullName || "User")
            }
            alt=""
          />

          <input type="file" onChange={(e) => setImage(e.target.files[0])} />

          <button onClick={uploadImage}>Upload Photo</button>
        </div>

        <div className="profileRight">
          <input
            name="fullName"
            value={user.fullName || ""}
            onChange={handleChange}
            placeholder="Full Name"
          />

          <input
            name="phone"
            value={user.phone || ""}
            onChange={handleChange}
            placeholder="Phone"
          />

          <input
            name="age"
            value={user.age || ""}
            onChange={handleChange}
            placeholder="Age"
          />

          <select
            name="gender"
            value={user.gender || ""}
            onChange={handleChange}
          >
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            name="state"
            value={user.state || ""}
            onChange={handleChange}
            placeholder="State"
          />

          <input
            name="district"
            value={user.district || ""}
            onChange={handleChange}
            placeholder="District"
          />

          <input
            name="occupation"
            value={user.occupation || ""}
            onChange={handleChange}
            placeholder="Occupation"
          />

          <input
            name="income"
            value={user.income || ""}
            onChange={handleChange}
            placeholder="Income"
          />

          <button onClick={saveProfile}>Save Profile</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
