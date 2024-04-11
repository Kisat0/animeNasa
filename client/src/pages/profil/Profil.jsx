import React, { useState } from 'react';
import './Profil.scss';
import { useUser } from '../../utils/useUser';
import Navbar from '../../components/navbar/Navbar';
import { EditPen } from '../../utils/Icons';
import axios from 'axios';

const Profil = () => {
    const { user } = useUser();
    const [newAvatar, setNewAvatar] = useState(user.avatar);
    const [selectedButton, setSelectedButton] = useState('');
    const [formData, setFormData] = useState({
        identifier: user.username,
        newEmail: user.email,
        newPassword: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [editingUsername, setEditingUsername] = useState(false);
    const [editingEmail, setEditingEmail] = useState(false);
    const [editingMdp, setEditingMdp] = useState(false);

    const formChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const FormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`${process.env.REACT_APP_API_ADDRESS}/users/updateUser/${user._id}`, {
                ...formData,
                action: selectedButton,
            });

            if (response.status === 200) {
                setSuccessMessage('Changement effectué');
                location.reload()
            } else {
                setError('Une erreur s\'est produite lors du changement.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Une erreur s\'est produite lors de l\'envoi de la requête.');
        }
    };


    const ImageChange = async (e) => {
        const file = e.target.files[0];
        const extension = file.name.split('.').pop().toLowerCase();
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        if (imageExtensions.includes(extension)) {
            const data = new FormData();
            data.append('image', file);

            try {
                const response = await fetch('https://api.imgbb.com/1/upload?key=3a53bbef9f1721eb182d5afca37ef84b', {
                    method: 'POST',
                    body: data,
                });

                if (!response.ok) {
                    throw new Error('Failed to upload image');
                }

                const responseData = await response.json();
                setNewAvatar(responseData.data.url);

                await ChangeAvatar(responseData.data.url);
            } catch (error) {
                console.error("Une erreur s'est produite", error);
            }
        } else {
            console.error("Le fichier n'est pas une image valide");
            setError('Le format d\'image n\'est pas bon');
        }
    };


    const ChangeAvatar = async (newAvatarUrl) => {
        try {
            const res = await axios.put(
                `${process.env.REACT_APP_API_ADDRESS}/users/changeAvatar/${user._id}`,
                { newAvatar: newAvatarUrl },
                { headers: { 'Content-Type': 'application/json' } }
            );
            if (res.status === 200) {
                console.log("L'avatar a été changé");
                location.reload()

            } else {
                console.log("La requête a échoué avec le code :", res.status);
            }
        } catch (error) {
            console.error("Une erreur s'est produite", error);
        }
    };



    return (
        <div className='flex-container'>
            <Navbar />
            <img src='https://wallpapers-clan.com/wp-content/uploads/2024/02/monkey-d-luffy-clouds-one-piece-desktop-wallpaper-preview.jpg' className='background login-background' />
            <div className='profile-title'>
                <h1>Profil</h1>
            </div>
            <div>
                <div className='profile-container'>
                        <div className='profile-image'>
                            <input type='file' id='Image' style={{ display: 'none' }} onChange={ImageChange} />
                            <img src={user.avatar} className='img-profile' alt='photo de profil' />
                            <label htmlFor='Image'>
                                <EditPen />
                            </label>
                        </div>
                        <div className='profile-username'>
                            {editingUsername ? (
                                <form onSubmit={FormSubmit}>
                                    <input
                                        type="text"
                                        
                                        name="identifier"
                                        value={formData.identifier}
                                        onChange={formChange}
                                        required
                                    />
                                    <button className="button-profile" type="submit">Valider</button>
                                    <button className="button-profile" onClick={() => { setEditingUsername(false) }}>Annuler</button>
                                </form>
                            ) : (
                                <div className='profile-username'>
                                    <h1 onClick={() => { setSelectedButton('pseudo'); setEditingUsername(true); }}>{user.username}</h1>
                                </div>
                            )}
                        </div>
                    
                    <div className='profile-email'>
                        <p className='txt-data-profile'>Mail :‎ ‎ </p>
                        {editingEmail ? (
                            <form className='form-profile' onSubmit={FormSubmit}>
                                <input
                                    type="text"
                                    
                                    name="newEmail"
                                    value={formData.newEmail}
                                    onChange={formChange}
                                    required
                                />
                                <button className="button-profile" type="submit">Valider</button>
                                <button className="button-profile" onClick={() => { setEditingEmail(false) }}>Annuler</button>
                            </form>
                        ) : (
                            <div className=''>
                                <p onClick={() => { setSelectedButton('email'); setEditingEmail(true); }}>{user.email}</p>
                            </div>
                        )}
                    </div>
                    <div className='profile-mdp'>
                        <p>Mot de passe :‎ ‎</p>
                        {editingMdp ? (
                            <form onSubmit={FormSubmit}>
                                <input
                                    type="password"
                                    
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={formChange}
                                    required
                                />
                                <button className="button-profile" type="submit">Valider</button>
                                <button className="button-profile" onClick={() => { setEditingMdp(false) }}>Annuler</button>
                            </form>
                        ) : (
                            <div className=''>
                                <p onClick={() => { setSelectedButton('mdp'); setEditingMdp(true); }}>********</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {successMessage && <p>{successMessage}</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default Profil;