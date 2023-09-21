import { ReactNode, createContext, useState } from "react";



interface CreateCycleData {
    task: string
    minutesAmount: number
}

interface Cycle {
    id: string,
    task: string,
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}


interface CyclesContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    markCurrentCycleAsFinished: () => void
    amountSecondsPassed: number
    setSecondsPassed: (seconds: number) => void
    createNewCycle: (data: CreateCycleData ) => void
    interruptCurrentCycle: () => void
}
export const CycleContext = createContext({} as CyclesContextType) 


interface CyclesContexProviderProps{
    children: ReactNode
}

export function CyclesContextProvider({children}: CyclesContexProviderProps){

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleID] =  useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
   
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    function setSecondsPassed(seconds: number){
        setAmountSecondsPassed(seconds )
    }
        
    function markCurrentCycleAsFinished(){
        setCycles((state) => 
        state.map(cycle => {
            if (cycle.id === activeCycleId){
              return {...cycle, finishedDate: new Date()}
            } else {
                return cycle
         }
     }))
    }

    function createNewCycle(data: CreateCycleData) {
        const id =  String(new Date().getTime());

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }
        setCycles((state) => [...state, newCycle])
        setActiveCycleID(id)
        setAmountSecondsPassed(0)
    }

    function interruptCurrentCycle() {
        setActiveCycleID(null)
        
        setCycles((state) =>
            state.map(cycle => {
            if (cycle.id === activeCycleId){
                return {...cycle, interruptedDate: new Date()}
            } else {
                return cycle
            }
        }))
    }
    

    return(
        <CycleContext.Provider value={{activeCycle, 
            activeCycleId, 
            markCurrentCycleAsFinished, 
            amountSecondsPassed, 
            setSecondsPassed, 
            createNewCycle, 
            interruptCurrentCycle, 
            cycles}}>
                {children}
        </CycleContext.Provider>
    )

}