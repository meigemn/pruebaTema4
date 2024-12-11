'use client'
/*
  NO USAR ESTE COMPONENTE
  Componente para realizar búsquedas.
  Este componente es para NextJS < 15
  A partir de NextJS 15, disponemos del componente Form, 
  que simplifica enormemente el trabajo con entradas de búsqueda.

  Se deja aquí el código para que puedas comparar con el nuevo.
*/
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from 'use-debounce';

function Buscar() {
    const searchParams = useSearchParams()
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((text) => {
        const params = new URLSearchParams(searchParams);
        if (text)
            params.set('query', text);
        else
            params.delete('query');

        replace(`${pathname}?${params}`);
    }, 300)


    return (
        <div className="text-right">
            <input
                type='search'
                className={`text-black p-2 pl-10 rounded-full my-5 bg-[url('/search.svg')] bg-[length:16px_16px] bg-[center_left_10px] bg-no-repeat border border-slate-200 focus:outline-blue-300`}
                placeholder={'Buscar ...'}
                onChange={ (e) => handleSearch(e.target.value) }
                defaultValue={searchParams.get('query')}
            />
        </div>
    )
}

export default Buscar