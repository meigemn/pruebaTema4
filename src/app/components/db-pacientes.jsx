
import Link from 'next/link'
import mysql from '@/lib/mysql'
import { revalidatePath } from 'next/cache'
import Buscar from './buscar';




async function obtenerPacientes(query) {
    const sql = 'select * from `pacientes` where nombre like ?';
    const values = [`%${query}%`]
    const [pacientes] = await mysql.query(sql, values);
    
    // Introducimos un retardo artificial
    // await new Promise(resolve => setTimeout(resolve, 2000))

    return pacientes
}


async function eliminarPaciente(formData) {
    /* obliga a que siempre se use el servidor */
    'use server'
    const id = formData.get('id')

    const sql = 'delete from pacientes where id = ?'
    const values = [id]
    await mysql.query(sql, values);

    revalidatePath('/pacientes-db')
}


async function Pacientes({ query }) {

    const pacientes = await obtenerPacientes(query)

    return (
        <>
            <h1 className='text-2xl text-slate-600 py-2  mb-2 border-b-2 border-b-slate-600'>
                Listado de pacientes
            </h1>

            <Buscar />

            <div className='flex flex-col'>
                {pacientes.sort((a, b) => a.createdAt - b.createdAt).reverse()  // Orden inverso de tiempo   
                    .map((paciente) => (
                        <div key={paciente.id} className='p-2 odd:bg-slate-100 flex justify-between'>
                            <Link href={`/pacientes-db/${paciente.id}`}>{paciente.nombre}</Link>
                            <div className='flex gap-6'>
                                <form>
                                    <input type="hidden" name='id' value={paciente.id} />
                                    <Link href={`/pacientes-db/modificar/${paciente.id}`} title='modificar'>✏️</Link>
                                    <button formAction={eliminarPaciente} title='ELIMINAR'>❌</button>
                                </form>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Pacientes



