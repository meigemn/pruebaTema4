import Link from "next/link";
import { notFound, redirect } from 'next/navigation'
import mysql from '@/lib/mysql'

async function modificarEstudiante(formData) {
    'use server'
    const id =formData.get('id');
    const nombre = formData.get('nombre');
    const fecha_nacimiento = formData.get('fecha_nacimiento')
    const domicilio = formData.get('domicilio')

    const sql = 'update `estudiantes` set nombre=?, domicilio=?, fecha_nacimiento=? where id= ?'
    const values = [nombre, domicilio, fecha_nacimiento,id];

    const [result, fields] = await mysql.query(sql, values)
    redirect('/estudiantes-db')
}

async function obtenerestudiante(id) {
    const sql = 'select * from estudiantes where id = ?';
    const values = [id]
    const [rows] = await mysql.query(sql, values);

    // Introducimos un retardo artificial
    // await new Promise(resolve => setTimeout(resolve, 2000))

    return rows[0]
}


async function EstudiantesModificar({ params }) {
    const { id } = await params
    const estudiante = await obtenerestudiante(id)

    if (!estudiante) notFound()

    return (
        <section className="min-h-screen max-w-[1024px] mx-auto px-10 py-10">
            <Link href="/estudiantes-db" className="fixed p-2 bg-orange-300 rounded-full"> &lt;- Volver </Link>
            <h1 className='py-10 text-3xl text-blue-500 text-center border-b-4 border-b-blue-500'>
                estudiante #{estudiante.id}
            </h1>
            <div className="flex flex-col gap-10 items-center mt-20 p-10 bg-blue-100 rounded-xl">
                <form action={modificarEstudiante}>
                    <input type="hidden" name="id" value={estudiante.id} />

                <input type="text" className="text-6xl place-self-center" defaultValue={estudiante.nombre}></input>
                <input type="text" className="text-2xl place-self-center text-slate-400" defaultValue={estudiante.domicilio}></input>
                <input type="text" className="text-7xl place-self-center text-blue-400 *:font-bold" defaultValue={estudiante.fecha_nacimiento}></input>
                <button type="submit">Guardar Cambios</button>
                </form>
            </div>

        </section>
    );
}

export default EstudiantesModificar;