
export interface Deputados {
    id: number,
    uri: string,
    nome: string,
    siglaPartido: string,
    uriPartido: string,
    siglaUf: string,
    idLegislatura: number,
    urlFoto: string,
    email: string,
}

export interface Deputado {
    id: number,
    uri: string,
    nomeCivil: string,
    ultimoStatus: UltimoStatus,
    cpf: number,
    sexo: string,
    urlWebsite: string,
    redeSocial: string,
    dataNascimento: Date,
    dataFalecimento: Date,
    ufNascimento: string,
    municipioNascimento: string,
    escolaridade: string,
}

export interface UltimoStatus {    
    id: number,
    uri: string,
    nome: string,
    siglaPartido: string,
    uriPartido: string,
    siglaUf: string,
    idLegislatura: number,
    urlFoto: string,
    email: string,
    data: string,
    nomeEleitoral: string,
    gabinete: Gabinete,
    situacao: string,
    condicaoEleitoral: string,
    descricaoStatus: string,
}

export interface Gabinete {
    nome: number,
    predio: number,
    sala: number,
    andar: number,
    telefone: string,
    email: string,
}

export interface Eventos {
    id: number,
    uri: string,
    dataHoraInicio: Date,
    dataHoraFim: Date,
    situacao: string,
    descricaoTipo: string,
    descricao: string,
    localExterno: string,
    localCamara: string,
    urlRegistro: string,
    orgaos: Orgao[],    
}

export interface Orgao {
    id: number,
    uri: string,
    sigla: string,
    nome: string,
    apelido: string,
    codTipoOrgao: number,
    tipoOrgao: string,
    nomePublicacao: string
}


export interface APIResponse<T> {
    results: Array<T>;
}