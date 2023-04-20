const CardActivity = () => {

  const mockCard = ['card1', 'card2', 'card3', 'card4', 'card5', 'card6', 'card7', 'card8', 'card9', 'card10']

  return (
    <div className="container-card-activity">
       {mockCard.map((card) => {
          return (
            <figure className="card-activity">
              {card}
            </figure>
          )
        })}
    </div>
  )
}


export default CardActivity
