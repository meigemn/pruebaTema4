import mysql from "@/lib/mysql"
import { revalidatePath } from "next/cache"


async function nuevoEstudiante(formData) {
    'use server'
    const nombre = formData.get('nombre')
    const fecha_nacimiento = formData.get('fecha_nacimiento')
    const domicilio = formData.get('domicilio')

    const sql = 'insert into `estudiantes` (`nombre`, `domicilio`, `fecha_nacimiento`) values (?, ?, ?)'
    const values = [nombre, domicilio, fecha_nacimiento];

    const [result, fields] = await mysql.query(sql, values)
    revalidatePath('/estudiantes-db')
}



function EstudianteNuevo() {
    return (
        <form className='my-10 grid grid-cols-[150px_auto] gap-4'>

            <label htmlFor='nombre'>Nombre</label>
            <input required id='nombre' name='nombre' className='p-1 border border-slate-200 focus:outline-blue-300 text-lg' />

            <label htmlFor='fecha_nacimiento'>Fecha de nacimiento:</label>
            <input required id='domicilio' name='fecha_nacimiento' className='p-1 border border-slate-200 focus:outline-blue-300 text-lg' />

            <label htmlFor='domicilio'>Domicilio</label>
            <input required id='fecha_nacimiento' name='domicilio' type='text'  className='p-1 border border-slate-200 focus:outline-blue-300 text-lg' />

            <div className='col-span-2 grid gap-2'>
                <button formAction={nuevoEstudiante} className='bg-green-600 text-white px-4 py-2 rounded-xl'>
                    Guardar estudiante
                </button>
                <button type='reset' className='bg-slate-600 text-white px-4 py-2 rounded-xl'>
                    Limpiar campos
                </button>
            </div>
        </form>
    );
}

export default EstudianteNuevo;