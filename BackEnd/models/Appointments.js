const supabase = require('../Config/db');

const getAppointments = async () => {
    const { data, error } = await supabase.from('appointments').select('*');
    if (error) throw error;
    return data;
};

const createAppointment = async (appointment) => {
    const { data, error } = await supabase.from('appointments').insert([appointment]);
    if (error) throw error;
    return data;
};

const deleteAppointment = async (id) => {
    const { data, error } = await supabase.from('appointments').delete().eq('id', id);
    if (error) throw error;
    return data;
};

module.exports = {
    getAppointments,
    createAppointment,
    deleteAppointment
};