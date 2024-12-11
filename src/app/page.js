import Image from "next/image";
import Link from "next/link";



export default function Home() {
  return (
    <div>
      <Link href='/medicos-api'>Medicos Api</Link>
      <Link href='/medicos-db'>Medicos DB</Link>
      <Link href='/pacientes-api'>Pacientes Api</Link>
      <Link href='/pacientes-db'>Pacientes DB</Link>
    </div>
  );
}
