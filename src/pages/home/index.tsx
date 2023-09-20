import { HandPalm, Play } from "phosphor-react"
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./style"
import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { NewCycleForm } from "./components/NewCycleForm"
import { Contdown } from "./components/Countdown"
  
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

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }

    })

    const {handleSubmit, watch, reset} = newCycleForm
    


    const task = watch('task')
    const isSubmitDisabled = !task
   

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCyle)} action="">
                
                        
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    <Contdown />
                
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