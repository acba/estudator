export interface Prova {
    nome: string,
    data?: Date,
}

export interface Disciplina {
    nome: string,
    codigo: string,

    assuntos?: Array<Assunto>
}

export interface Assunto {
    // FK
    disciplina: string,

    nome: string,
    historicoEstudo: Array<Estudo>,
}

export interface Estudo {
    // FK
    assunto: string,

    tipo: string, // estudo, revisão, exercício
    data_hora: Date,
    minutos: number,
}

export interface Planejamento {
    ciclos?: Array<CicloEstudo>
}

export interface CicloEstudo {
    // FK
    planejamento: string,

    nome: string,
    disciplinas?: Array<Disciplina>
}