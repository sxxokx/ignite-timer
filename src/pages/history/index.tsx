import { useContext } from "react"
import { HistoryContainer, HistoryList, Status } from "./style"
import { CycleContext } from "../../contexts/CyclesContext"

export const History = () => {
    const { cycles } = useContext(CycleContext)


    return (
        <HistoryContainer> 
            <h1>Meu histórico</h1>

            <pre>
                {JSON.stringify(cycles, null, 2)}
            </pre>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>Hà 2 meses</td>
                            <td><Status statusColor="green">Concuído</Status></td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>Hà 2 meses</td>
                            <td><Status statusColor="red">Interrompido</Status></td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>Hà 2 meses</td>
                            <td><Status statusColor="yellow">Em andamento</Status></td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>Hà 2 meses</td>
                            <td><Status statusColor="green">Concuído</Status></td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>Hà 2 meses</td>
                            <td><Status statusColor="red">Interrompido</Status></td>
                        </tr>
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}