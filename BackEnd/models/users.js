const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

// Inicializa el cliente de Supabase
const supabaseUrl = 'TU_SUPABASE_URL';
const supabaseKey = 'TU_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

// Función para crear un nuevo usuario
const createUser = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
        .from('users') // Asegúrate de que la tabla se llama 'users'
        .insert([{ username, password: hashedPassword }]);

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

// Función para verificar la contraseña
const matchPassword = async (enteredPassword, storedPassword) => {
    return await bcrypt.compare(enteredPassword, storedPassword);
};

module.exports = { createUser, matchPassword };
