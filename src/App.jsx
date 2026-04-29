import { useState, useEffect } from 'react'

function App() {
  const [chiamata, setChiamata] = useState('')
  const [risultati, setRisultati] = useState([])

  useEffect(() => {
    if (chiamata.trim() === '') {
      setRisultati([])
      return
    }
    fetch(`http://localhost:3333/products?search=${chiamata}`)
      .then(res => res.json())
      .then(data => setRisultati(data))
      .catch(err => console.error(err))

  }, [chiamata])
  return (
    <>
      <input
        type="text"
        placeholder='cerca per brand'
        value={chiamata}
        onChange={e => setChiamata(e.target.value)} />
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
