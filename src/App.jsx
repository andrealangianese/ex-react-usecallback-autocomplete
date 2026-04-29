import { useState, useEffect, useCallback } from 'react'

//funzione debounce generica per ritardare ricaricamento della page 
function debounce(callback, delay) {
  let timeout;
  return (value) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      callback(value)
    }, delay)
  }
}

function App() {
  const [chiamata, setChiamata] = useState('')
  const [risultati, setRisultati] = useState([])

  // logica di ricerca
  const fetchProducts = (query) => {
    if (query.trim() === '') {
      setRisultati([])
      return
    }

    fetch(`http://localhost:3333/products?search=${query}`)
      .then(res => res.json())
      .then(data => setRisultati(data))
      .catch(err => console.error("Errore API:", err))
  }

  // useCallback assicura che questa funzione rimanga la STESSA tra i render.
  const debouncedSearch = useCallback(
    debounce((nextValue) => fetchProducts(nextValue), 300),
    [] // Array di dipendenze vuoto
  )

  // Gestiamo il cambiamento dell'input
  const handleChange = (e) => {
    const val = e.target.value
    // Aggiorno input immediatamente 
    setChiamata(val)
    // Chiamo versione ritardata per l'API
    debouncedSearch(val)
  }

  return (
    <>
      <input
        type="text"
        placeholder='cerca per brand'
        value={chiamata}
        onChange={handleChange} />
      {risultati.length > 0 && (<div>
        {risultati.map(res => (
          <option key={res.id}>{res.brand}</option>
        ))}
      </div>
      )}
    </>
  )
}

export default App
