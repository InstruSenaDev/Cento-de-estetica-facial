import React, { useState } from 'react';
import supabase from '../../supabase/supabaseconfig';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        if (error) {
            console.error('Error actualizando la contraseña:', error.message);
            alert('Error al actualizar la contraseña');
        } else {
            alert('Contraseña actualizada con éxito');
            navigate('/login'); // Redirige al usuario al login o a donde prefieras
        }
    };

    return (
        <div>
            <h2>Restablecer Contraseña</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nueva Contraseña</label>
                    <input 
                        type="password" 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Confirmar Contraseña</label>
                    <input 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Restablecer Contraseña</button>
            </form>
        </div>
    );
};

export default ResetPassword;
