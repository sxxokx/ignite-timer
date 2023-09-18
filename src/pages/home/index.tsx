import { HandPalm, Play } from "phosphor-react"
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./style"
import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { NewCycleForm } from "./components/NewCycleForm"
import { Contdown } from "./components/Countdown"
import { createContext} from "react"


    interface Cycle {
        id: string,
        task: string,
        minutesAmount: number
        startDate: Date
        interruptedDate?: Date
        finishedDate?: Date
    }

    interface CyclesContextType {
        activeCycle: Cycle | undefined
        activeCycleId: string | null
        markCurrentCycleAsFinished: () => void
        amountSecondsPassed: number
        setSecondsPassed: (seconds: number) => void
    }

   export const CycleContext = createContext({} as CyclesContextType)
    
   const newCycleFormValidationSchema = zod.object({
    task:  zod.string().min(1 , 'Informe a tarefa').max(20),
    minutesAmount: zod.number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

//interface NewCycleFormData {
//    task : string,
//    minutesAmount : number
//}
    type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>


export const Home = () => {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleID] =  useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
   
    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }

    })

    const {handleSubmit, watch, reset} = newCycleForm

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
    
    function setSecondsPassed(seconds: number){
        setAmountSecondsPassed(seconds )
    }

    function handleCreateNewCyle(data: NewCycleFormData) {
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
        
        reset();
    }

    function handleInterruptCycle() {
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

    const task = watch('task')
    const isSubmitDisabled = !task
   

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCyle)} action="">
                <CycleContext.Provider value={{activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed}}>
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    <Contdown />
                </CycleContext.Provider>
                
                { activeCycle ?(
                    
                    <StopCountdownButton onClick={handleInterruptCycle} type="button">
                        <HandPalm size={24} />
                        Interromper
                    </StopCountdownButton>
                )
                :(
                    <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                        <Play size={24} />
                        Começar
                    </StartCountdownButton>     
                )}
            </form>
        </HomeContainer>
    )
}