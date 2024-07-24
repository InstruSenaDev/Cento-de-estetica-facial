const supabase = require('../Config/db');

const getServices = async () => {
    const { data, error } = await supabase.from('services').select('*');
    if (error) throw error;
    return data;
};

const createService = async (service) => {
    const { data, error } = await supabase.from('services').insert([service]);
    if (error) throw error;
    return data;
};

const deleteService = async (id) => {
    const { data, error } = await supabase.from('services').delete().eq('id', id);
    if (error) throw error;
    return data;
};

module.exports = {
    getServices,
    createService,
    deleteService
};