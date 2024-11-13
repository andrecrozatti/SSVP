


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

export function StringDateTimeToShow(currentDate: string) : string | null {
    
    if (!currentDate) {
        return null;
    }

    const formatedDate = new Date(currentDate)
    // Função para adicionar zero à esquerda se o número for menor que 10
    const pad = (number: number) => {
        return number < 10 ? '0' + number : number;
    }

    // Extrai os componentes da data
    const year = formatedDate.getFullYear();
    const month = pad(formatedDate.getMonth() + 1); // Os meses começam em 0, então adicionamos 1
    const day = pad(formatedDate.getDate());
    const hours = pad(formatedDate.getHours());
    const minutes = pad(formatedDate.getMinutes());

    // Formata no padrão necessário para o input datetime-local
     return `${day}/${month}/${year} ${hours}:${minutes}`;
}
export function StringDateToShow(currentDate: string) : string | null {
    
    if (!currentDate) {
        return null;
    }

    const formatedDate = new Date(currentDate)
    // Função para adicionar zero à esquerda se o número for menor que 10
    const pad = (number: number) => {
        return number < 10 ? '0' + number : number;
    }

    // Extrai os componentes da data
    const year = formatedDate.getFullYear();
    const month = pad(formatedDate.getMonth() + 1); // Os meses começam em 0, então adicionamos 1
    const day = pad(formatedDate.getDate());

    // Formata no padrão necessário para o input datetime-local
     return `${day}/${month}/${year}`;
}



export default {StringDateToInput, DateToInput}