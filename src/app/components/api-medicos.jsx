
import Link from 'next/link'
import { revalidatePath } from 'next/cache'
import Buscar from './buscar'

async function obtenerEstudiantes(query) {
    const response = await fetch('http://localhost:4000/estudiantes')
    const estudiantes = await response.json()

    // Introducimos un retardo artificial
    // await new Promise(resolve => setTimeout(resolve, 2000))

    return estudiantes.filter(estudiante => estudiante.nombre.toLowerCase().includes(query))
}


async function eliminarEstudiante(formData) {
    'use server'
    const id = formData.get('id')

    await fetch('http://localhost:4000/estudiantes/' + id, { method: 'DELETE' })

    revalidatePath('/estudiantes-api')
}


async function estudiantes({ query }) {
    const estudiantes = await obtenerEstudiantes(query)

    return (
        <>
            <h1 className='text-2xl text-slate-600 py-2  mb-2 border-b-2 border-b-slate-600'>
                Lista de estudiantes (API)
            </h1>

            <Buscar />

            <div className='flex flex-col'>
                {estudiantes.sort((a, b) => a.createdAt - b.createdAt).reverse()  // Orden inverso de tiempo                           
                    .map((estudiante) => (
                        <div key={estudiante.id} className='p-2 odd:bg-slate-100 flex justify-between'>
                            <Link href={`/estudiantes-api/${estudiante.id}`}>{estudiante.nombre}</Link>
                            <div className='flex gap-6'>
                                <form>
                                    <input type="hidden" name='id' value={estudiante.id} />
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

export default estudiantes



