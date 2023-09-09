import { Play } from "phosphor-react"
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./style"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'


const newCycleFormValidationSchema = zod.object({
    task:  zod.string().min(1 , 'Informe a tarefa').max(20),
    minutesAmout: zod.number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

interface NewCycleFormData {
    task : string,
    minutesAmount : number
}
//type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

    interface Cycle {
        id: string,
        task: string,
        minutesAmount: number
    }

export const Home = () => {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleID] =  useState<string | null>(null)

    const { register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }

    })
    function handleCreateNewCyle(data: NewCycleFormData) {
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
        }
        setCycles((state) => [...cycles, newCycle])
        
        reset();
    }
    const task = watch('task')
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCyle)} action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput id="task" list="task-suggestions"
                     placeholder="Dê um nome para o seu projeto"
                     {...register('task')} />
                     
                    <datalist id="task-suggestions">
                        <option value="projeto 1"/>
                        <option value="projeto 2"/>
                        <option value="projeto 3"/>
                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput type="number" id="minutesAmount"
                     placeholder="00" step={5} min={5} max={60} 
                     {...register('minutesAmount', {valueAsNumber: true})}/>

                    <span>minutos.</span>

                </FormContainer>

                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>
                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}