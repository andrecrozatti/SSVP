


export function StringDateToInput(date: string): String {
    return date.split('T')[0]
}
export function DateToInput(currentDate: Date) {
    
    // Função para adicionar zero à esquerda se o número for menor que 10
    const pad = (number: number) => {
        return number < 10 ? '0' + number : number;
    }

    // Extrai os componentes da data
    const year = currentDate.getFullYear();
    const month = pad(currentDate.getMonth() + 1); // Os meses começam em 0, então adicionamos 1
    const day = pad(currentDate.getDate());
    const hours = pad(currentDate.getHours());
    const minutes = pad(currentDate.getMinutes());

    // Formata no padrão necessário para o input datetime-local
     return `${year}-${month}-${day}T${hours}:${minutes}`;
}




export default {StringDateToInput, DateToInput}