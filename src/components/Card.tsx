interface ICard{
    id: number,
    paragraph: string
    details?: string
}

export const Card = ({id, paragraph, details}: ICard) => {
  return (
    console.log(id),
    <>
    <div className="card">
        <h2>Card Title {id}</h2>
        <p>{paragraph}</p>
    </div>
    <footer title={details}>
      <p>&copy; 2025 My App. All rights reserved. Ass. Tropa do Benézinho</p>
    </footer>
    </>
    
  )
}