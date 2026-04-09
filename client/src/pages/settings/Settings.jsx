import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
import { toast } from "react-toastify";

// Ikonkalar
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { User, Mail, UserCheck, Save, Lock } from "lucide-react";

import "./Settings.css";

const AVATARS = ["😀", "😎", "🤓", "🧐", "🥳", "😇", "🤠", "🤖"]; // emoji avatars

const Settings = () => {
    const { user, loading, setUser } = useAuth();
    const [form, setForm] = useState({
        name: "", lastName: "", login: "", currentPassword: "", newPassword: "", gender: "", who: ""
    });

    const [avatarIndex, setAvatarIndex] = useState(0);
    const [showCurrentPass, setShowCurrentPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name || "",
                lastName: user.lastName || "",
                login: user.login || "",
                currentPassword: "",
                newPassword: "",
                gender: user.gender || "",
                who: user.role || user.who || ""
            });

            setAvatarIndex(user.avatarIndex || 0);
        }
    }, [user]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSave = async () => {
        if (form.newPassword && !form.currentPassword) {
            toast.warn("Current password required for security.");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await api.post("/change-profile", {
                ...form,
                avatarIndex
            }, {
                withCredentials: true
            });

            if (response.data.success) {
                toast.success("Profile synchronized with cloud!");
                setForm(prev => ({ ...prev, currentPassword: "", newPassword: "" }));
                setUser(prev => ({ ...prev, ...form, avatarIndex }));
            }
        } catch (error) {
            const msg = error.response?.data?.message || "Sync failed. Check connection.";
            toast.error(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    

    if (loading) return <div className="settings-loader-container"><div className="loader-neon"></div></div>;

    return (
        <div className="settings-page">
            <div className="settings-glow-top"></div>
            <div className="settings-glow-bottom"></div>

            <div className="settings-container">
                {/* Header Section */}
                <div className="settings-header">
                    <div className="profile-hero">
                        <div className="avatar-preview-box">
                            {AVATARS[avatarIndex]}
                        </div>

                        <div className="profile-meta">
                            <h1>Account Settings<span>.</span></h1>
                            <p>Manage your identity and security preferences</p>

                            {/* Emoji tanlash */}
                            <div style={{ display: "flex", gap: "8px", marginTop: "10px", flexWrap: "wrap" }}>
                                {AVATARS.map((av, i) => (
                                    <span
                                        key={i}
                                        style={{
                                            cursor: "pointer",
                                            fontSize: 32,
                                            border: i === avatarIndex ? "2px solid #0bf" : "2px solid transparent",
                                            borderRadius: "8px",
                                            padding: "4px"
                                        }}
                                        onClick={() => setAvatarIndex(i)}
                                    >
                                        {av}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Body */}
                <div className="settings-form-grid">
                    {/* Basic Info */}
                    <div className="settings-card">
                        <h3 className="card-label"><User size={18} /> Personal Information</h3>
                        <div className="input-group-row">
                            <div className="field-box">
                                <label>First Name</label>
                                <input name="name" value={form.name || ""} onChange={handleChange} />
                            </div>
                            <div className="field-box">
                                <label>Last Name</label>
                                <input name="lastName" value={form.lastName || ""} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="field-box">
                            <label>Username / Login</label>
                            <div className="iconic-input">
                                <Mail size={16} />
                                <input name="login" value={form.login || ""} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    {/* Security */}
                    <div className="settings-card">
                        <h3 className="card-label"><Lock size={18} /> Security & Password</h3>
                        <div className="field-box">
                            <label>Current Password</label>
                            <div className="input-wrapper password-field">
                                <input
                                    type={showCurrentPass ? "text" : "password"}
                                    name="currentPassword"
                                    placeholder="Enter current password"
                                    value={form.currentPassword || ""}
                                    onChange={handleChange}
                                />
                                <span className="toggle-password" onClick={() => setShowCurrentPass(!showCurrentPass)}>
                                    {showCurrentPass ? <VisibilityIcon sx={{ fontSize: 20 }} /> : <VisibilityOffIcon sx={{ fontSize: 20 }} />}
                                </span>
                            </div>
                        </div>

                        <div className="field-box">
                            <label>New Password</label>
                            <div className="input-wrapper password-field">
                                <input
                                    type={showNewPass ? "text" : "password"}
                                    name="newPassword"
                                    placeholder="Enter new password"
                                    value={form.newPassword || ""}
                                    onChange={handleChange}
                                />
                                <span className="toggle-password" onClick={() => setShowNewPass(!showNewPass)}>
                                    {showNewPass ? <VisibilityIcon sx={{ fontSize: 20 }} /> : <VisibilityOffIcon sx={{ fontSize: 20 }} />}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="settings-card full-width">
                        <h3 className="card-label"><UserCheck size={18} /> Role & Preferences</h3>
                        <div className="input-group-row">
                            <div className="field-box">
                                <label>Gender</label>
                                <select name="gender" value={form.gender || ""} onChange={handleChange}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div className="field-box">
                                <label>System Role</label>
                                <select name="who" value={form.who || ""} onChange={handleChange}>
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                    <option value="pupil">Pupil</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="settings-actions">
                    <button type="button" className="cancel-btn" onClick={() => window.location.reload()}>Discard Changes</button>
                    <button className="submit-btn" onClick={handleSave} disabled={isSubmitting}>
                        {isSubmitting ? "Syncing..." : <><Save size={18} /> Save Profile</>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;