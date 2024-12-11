import mysql from "@/lib/mysql"
import { revalidatePath } from "next/cache"


async function nuevoPaciente(formData) {
    'use server'
    const nombre = formData.get('nombre')
    const localidad = formData.get('localidad')
    const fecha_nacimiento = formData.get('fecha_nacimiento')

    const sql = 'insert into `pacientes` (`nombre`, `localidad`, `fecha_nacimiento`) values (?, ?, ?)'
    const values = [nombre, localidad, fecha_nacimiento];

    const [result, fields] = await mysql.query(sql, values)
    revalidatePath('/pacientes-db')
}



function PacienteNuevo() {
    return (
        <form className='my-10 grid grid-cols-[150px_auto] gap-4'>

            <label htmlFor='nombre'>Nombre</label>
            <input required id='nombre' name='nombre' className='p-1 border border-slate-200 focus:outline-blue-300 text-lg' />

            <label htmlFor='localidad'>Localidad:</label>
            <input required id='localidad' name='fecha_nacimiento' className='p-1 border border-slate-200 focus:outline-blue-300 text-lg' />

            <label htmlFor='fecha_nacimiento'>fecha_nacimiento</label>
            <input required id='fecha_nacimiento' name='fecha_nacimiento' type='text'  className='p-1 border border-slate-200 focus:outline-blue-300 text-lg' />

            <div className='col-span-2 grid gap-2'>
                <button formAction={nuevoPaciente} className='bg-green-600 text-white px-4 py-2 rounded-xl'>
                    Guardar paciente
                </button>
                <button type='reset' className='bg-slate-600 text-white px-4 py-2 rounded-xl'>
                    Limpiar campos
                </button>
            </div>
        </form>
    );
}

export default PacienteNuevo;