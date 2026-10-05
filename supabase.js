require('dotenv').config();
const { creatClient } = require('@supabase/supabase-js');

//variaveis de ambientes do arquivo .env
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

//Alerta visual
if(!supabaseUrl || !supabase || supabaseUrl.includes ('seu-projeto')){
    console.log('/n Atenção: não configurado .env');
    console.log('Abra a arquivo backend/ .env \n');
}
const supabase = createClient(supabaseUrl || '', supabaseKey || '');
module.exports = supabase;