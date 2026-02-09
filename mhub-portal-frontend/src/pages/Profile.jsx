import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { toast } from "react-toastify";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || "");
  const save = () => {
    toast.success("Profile updated successfully");
  };
  return (
    <div className="center-page">
      <div className="profile-card" style={{width:"420px", background: "#4d941a", padding: "30px", borderRadius: "8px"}}>
        <h2 style={{textAlign: "center", marginBottom: "20px", color: "#fff"}}>My Profile</h2>
        <p style={{textAlign: "center", color: "#fff", marginBottom: "30px"}}>
          View and update your profile information. Keeping your contact details up to date helps us reach you about your innovation projects.  
        </p>
        <div className="profile-header">
          <div>
            <h2>{name}</h2>
            <div className="profile-role">
              {user.role.toUpperCase()}
            </div>
          </div>
        </div>

        <label>Full name</label>
        <input value={user.name} onChange={e => setName(e.target.value)}/>

        <label>Email</label>
        <input value={user.email} disabled />

        <label>Phone</label>
        <input placeholder="Enter Phone number"
         value={phone}
         onChange={e => setPhone(e.target.value)}/>

         <button onClick={save}>Update Profile</button>
      </div>
    </div>
  );
}
