import Link from "next/link";
import { notFound } from 'next/navigation'


async function obtenerPaciente(id) {
    const response = await fetch('http://localhost:4000/pacientes/' + id)
    if (!response.ok) notFound()
    const paciente = await response.json()  

    // Introducimos un retardo artificial
    await new Promise(resolve => setTimeout(resolve, 2000))

    return paciente
}


async function PacientesPage({ params }) {

    const { id } = await params
    const paciente = await obtenerPaciente(id)

    return (
        <section className="min-h-screen max-w-[1024px] mx-auto px-10 py-10">
            <Link href="/medicos-api" className="fixed p-2 bg-orange-300 rounded-full"> &lt;- Volver </Link>
            <h1 className='py-10 text-3xl text-blue-500 text-center border-b-4 border-b-blue-500'>
                paciente #{paciente.id}
            </h1>
            <div className="flex flex-col gap-10 items-center mt-20 p-10 bg-blue-100 rounded-xl">
                <p className="text-6xl place-self-center">{paciente.nombre}</p>
                <p className="text-2xl place-self-center text-slate-400">{paciente.localidad}</p>
                <p className="text-7xl place-self-center text-blue-400 *:font-bold">{paciente.fecha_nacimiento} </p>
            </div>
        </section>
    );
}

export default PacientesPage;