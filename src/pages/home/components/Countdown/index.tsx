import { useContext, useEffect } from "react";
import { CountdownContainer, Separator } from "./style";
import { differenceInSeconds } from "date-fns";
import { CycleContext } from "../../../../components/contexts/CyclesContext";



export function Contdown(){
    const {activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed
    } = useContext(CycleContext)
    

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

    
    useEffect(() => {
        let interval: any
        
        if (activeCycle){
              interval = setInterval(() => {
                  const secondsDiferrence = differenceInSeconds(
                     new Date(), activeCycle.startDate)
 
                     if (secondsDiferrence >= totalSeconds){
                        markCurrentCycleAsFinished()
                          setSecondsPassed(totalSeconds)
                          clearInterval(interval)
                     } else {
                         setSecondsPassed(secondsDiferrence)
                     }    
             }, 1000)
         }
 
         return () => {
             clearInterval(interval)
         }
 
     }, [activeCycle, activeCycleId, totalSeconds, markCurrentCycleAsFinished, setSecondsPassed])

     const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

     const minutesAmount = Math.floor(currentSeconds / 60)
     const secondsAmount = currentSeconds % 60

     const minutes = String(minutesAmount).padStart(2, '0')
     const seconds = String(secondsAmount).padStart(2, '0')
 

    return (
        
        <CountdownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountdownContainer>

    )
}