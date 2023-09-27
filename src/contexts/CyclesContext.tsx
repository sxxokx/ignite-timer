import { ReactNode, createContext, useReducer, useState } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles";

interface CreateCycleData {
    task: string
    minutesAmount: number
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

    const [cyclesState, dispatch] = useReducer(cyclesReducer ,
    {
        cycles: [],
        activeCycleId: null,
    },
    )
    
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
    const {cycles, activeCycleId} =cyclesState
   
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    function setSecondsPassed(seconds: number){
        setAmountSecondsPassed(seconds )
    }
        
    function markCurrentCycleAsFinished(){
        dispatch({
            type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
            payload: {
                activeCycleId
            }
        })
    }

    function createNewCycle(data: CreateCycleData) {
        const id =  String(new Date().getTime());

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }
        dispatch({
            type: 'ADD_NEW_CYCLE', 
            payload: {
                newCycle,
            }
        })
        setAmountSecondsPassed(0)
    }

    function interruptCurrentCycle() {
        
        dispatch({
            type:'INTERRUPT_CURRENT_CYCLE',
            payload: {
                 activeCycleId,
        }
    })
                     
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