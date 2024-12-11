
import Link from 'next/link'
import mysql from '@/lib/mysql'
import { revalidatePath } from 'next/cache'
import Buscar from './buscar';




async function obtenerEstudiantes(query) {
    const sql = 'select * from `estudiantes` where nombre like ?';
    const values = [`%${query}%`]
    const [estudiantes] = await mysql.query(sql, values);
    
    // Introducimos un retardo artificial
    // await new Promise(resolve => setTimeout(resolve, 2000))

    return estudiantes
}


async function eliminarEstudiante(formData) {
    /* obliga a que siempre se use el servidor */
    'use server'
    const id = formData.get('id')

    const sql = 'delete from estudiantes where id = ?'
    const values = [id]
    await mysql.query(sql, values);

    revalidatePath('/estudiantes-db')
}


async function Estudiantes({ query }) {

    const estudiantes = await obtenerEstudiantes(query)

    return (
        <>
            <h1 className='text-2xl text-slate-600 py-2  mb-2 border-b-2 border-b-slate-600'>
                Listado de estudiantes
            </h1>

            <Buscar />

            <div className='flex flex-col'>
                {estudiantes.sort((a, b) => a.createdAt - b.createdAt).reverse()  // Orden inverso de tiempo   
                    .map((estudiante) => (
                        <div key={estudiante.id} className='p-2 odd:bg-slate-100 flex justify-between'>
                            <Link href={`/estudiantes-db/${estudiante.id}`}>{estudiante.nombre}</Link>
                            <div className='flex gap-6'>
                                <form>
                                    <input type="hidden" name='id' value={estudiante.id} />
                                    <Link href={`/estudiantes-db/modificar/${estudiante.id}`} title='modificar'>✏️</Link>
                                    <button formAction={eliminarEstudiante} title='ELIMINAR'>❌</button>
                                </form>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Estudiantes



