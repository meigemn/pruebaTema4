
import Link from 'next/link'
import mysql from '@/lib/mysql'
import { revalidatePath } from 'next/cache'
import Buscar from './buscar';




async function obtenerMedicos(query) {
    const sql = 'select * from `medicos` where nombre like ?';
    const values = [`%${query}%`]
    const [medicos] = await mysql.query(sql, values);
    
    // Introducimos un retardo artificial
    // await new Promise(resolve => setTimeout(resolve, 2000))

    return medicos
}


async function eliminarMedico(formData) {
    /* obliga a que siempre se use el servidor */
    'use server'
    const id = formData.get('id')

    const sql = 'delete from medicos where id = ?'
    const values = [id]
    await mysql.query(sql, values);

    revalidatePath('/medicos-db')
}


async function Medicos({ query }) {

    const medicos = await obtenerMedicos(query)

    return (
        <>
            <h1 className='text-2xl text-slate-600 py-2  mb-2 border-b-2 border-b-slate-600'>
                Listado de medicos
            </h1>

            <Buscar />

            <div className='flex flex-col'>
                {medicos.sort((a, b) => a.createdAt - b.createdAt).reverse()  // Orden inverso de tiempo   
                    .map((medico) => (
                        <div key={medico.id} className='p-2 odd:bg-slate-100 flex justify-between'>
                            <Link href={`/medicos-db/${medico.id}`}>{medico.nombre}</Link>
                            <div className='flex gap-6'>
                                <form>
                                    <input type="hidden" name='id' value={medico.id} />
                                    <Link href={`/medicos-db/modificar/${medico.id}`} title='modificar'>✏️</Link>
                                    <button formAction={eliminarMedico} title='ELIMINAR'>❌</button>
                                </form>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Medicos



