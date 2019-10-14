import React from 'react'

export const LeaderBoard = React.memo(({winners}) => { 
    return (
        <section className='side'>
            <div className='side__body'>
                <h1 className='side__title'>Leader Board</h1>
                
                {winners.map(w => (
                    <div className='side__row' key={w.id}>
                        <div className="side__row__col">
                            <h2 className='side__row__title'>{w.winner} </h2>
                        </div>
                        <div className="side__row__col">
                            <h2 className='side__row__title'>{w.date}</h2>
                        </div>
                    </div>
                ))}

          
            </div>
        </section>
    )
})

LeaderBoard.displayName = 'LeaderBoard'